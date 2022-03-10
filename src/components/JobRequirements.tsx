import React, { FunctionComponent } from "react";
import "../App.scss";

interface Props {
  requirements: string[];
}

export const JobOverview: FunctionComponent<Props> = ({ requirements }) => {
  return (
    <div className="card-body">
      <h5 className="text-center">応募資格・条件</h5>
      <ul>
        {requirements.map((text) => (
          <li key={text}>{text}</li>
        ))}
      </ul>
    </div>
  );
};

export default JobOverview;
