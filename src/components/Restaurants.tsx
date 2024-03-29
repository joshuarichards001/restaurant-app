import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { IRestaurant } from "../services/types";
import EditRestaurantModal from "./EditRestaurantModal";
import Restaurant from "./Restaurant";

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "restaurants"),
      (snapshot) => {
        const restaurants: IRestaurant[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data() as Omit<IRestaurant, "id">;
          restaurants.push({
            id: doc.id,
            ...data,
          });
        });

        restaurants.sort((a, b) => a.name.localeCompare(b.name));
        setRestaurants(restaurants);
      },
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="flex flex-col">
      <table className="table">
        <thead>
          <tr>
            <th className="font-normal">Name</th>
            <th className="font-normal">Food</th>
            <th className="font-normal">Service</th>
            <th className="font-normal">Vibe</th>
            <th className="font-normal">Blankie</th>
          </tr>
        </thead>
        <tbody>
          {restaurants?.map((restaurant: IRestaurant) => (
            <Restaurant key={restaurant.id} restaurant={restaurant} />
          ))}
        </tbody>
      </table>
      {restaurants?.map((restaurant: IRestaurant) => (
        <EditRestaurantModal
          key={restaurant.id}
          isAddNew={false}
          restaurant={restaurant}
          modalId={`restaurant_${restaurant.id}`}
        />
      ))}
    </div>
  );
}
