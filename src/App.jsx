import React from "react";
import TrafficControl from "./components/ecosystems/TrafficControl/TrafficControl.ecosystem";
import SiteCopy from "./data/SiteCopy.data";

import "./styles.css";

/**
 * @summary Entry point of app.
 *
 * @function App
 * @returns {<App />}
 */
const App = () => (
  <main className="main">
    <h1 className="hidden">Traffic App</h1>
    <section className="site-header">
      <h2>
        {SiteCopy.messaging.header}
      </h2>
    </section>
    <TrafficControl />
  </main>
);

export default App;
