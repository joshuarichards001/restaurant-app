import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../services/firebase";
import { getInitialFormData } from "../services/functions";
import { IRestaurant } from "../services/types";
import AddMenuItems from "./AddMenuItems";
import StarRating from "./StarRating";

type Props = {
  restaurant?: IRestaurant;
  isAddNew?: boolean;
  modalId: string;
};

export default function EditRestaurantModal({
  restaurant,
  isAddNew,
  modalId,
}: Props) {
  const [formData, setFormData] = useState(restaurant ?? getInitialFormData());

  const setDocument = async () => {
    try {
      await setDoc(doc(db, "restaurants", formData.id), formData);
      isAddNew && setFormData(getInitialFormData());
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <dialog id={modalId} className="modal modal-bottom">
      <div className="modal-box h-3/4 flex flex-col">
        {/** below is a component to catch the auto focus so it doesn't go to the edit button */}
        <input
          style={{ opacity: 0, position: "absolute" }}
          tabIndex={-1}
          readOnly
        />
        <div className="flex justify-between mb-4">
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
            className="input input-bordered font-bold text-xl text-primary mr-4 mb-4"
          />
          <form method="dialog">
            <button
              onClick={setDocument}
              className="btn btn-primary"
              type="submit"
            >
              Save
            </button>
          </form>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 mb-4">
          <div>
            <p>Food</p>
            <StarRating
              rating={formData.foodRating}
              setRating={(value: number) =>
                setFormData((prevState) => ({
                  ...prevState,
                  foodRating: value,
                }))
              }
            />
          </div>
          <div>
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
          </div>
          <div>
            <p>Vibe</p>
            <StarRating
              rating={formData.vibeRating}
              setRating={(value: number) =>
                setFormData((prevState) => ({
                  ...prevState,
                  vibeRating: value,
                }))
              }
            />
          </div>
          <div>
            <p>Lil Blankie</p>
            <input
              type="checkbox"
              className="checkbox mb-4"
              checked={formData.littleBlanket}
              onChange={() =>
                setFormData((prevState) => ({
                  ...prevState,
                  littleBlanket: !prevState.littleBlanket,
                }))
              }
            />
          </div>
        </div>
        <AddMenuItems
          menuItems={formData.menuItems}
          setMenuItems={(items: IRestaurant["menuItems"]) =>
            setFormData((prevState) => ({ ...prevState, menuItems: items }))
          }
        />
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={() => setFormData(restaurant ?? getInitialFormData())}>
          close
        </button>
      </form>
    </dialog>
  );
}
