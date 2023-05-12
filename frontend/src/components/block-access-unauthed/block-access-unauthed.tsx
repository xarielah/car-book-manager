import useAuth from "../../hooks/use-auth";
import { ReactNode } from "react";
import MustBeAuthed from "./must-be-authed";

const BlockAccessUnauthed = ({ children }: IBlockAccessUnauthedProps) => {
  const { authedUser } = useAuth();

  if (!authedUser.isAuthed) return <MustBeAuthed />;
  else return <>{children}</>;
};

interface IBlockAccessUnauthedProps {
  children: ReactNode | ReactNode[];
}

export default BlockAccessUnauthed;
