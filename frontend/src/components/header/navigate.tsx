import { Link } from "react-router-dom";
import useAuth from "../../hooks/use-auth";
import UserProfile from "./user-profile";

const Navigate = () => {
  const { authedUser } = useAuth();

  console.log("🚀 ~ file: navigate.tsx:6 ~ Navigate ~ authedUser:", authedUser);
  return (
    <nav className="bg-slate-900 text-white p-3 flex md:flex-row flex-col justify-center items-center md:justify-between">
      <Link to="/">
        <h1 className="font-bold text-lg">ניהול ספר רכב</h1>
      </Link>

      {/* !! This needs to be routed to backend's google provider login page */}
      <div className="flex gap-3">
        {authedUser.isAuthed ? (
          <div className="flex gap-12 items-center">
            <UserProfile />
            <Link to={"/manage-cars/my-cars"}>
              <button>הרכבים שלי</button>
            </Link>
            <Link to={"http://localhost:1234/auth/logout"}>
              <button>התנתקות</button>
            </Link>
          </div>
        ) : (
          <Link to={"http://localhost:1234/auth/google"}>
            <button>התחברות</button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navigate;
