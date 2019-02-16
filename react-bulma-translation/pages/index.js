import Link from 'next/link';

export default () => (
  <div>
    <section className="hero is-primary">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">Hero title</h1>
          <h2 className="subtitle">Hero subtitle</h2>

          <Link href="other-page" as="/other_page">
            <a>Next page</a>
          </Link>
        </div> {/* end container */}
      </div>
    </section>
  </div>
);
