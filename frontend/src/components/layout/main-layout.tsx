import { ReactNode } from "react";
import Navigate from "../header/navigate";
import HeaderWave from "../header/header-wave";

const MainLayout = ({ children }: IMainLayoutProps) => {
  return (
    <>
      <Navigate />
      <HeaderWave />
      <main
        className="p-4 relative mt-[5%] max-w-6xl mx-auto z-2"
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
