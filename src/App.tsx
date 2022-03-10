import React, { FunctionComponent } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import { SelectCompany } from "./selectCompany/SelectCompany";
import { Apply } from "./apply/Apply";
import { ApplyDone } from "./applyDone/ApplyDone";
import { CreateDidResult } from "./types";
import { Context } from "./context";
import company1 from "./data/recruiting_company1.json";
import company2 from "./data/recruiting_company2.json";

import "./App.scss";

const Layout: FunctionComponent = () => {
  return (
    <>
      <div>
        <Outlet />
      </div>
    </>
  );
};

function App() {
  const companies = [company1 as CreateDidResult, company2 as CreateDidResult];

  return (
    <div>
      <Router>
        <Context.Provider value={{ companies }}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<SelectCompany />} />
              <Route path="apply" element={<Apply />} />
              <Route path="apply-done" element={<ApplyDone />} />
            </Route>
          </Routes>
        </Context.Provider>
      </Router>
    </div>
  );
}

export default App;
