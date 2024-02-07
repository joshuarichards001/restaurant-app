import { v4 as uuidv4 } from "uuid";
import EditRestaurantModalForm from "../components/EditRestaurantModalForm";
import { IRestaurant } from "../services/types";

const initialFormData: IRestaurant = {
  id: uuidv4(),
  name: "",
  foodRating: 0,
  serviceRating: 0,
  vibeRating: 0,
  menuItems: [],
};

export default function AddRestaurantModal() {
  return (
    <dialog id="add_restaurant" className="modal modal-bottom">
      <EditRestaurantModalForm restaurant={initialFormData} />
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
