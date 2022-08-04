import {
  ActionFunction,
  useActionData,
  useTransition,
  Form,
  Link
} from "remix";

import {useEffect, useRef} from "react";

export let action: ActionFunction = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get("email");

  const API_KEY = process.env.CONVERTKIT_KEY;
  const FORM_ID = "2973896";
  const API_URL = "https://api.convertkit.com/v3/";

  let res = await fetch(`${API_URL}/forms/${FORM_ID}/subscribe`, {
    method: "post",
    body: JSON.stringify({email, api_key: API_KEY}),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  })

  return res.json();
}

export default function Newsletter() {
  let inputRef = useRef<HTMLInputElement>(null);
  let successRef = useRef<HTMLHeadingElement>(null);
  let mounted = useRef<boolean>(false);
  let actionData = useActionData();
  let transition = useTransition();
  let state: "idle" | "success" | "error" | "submitting" = transition.submission
    ? "submitting"
    : actionData?.subscription
    ? "success"
    : actionData?.error
    ? "error"
    : "idle";

  useEffect(() => {
    if (state === "error") {
      inputRef.current?.focus();
    }

    if (state === "idle" && mounted.current) {
      inputRef.current?.select();
    }

    if (state === "success") {
      successRef.current?.focus();
    }

    mounted.current = true;
  }, [state]);

  return (
    <main>
      <Form
        replace
        method="post"
        aria-hidden={state === "success"}
      >
        <h2>Subscribe!</h2>

        <p>Don't miss any the action!</p>

        <fieldset disabled={state === "submitting"}>
          <input
            aria-label="Email address"
            aria-describedby="emailStatusMessage"
            type="email"
            name="email"
            placeholder="you@email.com"
            ref={inputRef}
            className={actionData?.error ? "error" : ""}
          />

          <button type="submit">
            { state === "submitting" ? "Submitting..." : "Subscribe" }
          </button>
        </fieldset>

        <p id="emailStatusMessage" className="error">
          {/* &nbsp to not happen layout shifting */}
          {state === "error" ? actionData.message : <>&nbsp;</>}
        </p>
      </Form>

      <div aria-hidden={state !== "success"}>
        <h2 ref={successRef} tabIndex={-1}>You're subscribed!</h2>
        <p>Please check out your email do confirm your subscription.</p>
        <Link to=".">Start over</Link>
      </div>
    </main>
  );
}
