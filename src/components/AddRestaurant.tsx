import EditRestaurantModalForm from "./EditRestaurantModalForm";
import { PlusIcon } from "./Icons";

export default function AddRestaurant() {
  return (
    <>
      <button
        className="btn btn-circle btn-primary fixed right-10 bottom-10"
        onClick={() =>
          (
            document.getElementById("add_restaurant") as HTMLFormElement
          ).showModal()
        }
      >
        <PlusIcon />
      </button>
      <dialog id="add_restaurant" className="modal modal-bottom">
        <EditRestaurantModalForm isAddNew={true} />
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
