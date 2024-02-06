import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

export default function SignInButton() {
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, provider);
  }

  return (
    <button className="btn" onClick={googleSignIn}>
      Sign in with Google
    </button>
  );
}
