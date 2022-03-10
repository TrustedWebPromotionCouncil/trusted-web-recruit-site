import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import companyMetaInfo from "../data/company-meta-info.json";

const filterCompaniesRecruiting = () => {
  return companyMetaInfo.filter((c) => c.forStaff);
};

export const SelectCompany: FunctionComponent = () => {
  const companiesMetaInfo = filterCompaniesRecruiting();
  return (
    <div className="container">
      <div style={{ height: "16px" }} />
      <h1>企業選択</h1>
      <ul>
        {companiesMetaInfo.map((c, index) => (
          <li key={c.did} style={{ margin: "32px" }}>
            <Link to={`/apply?did=${c.did}`}>{c.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
