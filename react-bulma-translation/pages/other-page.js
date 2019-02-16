import Link from 'next/link';

export default () => (
  <div>
    <section className="hero is-info">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">Other title</h1>
          <h2 className="subtitle">Other subtitle</h2>

          <Link href="index" as="/hero_page">
            <a>Back Button</a>
          </Link>
        </div> {/* end container */}
      </div>
    </section>
  </div>
);
