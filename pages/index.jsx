import Header from "../components/header/header";
import HomePage from "./home";
export default function Home() {
  return (
    <div id="page-content" className="pd40">
      <div id="header">
      <Header></Header>
      </div>
      <div id="body">
      <HomePage></HomePage>
      </div>
      <div id="footer"></div>

    </div>
  );
}
