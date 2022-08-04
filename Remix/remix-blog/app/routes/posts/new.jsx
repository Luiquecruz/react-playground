import { Form, Link, redirect } from "remix";

export const action = async ({ request }) => {
  const form = await request.formData()

  const fields = {
    title: form.get('title'), body: form.get('body')
  }

  // @TODO: submit to DB
  console.log(fields);

  return redirect('/posts')
}

export default function NewPost() {
  return (<>
    <div className="container">
      <div className="page-header">
        <h1>New post</h1>
        <Link to="/posts" className="button primary-outline">Back</Link>
      </div>

      <div className="page-content">
        <Form method="POST">
          <div className="form-control">
            <label htmlFor="title">Post body</label>
            <input type="text" name="title" id="title" />
          </div>

          <div className="form-control">
            <label htmlFor="body">Post body</label>
            <textarea name="body" id="body" />
          </div>

          <button type="submit" className="button primary">submit</button>
        </Form>
      </div>
    </div>
  </>);
}
