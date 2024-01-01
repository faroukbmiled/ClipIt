import Header from "../components/header/header";
import { useSession, signOut } from "next-auth/react";
import HomePage from "./home";
export default function Home() {
  const { data: session, status } = useSession();
  return (
    <div id="page-content" className="pd40">
      <div id="header">
        <Header session={session} status={status} signOut={signOut}></Header>
      </div>
      <div id="body">
        <HomePage></HomePage>
      </div>
      <div id="footer"></div>
    </div>
  );
}
