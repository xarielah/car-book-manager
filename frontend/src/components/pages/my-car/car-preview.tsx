import { useEffect, useState } from "react";
import { UserCar } from "../../../pages/my-cars/my-cars";
import { fetchCarFromMOT } from "../../../service/mot-car-data";
import { MOTCarData } from "../add-a-car/car-search-info";
import { Link } from "react-router-dom";
import { parseDate, parseNumber } from "../../../lib/util";
import CarPlate from "./car-plate";
import DeleteOwnedCar from "./delete-owned-car";

const CarPreview = ({ car }: ICarPreviewProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [carData, setCarData] = useState<MOTCarData | null>(null);

  useEffect(() => {
    async function getCarMOTData() {
      const carData = await fetchCarFromMOT(car.number);
      if (carData) {
        setCarData(carData);
      } else {
        setCarData(null);
      }
      setLoading(false);
    }

    getCarMOTData();
  }, [car]);

  if (loading) return <>מביאים את הנתונים של הרכב...</>;
  return (
    <div className="flex justify-between rounded-md bg-white shadow-md p-5">
      <div>
        <CarPlate>{car.number.toString()}</CarPlate>
        <h1 className="font-bold text-3xl mt-3">
          {carData ? carData.tozeret_nm + " " + carData.kinuy_mishari : ""}
        </h1>
        <div>קילומטראז' אחרון שהוזן: {parseNumber(+car.milage)} ק"מ</div>
        {carData ? (
          <>
            <div>
              תאריך טסט אחרון: {parseDate(carData?.mivchan_acharon_dt ?? "")}{" "}
              ק"מ
            </div>
            <div>תאריך טסט הבא: {parseDate(carData?.tokef_dt ?? "")} ק"מ</div>
          </>
        ) : (
          ""
        )}
      </div>
      <div className="flex flex-col gap-2 items-end">
        <Link to={`/manage-cars/car/${car._id}`}>
          <button className="classic-sub-button button classic-mid-button">
            צפה בטיפולים
          </button>
        </Link>
        <DeleteOwnedCar carId={car._id} />
      </div>
    </div>
  );
};

interface ICarPreviewProps {
  car: UserCar;
}

export default CarPreview;
