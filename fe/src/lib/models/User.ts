import { AssetInfo } from "./AssetInfo";
import { Work } from "./Work";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  accesstoken?: string;
  refreshtoken?: string;
  gender?: number;
  age: string;
  avatar?: AssetInfo;
  nameCity?: string;
  city?: City;
  work?: Work;
  startWork?: Date;
  endWork?: Date;
  bio?: string;
  phone?: number;
}
export interface City {
  nameCity: string;
  time: Date;
}
export const enum Gender {
  Male = 1,
  Female,
}
export const genderNames = {
  [Gender.Male]: "Male",
  [Gender.Female]: "Female",
};

export const genders = [
  { key: 1, value: Gender.Male },
  { key: 2, value: Gender.Female },
];
