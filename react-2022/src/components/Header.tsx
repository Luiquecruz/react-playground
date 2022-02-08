import './Header.css';

export function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <a href="/">
              Tweets
            </a>
          </li>
          <li>
            <a href="/profile">
              Profile
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}