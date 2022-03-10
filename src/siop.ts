// @ts-ignore
import ION from "@decentralized-identity/ion-tools";

import { PrivateJwk } from "./types";

export const generateJWT = async (
  did: string,
  clientId: string,
  privateJwk: PrivateJwk,
): Promise<string> => {
  const { kid: originalKid, kty, crv, x, y } = privateJwk;
  const kid = originalKid.includes(did) ? originalKid : `${did}#${originalKid}`;
  const header = {
    alg: "ES256K",
    typ: "JWT" as const,
    kid: kid,
  };
  // jwks_uri MUST use the HTTP(S) DID Resolution Binding as per [DID.Resolution] for backward compatibility reasons with plain SIOP OPs.
  // The jwks request parameter SHOULD be used only if the public key cannot be directly obtained from the DID Document.
  // The JWKS MUST contain an entry with a kid that matches the kid in the Request Object.
  // https://identity.foundation/did-siop/#generate-siop-request
  const jwk = {
    kid,
    kty,
    crv,
    x,
    y,
  };
  const jwkSet = { keys: [jwk] };

  const registration = {
    authorization_endpoint: "openid:",
    issuer: "https://self-issued.me/v2",
    response_types_supported: ["id_token"],
    scopes_supported: ["openid"],
    credential_formats_supported: ["jwt_vc"],
    subject_types_supported: ["pairwise"],
    subject_identifier_types_supported: ["did:web:"],
    id_token_signing_alg_values_supported: ["ES256K"],
    request_object_signing_alg_values_supported: ["ES256K"],
    redirect_uris: [clientId],
    jwks: jwkSet,
    did: did,
  };

  const payload = {
    iss: did,
    response_type: "id_token",
    scope: "openid did_authn",
    client_id: clientId,
    registration: registration,
    redirect_uri: clientId,
    kid: kid,
  };

  const jws = await ION.signJws({ header, payload, privateJwk });
  return jws;
};
