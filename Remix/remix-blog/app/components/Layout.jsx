import { useLocation } from "remix";

import Header from "~/components/Header";
import Footer from "~/components/Footer";

export default function Layout({ children }) {
  const location = useLocation();
  const pageClass = location.pathname.slice(1).replace('/', '__');

  return (
    <>
      <Header />

      <main className={`page ${pageClass}`}>
        { children }
      </main>

      <Footer />
    </>
  );
}