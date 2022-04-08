import { Form } from "remix";

export default function Forms() {
  return (<>
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

        <div className="wrapper">
          <div>
            <label htmlFor="">Text</label>
            <input type="text" placeholder="Text" />
          </div>

          <div>
            <label htmlFor="">Search</label>
            <input type="search" placeholder="Search" />
          </div>

          <div>
            <label htmlFor="">URL</label>
            <input type="url" placeholder="URL" />
          </div>

          <div>
            <label htmlFor="">E-mail</label>
            <input type="email" placeholder="E-mail" />
          </div>

          <div>
            <label htmlFor="">Telephone</label>
            <input type="tel" placeholder="Tel" />
          </div>

          <div>
            <label htmlFor="">Number</label>
            <input type="number" placeholder="Number" />
          </div>

          <div>
            <label htmlFor="">Password</label>
            <input type="password" placeholder="Password" />
          </div>

          <div>
            <label htmlFor="">Textarea</label>
            <textarea placeholder="textarea" />
          </div>
        </div>
      </details>

      <details>
        <summary>
          <strong>Select</strong>
        </summary>

        <div className="wrapper">
          <div>
            <label htmlFor="">Select</label>
            <select>
              <option value="">1</option>
              <option value="">2</option>
              <option value="">3</option>
            </select>
          </div>

          <div>
            <label htmlFor="">Select</label>
            <select>
              <option value="">1</option>
              <option value="">2</option>
              <option value="" selected>3</option>
            </select>
          </div>

          <div>
            <label htmlFor="">Select</label>
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
          </div>

          <div>
            <label htmlFor="">Select</label>
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
          </div>

          <div>
            <label htmlFor="">Select</label>
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
          </div>
        </div>

      </details>

      <details>
        <summary>
          <strong>Date types</strong>
        </summary>

        <div className="wrapper">
          <div>
            <label htmlFor="">Date</label>
            <input type="date" />
          </div>
          <div>
            <label htmlFor="">Datetime-local</label>
            <input type="datetime-local" />
          </div>
          <div>
            <label htmlFor="">Time</label>
            <input type="time" />
          </div>
          <div>
            <label htmlFor="">Week</label>
            <input type="week" />
          </div>
          <div>
            <label htmlFor="">Month</label>
            <input type="month" />
          </div>
        </div>
      </details>

      <details>
        <summary>
          <strong>Checkbox</strong>
        </summary>

        <div className="wrapper">
          <div>
            <label htmlFor="checkbox1">
              <input type="checkbox" id="checkbox1" />
              <span>Checkbox</span>
            </label>
          </div>

          <div>
            <label htmlFor="checkbox2">
              <input type="checkbox" id="checkbox2" />
              <span>Checkbox</span>
            </label>
          </div>

          <div>
            <label htmlFor="checkbox3">
              <input type="checkbox" id="checkbox3" checked/>
              <span>Checkbox</span>
            </label>
          </div>
        </div>
      </details>

      <details>
        <summary>
          <strong>Radio</strong>
        </summary>

        <div className="wrapper">
          <label htmlFor="radio1">
            <input type="radio" name="radio" id="radio1" />
            <span>Male</span>
          </label>

          <label htmlFor="radio2">
            <input type="radio" name="radio" id="radio2" />
            <span>Female</span>
          </label>

          <label htmlFor="radio3">
            <input type="radio" name="radio" id="radio3" />
            <span>Other</span>
          </label>
        </div>
      </details>

      <details>
        <summary>
          <strong>Other types</strong>
        </summary>

        <div className="wrapper">
          <div>
            <label htmlFor="">File</label>
            <input type="file" placeholder="File" />
          </div>
          <div>
            <label htmlFor="">Color</label>
            <input type="color" placeholder="Color" />
          </div>
          <div>
            <label htmlFor="">Range</label>
            <input type="range" />
          </div>
          <div>
            <label htmlFor="">Hidden</label>
            <input type="hidden" placeholder="Ops!" />
          </div>
        </div>
      </details>

      <details>
        <summary>
          <strong>Form's assembled</strong>
        </summary>

        <div className="wrapper">
          <Form>
            <small>Comming soon!</small>

            <button className="button primary" type="submit">Submit</button>
            <button className="button" type="reset">Reset</button>
          </Form>
        </div>
      </details>
    </section>
  </>);
}