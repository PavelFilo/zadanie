import React from "react";
import "./App.css";
import { Layout } from "./Layouts/Layout";
import { FormPage } from "./pages/FormPage/FormPage";

function App() {
  return (
    <div className="App">
      <Layout>
        <FormPage />
      </Layout>
    </div>
  );
}

export default App;
