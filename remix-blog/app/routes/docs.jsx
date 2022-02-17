import { Form } from "remix";

export default function Docs() {
  return (<>
    <article className="container">
      <h1>Dev docs</h1>

      <hr />

      <h2>Components</h2>

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

      <h2>Forms</h2>

      <section id="docsInputs">
        <h3>
          <a href="#docsInputs">
            # Inputs
          </a>
        </h3>

        <details>
          <summary>
            <strong>Default inputs</strong>
          </summary>

          <input type="text" placeholder="Text" />

          <input type="search" placeholder="Search" />

          <input type="url" placeholder="URL" />

          <input type="email" placeholder="E-mail" />

          <input type="tel" placeholder="Tel" />

          <input type="number" placeholder="Number" />

          <input type="password" placeholder="Password" />

          <textarea placeholder="textarea" />
        </details>

        <details>
          <summary>
            <strong>Select</strong>
          </summary>

          <select>
            <option value="">1</option>
            <option value="">2</option>
            <option value="">3</option>
          </select>

          <select>
            <option value="">1</option>
            <option value="">2</option>
            <option value="" selected>3</option>
          </select>

          <select multiple>
            <option value="">1</option>
            <option value="">2</option>
            <option value="">3</option>
            <option value="">4</option>
            <option value="">5</option>
            <option value="">6</option>
            <option value="">7</option>
            <option value="">8</option>
            <option value="">9</option>
          </select>

          <select size="3">
            <option value="">1</option>
            <option value="">2</option>
            <option value="">3</option>
            <option value="">4</option>
            <option value="">5</option>
            <option value="">6</option>
            <option value="">7</option>
            <option value="">8</option>
            <option value="">9</option>
          </select>

          <select multiple size="6">
            <option value="">1</option>
            <option value="">2</option>
            <option value="">3</option>
            <option value="">4</option>
            <option value="">5</option>
            <option value="">6</option>
            <option value="">7</option>
            <option value="">8</option>
            <option value="">9</option>
          </select>
        </details>

        <details>
          <summary>
            <strong>Date types</strong>
          </summary>

          <input type="date" />
          <input type="datetime-local" />
          <input type="time" />
          <input type="week" />
          <input type="month" />
        </details>

        <details>
          <summary>
            <strong>Checkbox</strong>
          </summary>

          <input type="checkbox" />
          <input type="checkbox" />
          <input type="checkbox" />
        </details>

        <details>
          <summary>
            <strong>Radio</strong>
          </summary>

          <input type="radio" />
          <input type="radio" />
          <input type="radio" />
        </details>

        <details>
          <summary>
            <strong>Other types</strong>
          </summary>

          <input type="file" placeholder="File" />

          <input type="color" placeholder="Color" />

          <input type="range" />

          <input type="hidden" placeholder="Ops!" />
        </details>

        <details>
          <summary>
            <strong>Form's assembled</strong>
          </summary>

          <Form>
            <small>Comming soon!</small>

            <button className="button primary" type="submit">Submit</button>
            <button className="button" type="reset">Reset</button>
          </Form>
        </details>
      </section>
    </article>
  </>);
}