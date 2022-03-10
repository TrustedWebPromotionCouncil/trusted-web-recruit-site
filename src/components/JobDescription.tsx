import React, { FunctionComponent } from "react";
import "../App.scss";

interface Props {
  title: string;
  description: string;
}

export const JobOverview: FunctionComponent<Props> = ({
  title,
  description,
}) => {
  return (
    <div className="card-body text-center">
      <h5 className="card-title">{title}</h5>
      <p className="card-text">{description}</p>
    </div>
  );
};

export default JobOverview;
