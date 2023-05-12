import { Link } from "react-router-dom";
import { GoPlus } from "react-icons/go";

const AddCarButton = () => {
  return (
    <Link to="/manage-cars/new-car">
      <button className="flex items-center gap-2 button main-button classic-mid-button">
        הוספת רכב חדש <GoPlus />
      </button>
    </Link>
  );
};

export default AddCarButton;
