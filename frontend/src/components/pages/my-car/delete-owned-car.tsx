import { useState } from "react";
import axiosClient from "../../../service/axios";

const DeleteOwnedCar = ({ carId }: IDeleteOwnedCarProps) => {
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const toggleDelState = () => setIsDelete((prev) => !prev);

  const doDeletion = () => {
    setLoading(true);
    axiosClient
      .delete(`/manage-cars/${carId}`)
      .then((res) => console.log(res))
      .finally(() => {
        setLoading(false);
        window.location.reload();
      });
  };

  if (loading) return <>טוען...</>;
  if (isDelete)
    return (
      <div className="flex gap-1 mx-auto items-center flex-col font-bold">
        <span>אתם בטוחים?</span>
        <div className="flex gap-3">
          <button
            onClick={doDeletion}
            className="button classic-sub-button classic-mid-button"
          >
            כן
          </button>
          <button
            onClick={toggleDelState}
            className="button classic-red-button classic-mid-button"
          >
            לא
          </button>
        </div>
      </div>
    );
  return (
    <button
      onClick={toggleDelState}
      className="classic-red-button button classic-mid-button"
    >
      שחרור רכב מבעלותך
    </button>
  );
};

interface IDeleteOwnedCarProps {
  carId: string;
}

export default DeleteOwnedCar;
