import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import AddRestaurantButton from "./components/AddRestaurantButton";
import Restaurants from "./components/Restaurants";
import SignInButton from "./components/SignInButton";
import AddRestaurantModal from "./modals/AddRestaurantModal";
import { auth } from "./services/firebase";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!user) {
    return <SignInButton />;
  }

  return (
    <div>
      <h1 className="text-4xl mb-4 m-5 mt-8 text-primary">Restaurants</h1>
      <Restaurants />
      <AddRestaurantButton />
      <AddRestaurantModal />
    </div>
  );
}

export default App;
