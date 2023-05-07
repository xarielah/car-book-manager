import { AuthPage, HomePage } from "./pages";
import { Routes, Route } from "react-router-dom";
import AddACar from "./pages/add-a-car/add-a-car";
import MyCars from "./pages/my-cars/my-cars";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/manage-cars">
        <Route path="new-car" element={<AddACar />} />
        <Route path="my-cars" element={<MyCars />} />
      </Route>
    </Routes>
  );
}

export default App;
