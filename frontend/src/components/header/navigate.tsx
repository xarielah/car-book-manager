import { Link } from "react-router-dom";
import useAuth from "../../hooks/use-auth";
import UserProfile from "./user-profile";
import CarPlateLogo from "./car-plate-logo";

//? This fetches the backend url IF PROVIDED from the Env Vars config of Vite.
//! Make sure to change this on PROD to PROD Backend Service's URL!
const BACKEND = import.meta.env.BACKEND_DOMAIN ?? "http://localhost:1234";

const Navigate = () => {
  const { authedUser } = useAuth();

  return (
    <nav className="bg-blue-500 relative z-50 text-white p-8 flex md:flex-row flex-col justify-center items-center md:justify-between">
      <Link to="/">
        <CarPlateLogo />
      </Link>

      {/* !! This needs to be routed to backend's google provider login page */}
      <div className="flex gap-3">
        {authedUser.isAuthed ? (
          <div className="flex gap-12 items-center">
            <UserProfile />
            <Link to={"/manage-cars/my-cars"}>
              <button>הרכבים שלי</button>
            </Link>
            {/* !! Make sure to do this dynamically!! */}
            <Link to={`${BACKEND}/auth/logout`}>
              <button>התנתקות</button>
            </Link>
          </div>
        ) : (
          <Link to={`${BACKEND}/auth/google`}>
            <button>התחברות</button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navigate;
