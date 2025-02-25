import { Outlet } from "react-router-dom";
import "./App.css";
import Nav from "./components/header/Nav";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <div className="flex inter flex-col min-h-screen">
      <div>
        <Nav />
      </div>
      <div className="flex-grow">
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
