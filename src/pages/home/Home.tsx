import { useAuthData } from "../../context/AuthContext";

export default function Home() {
  const { user } = useAuthData();
  return (
    <>
      <h1>Home</h1>
      {user && <p>{user.username}</p>}
    </>
  );
}
