import React from "react";

import GlobalStyles from "./styles/GlobalStyles";
import Layout from "./components/Layout";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Layout>
        <Navbar />
      </Layout>

      <GlobalStyles />
    </div>
  );
}

export default App;
