import * as didJWT from "did-jwt";

import { ionResolver } from "../resolver";

interface ProcessResultSuccess {
  type: "success";
  queryString: string;
}
export interface ProcessResultFailure {
  type: "failure";
  message: string;
}
type ProcessResult = ProcessResultSuccess | ProcessResultFailure;

const process = async (
  idToken: string,
  clientId: string,
): Promise<ProcessResult> => {
  try {
    const result = await didJWT.verifyJWT(idToken, {
      resolver: ionResolver,
      audience: clientId,
      callbackUrl: clientId,
    });
    const data = result.payload.data;
    console.log(data);
    const queryString = Object.keys(data)
      .map((key) => key + "=" + data[key])
      .join("&");
    return {
      type: "success",
      queryString,
    };
  } catch (err) {
    console.error(err);
    return {
      type: "failure",
      message: "提供データの検証に失敗しました",
    };
  }
};

const Modules = {
  process,
};
export default Modules;
