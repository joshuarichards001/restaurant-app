import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../services/firebase";
import { IRestaurant } from "../services/types";
import AddMenuItems from "./AddMenuItems";
import StarRating from "./StarRating";

type Props = {
  restaurant: IRestaurant;
  setIsView?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EditRestaurantModalForm({
  restaurant,
  setIsView,
}: Props) {
  const [formData, setFormData] = useState(restaurant);

  const setDocument = async () => {
    try {
      await setDoc(doc(db, "restaurants", formData.id), formData);
      setIsView && setIsView(true);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="modal-box h-3/4 flex flex-col">
      <h1 className="text-2xl mb-2">Add Restaurant</h1>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={(e) =>
          setFormData((prevState) => ({
            ...prevState,
            name: e.target.value,
          }))
        }
        className="input input-sm input-bordered mr-4 mb-4"
      />
      <p>Food</p>
      <StarRating
        rating={formData.foodRating}
        setRating={(value: number) =>
          setFormData((prevState) => ({ ...prevState, foodRating: value }))
        }
      />
      <p>Service</p>
      <StarRating
        rating={formData.serviceRating}
        setRating={(value: number) =>
          setFormData((prevState) => ({
            ...prevState,
            serviceRating: value,
          }))
        }
      />
      <p>Vibe</p>
      <StarRating
        rating={formData.vibeRating}
        setRating={(value: number) =>
          setFormData((prevState) => ({ ...prevState, vibeRating: value }))
        }
      />
      <AddMenuItems
        menuItems={formData.menuItems}
        setMenuItems={(items: IRestaurant["menuItems"]) =>
          setFormData((prevState) => ({ ...prevState, menuItems: items }))
        }
      />
      <form method="dialog">
        <button
          onClick={setDocument}
          className="btn btn-sm btn-primary"
          type="submit"
        >
          Save Restaurant
        </button>
      </form>
    </div>
  );
}
