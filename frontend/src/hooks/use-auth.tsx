import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosClient from "../service/axios";
import {
  User,
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
            dispatch(authUser(res.data as User));
          } else {
            authedUser.isAuthed && dispatch(logoutUser());
          }
        })
        .catch((_: any) =>
          console.error("Fetching user from the server resulted with an error.")
        );
    }

    getUser();
  }, []);

  return { authedUser };
};

export default useAuth;
