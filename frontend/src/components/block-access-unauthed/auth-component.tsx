import { ReactNode } from "react";
import useAuth from "../../hooks/use-auth";

/**
 * This component uses to render component
 * ONLY if the client is authed (connected)
 */

const AuthComponent = ({ children }: IAuthComponentProps) => {
  const { authedUser } = useAuth();
  if (authedUser.isAuthed) return <>{children}</>;
  else return <></>;
};

interface IAuthComponentProps {
  children: ReactNode | ReactNode[];
}

export default AuthComponent;
