import { useState } from "react";
import { IRestaurant } from "../services/types";
import EditRestaurantModalForm from "./EditRestaurantModalForm";
import ViewRestaurantModalContent from "./ViewRestaurantModalContent";

type Props = {
  restaurant: IRestaurant;
};

export default function RestaurantModal({ restaurant }: Props) {
  const [isView, setIsView] = useState(true);

  return (
    <dialog id={`restaurant_${restaurant.id}`} className="modal modal-bottom">
      {isView ? (
        <ViewRestaurantModalContent
          restaurant={restaurant}
          setIsView={setIsView}
        />
      ) : (
        <EditRestaurantModalForm
          restaurant={restaurant}
          setIsView={setIsView}
        />
      )}
      <form method="dialog" className="modal-backdrop">
        <button onClick={() => setIsView(true)}>close</button>
      </form>
    </dialog>
  );
}
