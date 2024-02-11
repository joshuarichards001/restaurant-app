import { v4 as uuidv4 } from "uuid";
import { IRestaurant } from "./types";

export const getInitialFormData = (): IRestaurant => {
  return {
    id: uuidv4(),
    name: "",
    foodRating: 0,
    serviceRating: 0,
    vibeRating: 0,
    menuItems: [],
  };
};
