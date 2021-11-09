import { useAuth } from "@contexts/auth";
import { IconButton } from "components/IconButton";
import { DoorOutIcon } from "components/icons/DoorOut";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { ROUTES } from "router/routes";

export const Logout = () => {
  const { logout } = useAuth();
  const history = useHistory();

  const handleLogout = async () => {
    try {
      await logout();
      history.push(ROUTES.FEED.path);
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
