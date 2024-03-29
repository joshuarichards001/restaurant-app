import { IRestaurant } from "../services/types";

type Props = {
  restaurant: IRestaurant;
};

export default function Restaurant({ restaurant }: Props) {
  const getColor = (rating: number) => {
    if (rating < 3) {
      return "text-red-500";
    } else if (rating < 4) {
      return "text-base-content";
    } else {
      return "text-green-500";
    }
  };

  const RestaurantCell = ({ rating }: { rating: number }) => (
    <td className={`${getColor(rating)}`}>{rating}</td>
  );

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
      <RestaurantCell rating={restaurant.foodRating} />
      <RestaurantCell rating={restaurant.serviceRating} />
      <RestaurantCell rating={restaurant.vibeRating} />
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
