import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import EditRestaurantModal from "./components/EditRestaurantModalForm";
import { PlusIcon } from "./components/Icons";
import Restaurants from "./components/Restaurants";
import SignInButton from "./components/SignInButton";
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
      <EditRestaurantModal isAddNew={true} modalId="add_restaurant" />
    </div>
  );
}

export default App;
