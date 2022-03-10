import React, { FunctionComponent, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../context";

export const SelectCompany: FunctionComponent = () => {
  const { companies } = useContext(Context);
  return (
    <div className="container">
      <h1>企業選択</h1>
      <ul>
        {companies.map((c, index) => (
          <li key={c.initialState.shortForm}>
            <Link to={`/apply?did=${c.initialState.shortForm}`}>
              企業{index + 1}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
