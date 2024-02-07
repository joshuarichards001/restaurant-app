import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import RestaurantModal from "../modals/RestaurantModal";
import { db } from "../services/firebase";
import { IRestaurant } from "../services/types";
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
            <th>Name</th>
            <th>Food</th>
            <th>Service</th>
            <th>Vibe</th>
          </tr>
        </thead>
        <tbody>
          {restaurants?.map((restaurant: IRestaurant) => (
            <Restaurant key={restaurant.id} restaurant={restaurant} />
          ))}
        </tbody>
      </table>
      {restaurants?.map((restaurant: IRestaurant) => (
        <RestaurantModal key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
}
