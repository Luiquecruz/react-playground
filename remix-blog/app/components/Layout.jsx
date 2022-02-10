import { Link } from "remix";

export default function Layout({ children }) {
  return (
    <>
      <nav className="navbar">
        <Link to="/" className="logo">
          Logo
        </Link>

        <ul className="nav">
          <li>
            <Link to="/posts">
              Posts
            </Link>
          </li>
        </ul>
      </nav>

      <div className="container">
        { children }
      </div>
    </>
  );
}