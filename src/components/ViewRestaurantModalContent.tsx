import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../services/firebase";
import { IRestaurant } from "../services/types";
import { ThumbsDownIcon, ThumbsUpIcon } from "./Icons";
import StarRating from "./StarRating";

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
    if (window.confirm("Are you sure you want to delete this restaurant?")) {
      deleteDoc(doc(db, "restaurants", restaurant.id));
    }
  };

  return (
    <div className="modal-box h-3/4">
      <div className="flex flex-row mb-8 justify-between">
        <div className="flex flex-row">
          <h1 className="text-2xl mr-2">{restaurant.name}</h1>
          <button
            className="btn btn-sm mr-4"
            onClick={() => setIsView(!isView)}
          >
            Edit
          </button>
        </div>
        <form method="dialog">
          <button
            onClick={deleteRestaurant}
            className="btn btn-sm btn-outline btn-error"
            type="submit"
          >
            Delete
          </button>
        </form>
      </div>
      <div className="flex flex-col mb-4">
        <div className="flex flex-row justify-between">
          <div>
            <p>Food</p>
            <StarRating rating={restaurant.foodRating} />
          </div>
          <div>
            <p>Service</p>
            <StarRating rating={restaurant.serviceRating} />
          </div>
        </div>
        <div>
          <p>Vibe</p>
          <StarRating rating={restaurant.vibeRating} />
        </div>
      </div>
      <div>
        <p className="mb-2">Menu Items</p>
        {restaurant.menuItems.map((mI) => (
          <div
            key={mI.id}
            className="flex flex-row items-center p-2 bg-neutral mb-3 rounded-lg w-fit"
          >
            <p className="mr-4">{mI.name}</p>
            {mI.wouldEatAgain ? <ThumbsUpIcon /> : <ThumbsDownIcon />}
          </div>
        ))}
      </div>
    </div>
  );
}
