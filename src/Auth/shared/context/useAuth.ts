import { useContext } from "react";

import { Auth } from "./auth.interface";
import { AuthContext }  from "./AuthContext";

export const useAuth = () => useContext<Auth>(AuthContext);
