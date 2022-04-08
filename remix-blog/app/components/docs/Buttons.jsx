export default function Buttons() {
  return (<>
    <section id="docsButtons">
      <h3>
        <a href="#docsButtons">
          # Buttons
        </a>
      </h3>

      <details>
        <summary>
          <strong>Default style</strong>
        </summary>

        <button className="button primary">primary</button>
        <button className="button secondary">secondary</button>
        <button className="button tertiary">tertiary</button>

        <br /><br />

        <button className="button primary-outline">primary</button>
        <button className="button secondary-outline">secondary</button>
        <button className="button tertiary-outline">tertiary</button>
      </details>

      <details>
        <summary>
          <strong>System style</strong>
        </summary>

        <button className="button system danger">tertiary</button>
        <button className="button system warning">warning</button>
        <button className="button system success">success</button>
        <button className="button system info">info</button>

        <br /><br />

        <button className="button system danger-outline">tertiary</button>
        <button className="button system warning-outline">warning</button>
        <button className="button system success-outline">success</button>
        <button className="button system info-outline">info</button>
      </details>
    </section>
  </>);
}