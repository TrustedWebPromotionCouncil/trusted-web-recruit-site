import React, { FunctionComponent, useState } from "react";
import "../App.scss";
import JobDescription from "./JobDescription";
import JobOverview from "./JobOverview";
import JobRequirements from "./JobRequirements";

interface Props {
  companyName: string;
  did: string;
  jobListingProps: any;
  handleApply: any;
}

enum Mode {
  overview,
  description,
  requirement,
}

export const JobListing: FunctionComponent<Props> = ({
  companyName,
  did,
  jobListingProps,
  handleApply,
}) => {
  const [mode, setMode] = useState<Mode>(Mode.overview);

  return (
    <div className="card" style={{ width: "100%", backgroundColor: "white" }}>
      <div className="card-header">
        <ul className="nav nav-tabs card-header-tabs">
          <li className="nav-item">
            <a className="nav-link" onClick={() => setMode(Mode.overview)}>
              Overview
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" onClick={() => setMode(Mode.description)}>
              Job Description
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" onClick={() => setMode(Mode.requirement)}>
              Requirement
            </a>
          </li>
        </ul>
      </div>
      {mode === Mode.overview && <JobOverview {...jobListingProps.overview} />}
      {mode === Mode.description && (
        <JobDescription {...jobListingProps.description} />
      )}
      {mode === Mode.requirement && (
        <JobRequirements {...jobListingProps.requirements} />
      )}
      <div className="card-footer text-center">
        <button className={"btn btn-primary"} onClick={handleApply}>
          応募する
        </button>
      </div>
    </div>
  );
};

export default JobListing;
