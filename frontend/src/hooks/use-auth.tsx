import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosClient from "../service/axios";
import {
  authUser,
  currentUser,
  logoutUser,
} from "../lib/redux/slices/user.slice";

const useAuth = () => {
  const dispatch = useDispatch();

  const authedUser = useSelector(currentUser);

  useEffect(() => {
    function getUser() {
      axiosClient
        .get("/auth/user")
        .then((res) => {
          if (res.status === 200) {
            dispatch(
              authUser({ ...res.data.user, ownedCars: res.data.ownedCars })
            );
          } else {
            // dispatch(logoutUser());
          }
        })
        .catch((error: any) => {
          if (error.response.status == 403) {
            authedUser.isAuthed && dispatch(logoutUser());
            console.error("Error fetching forbidden resources - unauthorized");
          } else
            console.error(
              "Fetching user from the server resulted with an error."
            );
        });
    }

    getUser();
  }, []);

  return { authedUser };
};

export default useAuth;
