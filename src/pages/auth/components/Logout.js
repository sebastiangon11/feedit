import { useAuth } from "@contexts/auth";
import { IconButton } from "components/IconButton";
import { DoorOutIcon } from "components/icons/DoorOut";
import { toast } from "react-toastify";

export const Logout = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <IconButton
      onClick={handleLogout}
      className="flex items-center m-4"
      icon={<DoorOutIcon className="w-6 h-6 fill-current text-gray-100" />}
    >
      Log out
    </IconButton>
  );
};
