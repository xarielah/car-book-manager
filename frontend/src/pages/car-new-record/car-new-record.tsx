import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserCar } from "../my-cars/my-cars";
import { fetchCar } from "../../service/car-service";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axiosClient from "../../service/axios";
import { parseCarNumber } from "../../lib/util";

const schema = yup.object().shape({
  milage: yup
    .string()
    .test(
      "is-number",
      "נדרש לציין קילומטראז' במספרים בלבד ללא פסיקים ואותיות",
      (milage) => Number.isInteger(milage) || !isNaN(milage ? +milage : 0)
    )
    .required("נדרש לציין קילומטר לטיפול."),
  type: yup
    .string()
    .required("נדרש לציין סוג טיפול שנעשה לרכב.")
    .max(256, "חרגת מכמות התווים המותרת לשדה סוג טיפול."),
  description: yup
    .string()
    .test(
      "not-empty-check",
      "חרגת מכמות התווים המותרת לתיאור הטיפול",
      (description) => (description && description.length > 512 ? false : true)
    ),
});

const CarNewRecord = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [currentCar, setCurrentCar] = useState<UserCar | null>(null);
  const [reqLoading, setReqLoading] = useState<boolean>(false);
  const [reqSuccess, setReqSuccess] = useState<boolean>(false);

  const params = useParams();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<NewRecordFieldsType>({ resolver: yupResolver(schema) });

  useEffect(() => {
    function getCarFromDB() {
      fetchCar(params.id ?? "")
        .then((res) => {
          if (res.status === 200) {
            setCurrentCar(res.data.car as UserCar);
          }
        })
        .finally(() => setLoading(false));
    }

    getCarFromDB();
  }, []);

  const onsubmit = (data: NewRecordFieldsType) => {
    if (!currentCar) return;

    setReqLoading(true);
    axiosClient
      .post("/car-records/new", { car_id: currentCar._id, ...data })
      .then((res) => console.log(res))
      .finally(() => {
        reset();
        setReqLoading(false);
        setReqSuccess(true);
      });
  };

  if (loading) return <>מייבא את פרטי הרכב שלך...</>;
  if (!currentCar) return <>אי אפשר לרשום טיפול לרכב שלא נמצא</>;
  if (reqSuccess) return <>הטיפול נוסף לרכב שלך!</>;
  return (
    <div>
      <h1 className="heading font-bold mb-6">
        רישום טיפול לרכב: {parseCarNumber(currentCar.number)}
      </h1>
      <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col gap-12">
        <div className="flex flex-col gap-2">
          <input
            className="classic-input"
            {...register("milage")}
            placeholder="קילומטר בעת ביצוע הטיפול"
          />
          <Tip>
            אנחנו דורשים את זה למענכם, למען אמינות מעקב הטיפולים אחרי הרכב
          </Tip>
          {errors.milage ? (
            <FieldError>{errors.milage.message}</FieldError>
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-col gap-2">
          <input
            className="classic-input"
            {...register("type")}
            placeholder="סוג הטיפול שבוצע לרכב - תקופתי / החלפת חלק / כללי וכו'..."
          />
          <Tip>
            תיעוד סוג הטיפול כמו תקופתי 10K, החלפת חלק, ריקול, וכולי - מאפשר
            לאגד וליצור תעודת זהות טיפולית לרכב טובה יותר בעתיד.
          </Tip>
          {errors.type ? <FieldError>{errors.type.message}</FieldError> : ""}
        </div>
        <div className="flex flex-col gap-2">
          <textarea
            className="classic-input"
            {...register("description")}
            placeholder="תיאור על מה בוצע ברכב בפועל"
            rows={5}
          />
          <Tip>
            אנחנו לא דורשים זאת, אבל מומלץ מאוד להסביר בכמה מילים מה נעשה באוטו
            בפועל. למענכם ולמען שקיפות יתרה לבעלים הבאים של הרכב.
          </Tip>
          {errors.description ? (
            <FieldError>{errors.description.message}</FieldError>
          ) : (
            ""
          )}
        </div>
        {/* <input type="file" placeholder="תיאור הטיפול" /> */}
        {reqLoading ? (
          <span>מוסיף טיפול לרכב שלך...</span>
        ) : (
          <button className="button main-button w-max classic-big-button">
            הוספת טיפול לרכב
          </button>
        )}
      </form>
    </div>
  );
};

export enum NewRecordFields {
  recMilage = "milage",
  recType = "type",
  recDesc = "description",
  recFile = "file",
}

export type NewRecordFieldsType = {
  milage: NewRecordFields.recMilage;
  type: NewRecordFields.recType;
  description: NewRecordFields.recDesc;
  //! Leaving file out for now.
};

const Tip = ({ children }: { children: string }) => {
  return <small className="text-slate-600 mr-4 mt-1">* {children}</small>;
};

const FieldError = ({ children }: { children: string | undefined }) => {
  return (
    <div className="text-red-500 bg-red-100 w-max py-1 pl-4 pr-2 text-sm rounded-lg shadow-md border-red-500/40 border-[1px]">
      <b>שימו לב:</b> {children}
    </div>
  );
};

export default CarNewRecord;
