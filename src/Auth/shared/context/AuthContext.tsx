import { createContext } from "react";

import { defaultAuthContextValue } from "./defaultAuthContextValue";

export const AuthContext = createContext(defaultAuthContextValue);
