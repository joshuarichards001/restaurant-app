import EditRestaurantModalForm from "../components/EditRestaurantModalForm";

export default function AddRestaurantModal() {
  return (
    <dialog id="add_restaurant" className="modal modal-bottom">
      <EditRestaurantModalForm isAddNew={true} />
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
