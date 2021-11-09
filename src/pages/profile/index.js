import { useAuth } from "contexts/auth";

export const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div>
      <div className="m-4 flex items-center space-x-4">
        {user.attributes.picture ? (
          <img src={user.attributes.picture} alt={user.username} className="w-10 h-10 rounded-full shadow" />
        ) : (
          <div className="rounded-full bg-indigo-900 w-10 h-10 flex items-center justify-center font-semibold">
            {user.username.charAt(0).toUpperCase()}
          </div>
        )}
        <p>{user.username}</p>
        <h2>My posts</h2>
      </div>
    </div>
  );
};
