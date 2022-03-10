import React, { FunctionComponent, useEffect, useState } from "react";
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

import "./cusom.scss";

const Layout: FunctionComponent = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

const COMPANY_COUNT = 2;
function App() {
  const [companies, setCompanies] = useState<CreateDidResult[]>([]);
  useEffect(() => {
    const f = async () => {
      const arr = [];
      for (let i = 0; i < COMPANY_COUNT; i++) {
        const response = await fetch(`/recruiting_company${i + 1}.json`);
        const createResult = await response.json();
        arr.push(createResult);
      }
      setCompanies(arr);
    };
    f();
  }, []);
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
