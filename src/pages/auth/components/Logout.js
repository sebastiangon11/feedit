import { Auth } from "aws-amplify";
import { useAuth } from "@contexts/auth";

export const Logout = () => {
  const { setUser } = useAuth();

  const handleLogout = async () => {
    try {
      await Auth.signOut();
      setUser(null);
    } catch (error) {
      console.log("error signing out: ", error);
    }
  };
  return (
    <button
      onClick={handleLogout}
      className="p-2 active:bg-gray-900 active:top-px active:ring-indigo-900 active:ring-2 underline"
      type="submit"
    >
      Log out
    </button>
  );
};
