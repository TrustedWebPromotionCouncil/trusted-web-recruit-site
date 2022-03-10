import React, { FunctionComponent, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { CopyIcon } from "../components/CopyIcon";
import applyDoneAsyncProcess from "./applyDoneAsyncProcess";

import "./ApplyDone.scss";

export const ApplyDone: FunctionComponent = () => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [cancel, setCancel] = useState(false);
  const [mailAddress] = useState("foo@example.com");

  useEffect(() => {
    let port = window.location.port;
    if (port) {
      port = `:${port}`;
    }

    const { hash } = window.location;
    if (hash) {
      if (hash.includes("error=")) {
        const searchParams = new URLSearchParams(hash.split("#")[1]);
        if (searchParams.has("error")) {
          const e = searchParams.get("error");
          if (e === "user_cancelled") {
            setCancel(true);
          } else {
            setError(e!);
          }
        }
      } else {
        const arr = hash.split("#id_token=");
        const f = async (port: string) => {
          if (arr.length === 2) {
            const host = `${process.env.REACT_APP_HOST}${port}`;
            const clientId = `${host}/apply-done`;
            console.log({ clientId });
            const idToken = arr[1];
            const result = await applyDoneAsyncProcess.process(
              idToken,
              clientId,
            );
            if (result.type === "success") {
              const url = `${process.env.REACT_APP_EXTENSION_OBSERVABLE_HOST}?${result.queryString}`;
              setUrl(url);
            } else {
              setError(result.message);
            }
          } else {
            setError("不正な応募完了リクエストのURLです");
          }
        };
        f(port);
      }
    } else {
      setError("不正な応募完了リクエストのURLです");
    }
  }, []);

  if (error) {
    return (
      <div className="container">
        <h1 className="text-styles-headline5 title">応募完了エラー</h1>
        <p className="text-styles-subtitle1">応募を完了できませんでした</p>
        <div className="page-error-text">{error}</div>
        <Link to="/">Home</Link>
      </div>
    );
  }
  if (cancel) {
    return (
      <div className="container">
        <h1 className="text-styles-headline5 title">応募キャンセル</h1>
        <p className="text-styles-subtitle1">応募をキャンセルしました</p>
        <Link to="/">Home</Link>
      </div>
    );
  }
  return (
    <div className="container">
      <h1 className="text-styles-headline5 title">応募完了</h1>
      <p className="text-styles-subtitle1">ご応募ありがとうございました。</p>
      <p className="text-styles-body1">
        ご提供いただきました情報へアクセスするために、提供データ参照URLを以下のメールアドレスまでご連絡ください。
      </p>
      <div className="result">
        <div className="copy-enable-content">
          <div className="card">
            <div className="card-header">
              <span className="text-styles-caption">提供データ参照URL</span>
            </div>
            <div className="card-body">
              {url}
              <CopyIcon value={url} />
            </div>
          </div>
        </div>
        <div className="copy-enable-content">
          <div className="card">
            <div className="card-header">
              <span className="text-styles-caption">提供先メールアドレス</span>
            </div>
            <div className="card-body">
              <a href={`mailto:${mailAddress}`}>{mailAddress}</a>
              <CopyIcon className="copy-icon" value={mailAddress} />
            </div>
          </div>
        </div>
        <Link to="/">Home</Link>
      </div>
    </div>
  );
};
