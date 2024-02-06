import { useQuery } from "@tanstack/react-query";
import { User, onAuthStateChanged } from "firebase/auth";
import AddRestaurantButton from "./components/AddRestaurantButton";
import AddRestaurantModal from "./components/AddRestaurantModal";
import Restaurants from "./components/Restaurants";
import { auth } from "./firebase";

async function getUser() {
  return new Promise<User | null>((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe();
        resolve(user);
      },
      reject,
    );
  });
}

export default function Home() {
  const query = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  if (query.isLoading) {
    return <p>Loading...</p>;
  }

  if (query.isError) {
    return <p>Error: {query.error.message}</p>;
  }

  return (
    <div>
      <Restaurants />
      <AddRestaurantButton />
      <AddRestaurantModal />
    </div>
  );
}
