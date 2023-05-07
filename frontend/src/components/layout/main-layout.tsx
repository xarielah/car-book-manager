import { ReactNode } from "react";
import Navigate from "../header/navigate";

const MainLayout = ({ children }: IMainLayoutProps) => {
  return (
    <>
      <Navigate />
      <main
        className="bg-slate-100 p-4 max-w-6xl mx-auto"
        style={{ height: "calc(100vh - 52px)" }}
      >
        {children}
      </main>
    </>
  );
};

interface IMainLayoutProps {
  children: ReactNode | ReactNode[];
}

export default MainLayout;
