import { useAuth } from "@contexts/auth";

export const Logout = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log("error signing out: ", error);
    }
  };

  return (
    <div className="flex items-center	">
      <img
        src={user.attributes.picture}
        className="w-10 h-10 rounded-full shadow"
        alt={user.username}
      />
      <button
        onClick={handleLogout}
        className="p-2 active:bg-gray-900 active:top-px active:ring-indigo-900 active:ring-2 underline"
        type="submit"
      >
        Log out
      </button>
    </div>
  );
};
