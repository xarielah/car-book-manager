import { useState, ChangeEvent } from "react";
import axios from "axios";
import CarSearchInfo, {
  MOTCarData,
} from "../../components/pages/add-a-car/car-search-info";
// # Don't forget to protect this page!!!
// # Logged users only.

const AddACar = () => {
  const [carNumber, setCarNumber] = useState<string>("");
  const [carFound, setCarFound] = useState<MOTCarData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  console.log("🚀 ~ file: add-a-car.tsx:9 ~ AddACar ~ carFound:", carFound);

  const searchCar = (carNum = carNumber) => {
    setLoading(true);
    axios
      .get(
        `https://data.gov.il/api/3/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3&filters={"mispar_rechev":"${carNum}"}`
      )
      .then((res) => {
        if (res.data.result.total > 0) {
          setCarFound(res.data.result.records[0]);
        } else {
          if (carFound) setCarFound(null);
        }
      })
      .catch((_) => console.error("Car search resulted with an error."))
      .finally(() => setLoading(false));
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setCarNumber(event.target.value.toString());
  };

  return (
    <section>
      <div className="flex gap-3">
        <input
          value={carNumber}
          onChange={handleInput}
          className="rounded-md shadow-md p-2 w-full"
          placeholder="חיפוש לפי מספר רכב"
        />
        <button
          onClick={() => searchCar()}
          className="px-10 bg-slate-50 rounded-md shadow-md hover:bg-slate-200"
        >
          חפש
        </button>
      </div>
      {loading ? "טוען פרטי רכב" : ""}
      {carFound ? <CarSearchInfo car={carFound} /> : ""}
    </section>
  );
};

export default AddACar;
