import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../services/firebase";
import { IRestaurant } from "../services/types";

type Props = {
  restaurant: IRestaurant;
};

export default function RestaurantModal({ restaurant }: Props) {
  const deleteRestaurant = async () => {
    deleteDoc(doc(db, "restaurants", restaurant.id));
  };

  return (
    <dialog id={`restaurant_${restaurant.id}`} className="modal modal-bottom">
      <div className="modal-box h-3/4">
        <h1 className="text-2xl mb-2">{restaurant.name}</h1>
        <div className="flex flex-col mb-4">
          <div className="flex flex-row justify-between">
            <p>Food Rating: {restaurant.foodRating}</p>
            <p>Service Rating: {restaurant.serviceRating}</p>
          </div>
          <div>
            <p>Vibe Rating: {restaurant.vibeRating}</p>
          </div>
        </div>
        <div>
          {restaurant.menuItems.map((mI) => (
            <div key={mI.id} className="flex flex-row items-center">
              <p>{mI.name}</p>
              <p>{mI.wouldEatAgain ? "Yes" : "No"}</p>
            </div>
          ))}
        </div>
        <form method="dialog">
          <button
            onClick={deleteRestaurant}
            className="btn btn-sm btn-outline btn-error mt-8"
            type="submit"
          >
            Delete Restaurant
          </button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
