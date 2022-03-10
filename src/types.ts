export type KeyTypes = "secp256k1" | "Ed25519";

export interface PublicJwk {
  kid: string;
  crv: KeyTypes;
  kty: "EC";
  x: string;
  y?: string;
}

export interface PrivateJwk extends PublicJwk {
  d: string;
}

export interface DidStatus {
  shortForm: string;
  longForm: string;
}

export interface CreateDidResult {
  initialState: DidStatus;
  keys: PrivateJwk;
}

export interface Root {
  companies: CreateDidResult[];
}
