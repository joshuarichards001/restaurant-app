import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../services/firebase";
import { IRestaurant } from "../services/types";

type ViewProps = {
  restaurant: IRestaurant;
  isView: boolean;
  setIsView: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ViewRestaurantModalContent({
  restaurant,
  isView,
  setIsView,
}: ViewProps) {
  const deleteRestaurant = async () => {
    deleteDoc(doc(db, "restaurants", restaurant.id));
  };

  return (
    <div className="modal-box h-3/4">
      <div className="flex flex-row mb-4">
        <h1 className="text-2xl mr-4">{restaurant.name}</h1>
        <button className="btn btn-sm" onClick={() => setIsView(!isView)}>
          Edit
        </button>
      </div>
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
  );
}
