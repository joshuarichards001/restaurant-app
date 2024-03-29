import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { db } from "../services/firebase";
import { IRestaurant } from "../services/types";
import AddMenuItems from "./AddMenuItems";
import StarRating from "./StarRating";

type Props = {
  restaurant?: IRestaurant;
  isAddNew: boolean;
  modalId: string;
};

const getInitialFormData = (): IRestaurant => ({
  id: uuidv4(),
  name: "",
  foodRating: 0,
  serviceRating: 0,
  vibeRating: 0,
  menuItems: [],
  littleBlanket: false,
});

export default function EditRestaurantModal({
  restaurant,
  isAddNew,
  modalId,
}: Props) {
  const [formData, setFormData] = useState(restaurant ?? getInitialFormData());

  // Autosave changes of the restaurant to Firestore
  useEffect(() => {
    if (isAddNew) {
      return;
    }

    const timeoutId = setTimeout(() => {
      setDoc(doc(db, "restaurants", formData.id), formData);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [formData, isAddNew]);

  const createRestaurant = async () => {
    await setDoc(doc(db, "restaurants", formData.id), formData);
    setFormData(getInitialFormData());
  };

  const deleteRestaurant = async () => {
    if (window.confirm("Are you sure?")) {
      deleteDoc(doc(db, "restaurants", formData.id));
    }
  };

  const InputHeader = ({ children }: { children: React.ReactNode }) => (
    <p className="text-sm text-base-content/70 mb-1">{children}</p>
  );

  return (
    <dialog id={modalId} className="modal modal-bottom">
      <div className="modal-box h-3/4 flex flex-col">
        {/** below is a component to catch the auto focus so it doesn't go to the edit button */}
        <input
          style={{ opacity: 0, position: "absolute" }}
          tabIndex={-1}
          readOnly
        />
        <div className="flex items-center">
          <input
            type="text"
            name="name"
            placeholder="Name..."
            value={formData.name}
            onChange={(e) =>
              setFormData((prevState) => ({
                ...prevState,
                name: e.target.value,
              }))
            }
            className="input p-0 w-60 font-bold text-2xl text-accent mr-4"
          />
          {!isAddNew && (
            <button
              onClick={deleteRestaurant}
              className="btn btn-neutral btn-sm"
              type="submit"
            >
              <p className="text-error">Delete</p>
            </button>
          )}
        </div>
        <div className="grid grid-cols-2 grid-rows-2 mb-4">
          <div>
            <InputHeader>Food</InputHeader>
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
            <InputHeader>Service</InputHeader>
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
            <InputHeader>Vibe</InputHeader>
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
            <InputHeader>Lil Blankie</InputHeader>
            <input
              type="checkbox"
              className="checkbox checkbox-warning border-gray-500 mb-4"
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
        <InputHeader>Menu Items</InputHeader>
        <AddMenuItems
          menuItems={formData.menuItems}
          setMenuItems={(items: IRestaurant["menuItems"]) =>
            setFormData((prevState) => ({ ...prevState, menuItems: items }))
          }
        />
        {isAddNew && (
          <form method="dialog">
            <button
              onClick={createRestaurant}
              className="btn btn-primary btn-sm"
              type="submit"
            >
              Create Restaurant
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
