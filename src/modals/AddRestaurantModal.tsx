import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import AddMenuItems from "../components/AddMenuItems";
import StarRating from "../components/StarRating";
import { db } from "../services/firebase";
import { IRestaurant } from "../services/types";

const initialFormData: Omit<IRestaurant, "id"> = {
  name: "",
  foodRating: 0,
  serviceRating: 0,
  vibeRating: 0,
  menuItems: [],
};

export default function AddRestaurantModal() {
  const [formData, setFormData] = useState(initialFormData);

  const addDocument = async () => {
    try {
      await addDoc(collection(db, "restaurants"), formData);
      setFormData(initialFormData);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <dialog id="add_restaurant" className="modal modal-bottom">
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
            onClick={addDocument}
            className="btn btn-sm btn-primary"
            type="submit"
          >
            Add Restaurant
          </button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={() => setFormData(initialFormData)}>close</button>
      </form>
    </dialog>
  );
}
