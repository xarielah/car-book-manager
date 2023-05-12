import { AuthPage, HomePage } from "./pages";
import { Routes, Route, Navigate } from "react-router-dom";
import AddACar from "./pages/add-a-car/add-a-car";
import MyCars from "./pages/my-cars/my-cars";
import ViewCar from "./pages/view-car/view-car";
import CarNewRecord from "./pages/car-new-record/car-new-record";
import BlockAccessUnauthed from "./components/block-access-unauthed/block-access-unauthed";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/manage-cars">
        <Route
          path="new-car"
          element={
            <BlockAccessUnauthed>
              <AddACar />
            </BlockAccessUnauthed>
          }
        />
        <Route
          path="my-cars"
          element={
            <BlockAccessUnauthed>
              <MyCars />
            </BlockAccessUnauthed>
          }
        />
        <Route
          path="car"
          element={<Navigate to={"/manage-cars/my-cars"} replace={true} />}
        />
        <Route
          path="car/:id"
          element={
            <BlockAccessUnauthed>
              <ViewCar />
            </BlockAccessUnauthed>
          }
        />
        <Route
          path="car/:id/new-record"
          element={
            <BlockAccessUnauthed>
              <CarNewRecord />
            </BlockAccessUnauthed>
          }
        />
        <Route path="" element={<Navigate to="/" replace={true} />} />
      </Route>
    </Routes>
  );
}

export default App;
