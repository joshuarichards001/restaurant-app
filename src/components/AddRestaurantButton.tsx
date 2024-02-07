import { PlusIcon } from "./Icons";

export default function AddRestaurantButton() {
  return (
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
  );
}
