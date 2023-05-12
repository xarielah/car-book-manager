import axios from "axios";
import { MOTCarData } from "../components/pages/add-a-car/car-search-info";

function fetchCarFromMOT(
  carNumber: string
): Promise<MOTCarData | null | undefined> {
  return axios
    .get(
      `https://data.gov.il/api/3/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3&filters={"mispar_rechev":"${carNumber}"}`
    )
    .then((res) => {
      if (res.data.result.total > 0) {
        return res.data.result.records[0] as MOTCarData;
      }
    });
}

export { fetchCarFromMOT };
