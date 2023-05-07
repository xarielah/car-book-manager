import { useState } from "react";
import axiosClient from "../../../service/axios";

const CarSearchInfo = ({ car }: ICarSearchInfoProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const addCar = (carNumber: string) => {
    setLoading(true);
    axiosClient
      .post("/manage-cars/add-new-car", { car: carNumber })
      .then((res) => res.data)
      .catch((_) => console.error("Error occurred while adding a car"))
      .finally(() => setLoading(false));
  };

  return (
    <section>
      <h1 className="font-bold text-3xl">מצאנו את הרכב שלך</h1>
      <article className="flex-col gap-3 flex">
        <div className="flex justify-between">
          <h2 className="font-bold text-4xl">{car.mispar_rechev}</h2>
          <button
            onClick={() =>
              addCar(car.mispar_rechev ? car.mispar_rechev.toString() : "")
            }
          >
            {loading ? "מוסיף את הרכב..." : "הוסף רכב"}
          </button>
        </div>
        <p>
          רכב מסוג {car.tozeret_nm} {car.kinuy_mishari}, שנת עלייה לכביש{" "}
          {car.shnat_yitzur}, טסט אחרון מתאריך{" "}
          {new Date(car.mivchan_acharon_dt ?? "").toLocaleDateString("en-IL")}{" "}
          עד {new Date(car.tokef_dt ?? "").toLocaleDateString("en-IL")}
        </p>
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
