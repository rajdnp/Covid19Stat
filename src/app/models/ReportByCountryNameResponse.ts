import { province } from "./province";

export interface ReportByCountryNameResponse {
    country: string;
    provinces: province[];
    latitude: string;
    longitude: string;
    date: string;
  }