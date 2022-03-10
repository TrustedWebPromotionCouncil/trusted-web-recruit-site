import React from "react";

import { Root } from "./types";

export const Context = React.createContext<Root>({
  companies: [],
});
