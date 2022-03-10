import React, { FunctionComponent } from "react";
import "../App.scss";

interface Props {
  role: string;
  project: string;
  department: string;
  location: string;
  time: string;
}

export const JobOverview: FunctionComponent<Props> = ({
  role,
  location,
  time,
}) => {
  return (
    <div className="card-body text-center">
      <h5 className="card-title">{role}</h5>
      <p className="card-text">勤務地: {location}</p>
      <p className="card-text">勤務時間: {time}</p>
    </div>
  );
};

export default JobOverview;
