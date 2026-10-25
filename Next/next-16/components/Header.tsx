import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="main-header">
      <nav>
        <Link href="/" className="logo">
          <Image src="/icons/logo.png" alt="logo" width={24} height={24} />
          <p>Dev Whatever</p>
        </Link>

        <ul>
          <Link href="/">Home</Link>
          <Link href="/">Events</Link>
          <Link href="/">Create Event</Link>
        </ul>
      </nav>
    </header>
  )
}

export default Header;