import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { getInitialFormData } from "../services/functions";
import { IRestaurant } from "../services/types";
import AddMenuItems from "./AddMenuItems";
import StarRating from "./StarRating";

type Props = {
  restaurant?: IRestaurant;
  isAddNew: boolean;
  modalId: string;
};

export default function EditRestaurantModal({
  restaurant,
  isAddNew,
  modalId,
}: Props) {
  const [formData, setFormData] = useState(restaurant ?? getInitialFormData());

  useEffect(() => {
    if (formData.name === "") {
      return;
    }

    const timeoutId = setTimeout(() => {
      setDoc(doc(db, "restaurants", formData.id), formData);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [formData]);

  return (
    <dialog id={modalId} className="modal modal-bottom">
      <div className="modal-box h-3/4 flex flex-col">
        {/** below is a component to catch the auto focus so it doesn't go to the edit button */}
        <input
          style={{ opacity: 0, position: "absolute" }}
          tabIndex={-1}
          readOnly
        />
        <div className="flex mb-4">
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
            className="input input-bordered w-60 font-bold text-xl text-primary mr-4 mb-4"
          />
          {isAddNew && formData.name !== "" && (
            <button
              className="btn btn-outline"
              onClick={() => setFormData(getInitialFormData)}
            >
              Reset
            </button>
          )}
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
        {!isAddNew && (
          <form method="dialog">
            <button
              onClick={() => {
                if (window.confirm("Are you sure?")) {
                  deleteDoc(doc(db, "restaurants", formData.id));
                }
              }}
              className="btn btn-outline btn-error btn-sm"
              type="submit"
            >
              Delete Restaurant
            </button>
          </form>
        )}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
