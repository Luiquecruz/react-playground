import { Link } from "remix";

export default function Header() {
  return (
    <header>
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
    </header>
  );
}