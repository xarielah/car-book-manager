import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axiosClient from "../../service/axios";
import ViewCarRecords from "../../components/pages/view-car/view-car-records";

const ViewCar = () => {
  const [carRecords, setCarRecords] = useState<CarRecord[]>([]); // change this to records type
  const [carNumber, setCarNumber] = useState<string>("");
  const params = useParams();

  useEffect(() => {
    function fetchCarRecords(carId: string) {
      axiosClient.get(`/car-records/${carId}`).then((res) => {
        const response = res.data as CarRecordsResponse;

        if (response.count > 0) {
          setCarRecords(response.records);
          setCarNumber(response.carNumber);
        }
      });
    }
    if (params.id) {
      fetchCarRecords(params.id);
    }
  }, []);

  return (
    <section>
      <div className="flex justify-end">
        <Link to={`/manage-cars/car/${params.id}/new-record`}>
          <button className="main-button button classic-mid-button">
            רישום טיפול נוסף
          </button>
        </Link>
      </div>
      {carRecords.length > 0
        ? carRecords.map((record, i) => (
            <ViewCarRecords key={i} carNumber={carNumber} record={record} />
          ))
        : "לא נמצאו רשומות טיפול לרכב זה"}
    </section>
  );
};

export type CarRecord = {
  car_id: string;
  type: string;
  description: string;
  milage: number;
};

type CarRecordsResponse = {
  count: number;
  records: CarRecord[];
  carNumber: string;
};

export default ViewCar;
