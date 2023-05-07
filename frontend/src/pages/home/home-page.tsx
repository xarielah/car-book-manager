import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <Link to="/manage-cars/new-car">
        <button>הוסף רכב חדש</button>
      </Link>
    </div>
  );
};

export default HomePage;
