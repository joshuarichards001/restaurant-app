import { useQuery, useQueryClient } from "@tanstack/react-query";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { firestore } from "../firebase";

interface Restaurant {
  id: string;
  name: string;
}

const fetchRestaurants = async (): Promise<Restaurant[]> => {
  const snapshot = await getDocs(collection(firestore, "users"));
  return snapshot.docs.map((doc) => ({ id: doc.id, name: doc.data().name }));
};

export default function Restaurants() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["restaurants"],
    queryFn: fetchRestaurants,
    
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, "restaurants"),
      (snapshot) => {
        queryClient.setQueryData(
          ["restaurants"],
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
        );
      },
    );
    return () => unsubscribe();
  }, [queryClient]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      {data?.map((restaurant) => (
        <div key={restaurant.id}>{restaurant.name}</div>
      ))}
    </div>
  );
}
