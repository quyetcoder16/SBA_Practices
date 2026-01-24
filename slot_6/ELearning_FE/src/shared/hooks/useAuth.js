import {
  AuthActionsContext,
  AuthStatesContext,
} from "@/app/provider/AuthProvider";

const useAuth = () => {
  return { ...AuthStatesContext, ...AuthActionsContext };
};

export default useAuth;
