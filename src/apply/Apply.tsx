import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocation } from "react-router-dom";

import { generateJWT } from "../siop";
import { Context } from "../context";
import { CreateDidResult } from "../types";

export const Apply: FunctionComponent = () => {
  const [currentDid, setCurrentDid] = useState<CreateDidResult | undefined>();
  const [port, setPort] = useState<string>();
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
    }
  }, [location, companies]);

  return (
    <div className="container">
      <h1>求人情報</h1>
      <h4>求人1</h4>
      <p>本文1</p>
      <p>本文2</p>
      <h4>求人2</h4>
      <p>本文1</p>
      <p>本文2</p>
      <button className={"btn btn-primary"} onClick={handleClick}>
        応募する
      </button>
    </div>
  );
};
