export default function AddRestaurantButton() {
  return (
    <button
      className="btn btn-circle btn-primary fixed right-10 bottom-10"
      onClick={() =>
        (document.getElementById("add_restaurant") as HTMLFormElement).showModal()
      }
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
      >
        <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
      </svg>
    </button>
  );
}
