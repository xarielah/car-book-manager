import { parseCarNumber, parseNumber } from "../../../lib/util";
import { CarRecord } from "../../../pages/view-car/view-car";

const ViewCarRecords = ({ record, carNumber }: IViewCarRecordsProps) => {
  return (
    <article className="bg-white my-4 shadow-md rounded-md p-3">
      <ul>
        <li>מספר רכב: {parseCarNumber(carNumber)}</li>
        <li>סוג טיפול: {record.type}</li>
        <li>ק"מ בעת ביצוע הטיפול: {parseNumber(record.milage)} ק"מ</li>
        <li>תיאור: {record.description}</li>
      </ul>
    </article>
  );
};

interface IViewCarRecordsProps {
  record: CarRecord;
  carNumber: string;
}

export default ViewCarRecords;
