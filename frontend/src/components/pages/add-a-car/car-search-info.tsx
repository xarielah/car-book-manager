import { useState } from "react";
import axiosClient from "../../../service/axios";
import useAuth from "../../../hooks/use-auth";
import { Link, useNavigate } from "react-router-dom";
import CarPlate from "../my-car/car-plate";
import { parseDate } from "../../../lib/util";
import OwnCarSearch from "../../ui-elements/buttons/own-car-search";
import {} from "react-router-dom";

const CarSearchInfo = ({ car }: ICarSearchInfoProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { authedUser } = useAuth();

  const navigate = useNavigate();

  const addCar = (carNumber: string) => {
    setLoading(true);
    axiosClient
      .post("/manage-cars/add-new-car", { car: carNumber })
      .then((_) => {
        navigate("/manage-cars/my-cars", { replace: true });
      })
      .catch((_) => console.error("Error occurred while adding a car"))
      .finally(() => setLoading(false));
  };

  return (
    <section className="flex flex-col my-12 gap-6">
      <h1 className="heading">מצאנו את הרכב שלך</h1>
      <article className="flex-col gap-3 flex">
        <div className="flex justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="font-bold text-slate-700 text-2xl">
              {car.tozeret_nm}, {car.kinuy_mishari}, שנת {car.shnat_yitzur}
            </h2>
            <CarPlate>
              {car.mispar_rechev ? car.mispar_rechev.toString() : ""}
            </CarPlate>
          </div>
          {authedUser.ownedCars.includes(
            car.mispar_rechev ? car.mispar_rechev.toString() : ""
          ) ? (
            <div className="flex flex-col gap-1 items-center">
              <small>רכב זה כבר בבעלותך</small>
              <Link to="/manage-cars/my-cars">
                <button className="button classic-mid-button classic-sub-button">
                  הרכבים שלי
                </button>
              </Link>
            </div>
          ) : !loading ? (
            <OwnCarSearch
              fn={() =>
                addCar(car.mispar_rechev ? car.mispar_rechev.toString() : "")
              }
            />
          ) : (
            <>רושם את הרכב בבעלותך...</>
          )}
        </div>
        <div className="flex flex-col">
          <div>
            תוקף מבחן רישוי נוכחי: {parseDate(car.mivchan_acharon_dt ?? "")}
          </div>
          <div>מבחן רישוי הבא: {parseDate(car.tokef_dt ?? "")}</div>
        </div>
      </article>
    </section>
  );
};

interface ICarSearchInfoProps {
  car: MOTCarData;
}

export type MOTCarData = {
  _id: number | null;
  mispar_rechev: number | null;
  tozeret_cd: string | null;
  sug_degem: string | null;
  tozeret_nm: string | null;
  degem_cd: string | null;
  degem_nm: string | null;
  ramat_gimur: string | null;
  ramat_eivzur_betihuty: string | null;
  kvutzat_zihum: string | null;
  shnat_yitzur: string | null;
  degem_manoa: string | null;
  mivchan_acharon_dt: string | null;
  tokef_dt: string | null;
  baalut: string | null;
  misgeret: string | null;
  tzeva_cd: string | null;
  tzeva_rechev: string | null;
  zmig_kidmi: string | null;
  zmig_ahori: string | null;
  sug_delek_nm: string | null;
  horaat_rishum: string | null;
  moed_aliya_lakvish: string | null;
  kinuy_mishari: string | null;
  rank: number | null;
};

export default CarSearchInfo;
