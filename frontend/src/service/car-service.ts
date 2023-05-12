import { AxiosResponse } from "axios";
import axiosClient from "./axios";

function fetchCar(carNumber: string): Promise<AxiosResponse> {
  return axiosClient.get(`/manage-cars/${carNumber}`);
}

export { fetchCar };
