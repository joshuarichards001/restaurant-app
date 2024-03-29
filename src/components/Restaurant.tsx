import { IRestaurant } from "../services/types";

type Props = {
  restaurant: IRestaurant;
};

export default function Restaurant({ restaurant }: Props) {
  return (
    <tr
      className="active:bg-base-200"
      onClick={() =>
        (
          document.getElementById(
            `restaurant_${restaurant.id}`,
          ) as HTMLFormElement
        ).showModal()
      }
    >
      <td className="font-bold text-accent">{restaurant.name}</td>
      <td>{restaurant.foodRating}</td>
      <td>{restaurant.serviceRating}</td>
      <td>{restaurant.vibeRating}</td>
      <td>
        <input
          type="checkbox"
          className="checkbox"
          checked={restaurant.littleBlanket}
          disabled={true}
        />
      </td>
    </tr>
  );
}
