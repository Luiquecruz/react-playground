import {
  Meta,
  Links,
  LiveReload,
  Outlet,
  ScrollRestoration
} from "remix";

import styles from '~/styles/global.css';

import Layout from "~/components/Layout";

// @TODO: Try out more SEO stuffs
// SEO
export const meta = () => {
  const charSet = 'utf-8';
  const viewport = 'width=device-width,initial-scale=1';
  const description = 'A blog built from bottom up with Remix';

  return {
    charSet,
    viewport,
    description
  }
}

// Embed links
export const links = () => [
  {
    rel: "stylesheet",
    href: styles
  }
];

// @TODO: Setup GTM & FB Pixel

export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

function Document({ children }) {
  return (
    <html lang="en">
      {/* @TODO: Setup i18n */}
      <head>
        <Meta />
        <title>{ process.env?.SITE_NAME || 'Remix Blog' }</title>
        <Links />
      </head>
      <body className={`page getCurrentRouteNameParams`}>
        {/* @TODO: Get current route params to use as body class */}
        { children }
        <ScrollRestoration />
        { process.env.NODE_ENV === "development" && <LiveReload /> }
      </body>
    </html>
  );
}
