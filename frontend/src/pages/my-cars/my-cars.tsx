import useAuth from "../../hooks/use-auth";
import axiosClient from "../../service/axios";
import { useEffect } from "react";

const MyCars = () => {
  const { authedUser } = useAuth();

  useEffect(() => {
    if (authedUser.isAuthed) {
      const result = axiosClient
        .get("/manage-cars/user-cars")
        .then((res) => res.data);
      console.log("🚀 ~ file: my-cars.tsx:11 ~ useEffect ~ result:", result);
    }
  }, []);

  return <div>MyCars</div>;
};

export default MyCars;
