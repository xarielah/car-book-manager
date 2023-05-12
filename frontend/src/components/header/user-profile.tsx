import useAuth from "../../hooks/use-auth";

const UserProfile = () => {
  const { authedUser } = useAuth();
  return (
    <div className="flex gap-3 items-center">
      <span>שלום, {authedUser.displayName}</span>
      <img src={authedUser.avatar} className="w-8 h-8 rounded-full" />
    </div>
  );
};

export default UserProfile;
