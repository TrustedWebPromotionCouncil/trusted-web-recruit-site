import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocation } from "react-router-dom";
import "../App.scss";

import { generateJWT } from "../siop";
import { Context } from "../context";
import { CreateDidResult } from "../types";
import companyMetaInfo from "../data/company-meta-info.json";
import JobListing from "../components/JobListing";
import jobListingPropsArray from "../data/job-listings.json";

export const Apply: FunctionComponent = () => {
  const [currentDid, setCurrentDid] = useState<CreateDidResult | undefined>();
  const [port, setPort] = useState<string>();
  const [companyName, setCompanyName] = useState<string>();
  const [jobListingProps, setJobListingProps] = useState<any>();
  const { companies } = useContext(Context);
  const location = useLocation();

  const handleClick = async () => {
    console.debug("応募開始");
    const host = `${process.env.REACT_APP_HOST}${port}`;
    const did = currentDid!.initialState.shortForm;
    const clientId = `${host}/apply-done`;
    const clientIdUrlEncoded = encodeURIComponent(clientId);
    const jwt = await generateJWT(did, clientId, currentDid!.keys);
    const url = `https://self-issued.me/?response_type=id_token&scope=openid%20did_authn&client_id=${clientIdUrlEncoded}&request=${jwt}`;
    window.location.href = url;
  };

  useEffect(() => {
    const port = window.location.port;
    if (port) {
      setPort(`:${port}`);
    }
  }, []);

  useEffect(() => {
    if (location) {
      const search = location.search;
      const searchParams = new URLSearchParams(search);
      const did = searchParams.get("did");
      const createDidResult = companies.find(
        (c) => c.initialState.shortForm === did,
      );
      if (createDidResult) {
        setCurrentDid(createDidResult);
      }
      const metaInfo = companyMetaInfo.find((c) => c.did === did);
      if (metaInfo) {
        setCompanyName(metaInfo.name);
      }

      const jobListingPropsOrNull = jobListingPropsArray.find(
        (p) => p.did === did,
      );
      if (did) {
        setJobListingProps(jobListingPropsOrNull?.listings);
      }
    }
  }, [location, companies]);

  return (
    <div className="container">
      <h1>{companyName}</h1>
      <h1>求人情報</h1>
      <div style={{ height: "32px" }} />

      {currentDid &&
        companyName &&
        jobListingProps.map((props: any) => (
          <div style={{ width: "100%" }}>
            <JobListing
              did={currentDid!.initialState.shortForm}
              companyName={companyName}
              jobListingProps={props}
              handleApply={handleClick}
            />
            <div style={{ height: "32px" }} />
          </div>
        ))}
    </div>
  );
};
