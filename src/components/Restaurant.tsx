import { IRestaurant } from "../services/types";

type Props = {
  restaurant: IRestaurant;
};

export default function Restaurant({ restaurant }: Props) {
  return (
    <tr
      onClick={() =>
        (
          document.getElementById(
            `restaurant_${restaurant.id}`,
          ) as HTMLFormElement
        ).showModal()
      }
    >
      <td>{restaurant.name}</td>
      <td>{restaurant.foodRating}</td>
      <td>{restaurant.serviceRating}</td>
      <td>{restaurant.vibeRating}</td>
      <td><input type="checkbox" className="checkbox" checked={restaurant.littleBlanket} disabled={true} /></td>
    </tr>
  );
}
