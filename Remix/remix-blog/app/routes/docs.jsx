import Forms from "~/components/docs/Forms";
import Buttons from "~/components/docs/Buttons";

export default function Docs() {
  return (<>
    <article className="container">
      <h1>Dev docs</h1>

      <hr />

      <Buttons />
      <Forms />
    </article>
  </>);
}