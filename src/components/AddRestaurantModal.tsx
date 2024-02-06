import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { firestore } from "../firebase";

export default function AddRestaurantModal() {
  const [name, setName] = useState("");

  const addDocument = async () => {
    try {
      const docRef = await addDoc(collection(firestore, "restaurants"), {
        name,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <dialog id="add_restaurant" className="modal modal-bottom">
      <div className="modal-box h-1/2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered mr-4"
        />
        <button onClick={addDocument} className="btn btn-primary" type="submit">
          Add Restaurant
        </button>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
