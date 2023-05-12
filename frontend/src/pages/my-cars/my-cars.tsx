import CarPreview from "../../components/pages/my-car/car-preview";
import AddCarButton from "../../components/ui-elements/buttons/add-car-btn";
import useAuth from "../../hooks/use-auth";
import axiosClient from "../../service/axios";
import { useEffect, useState } from "react";

const MyCars = () => {
  const { authedUser } = useAuth();
  const [cars, setCars] = useState<UserCar[]>([]);

  useEffect(() => {
    if (authedUser.isAuthed) {
      axiosClient
        .get("/manage-cars/user-cars")
        .then((res) => res.data.count > 0 && setCars(res.data.cars));
    }
  }, [authedUser]);

  return (
    <div>
      <h1 className="heading">רשימת הרכבים שלך</h1>
      <div className="flex justify-end my-3">
        <AddCarButton />
      </div>
      {cars.length > 0
        ? cars.map((car, i) => <CarPreview car={car} key={i} />)
        : "לא נמצאו רכבים"}
    </div>
  );
};

export type UserCar = {
  milage: number;
  number: string;
  user_id: string;
  _id: string;
};

export default MyCars;
