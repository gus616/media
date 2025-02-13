
import { toast, ToastContainer } from "react-toastify";
import "./App.css";
import Navbar from "./components/UI/Navbar";
import UsersLists from "./Users/UsersLists";
import { useEffect } from "react";

function App() {
  const notify = () => toast("Wow so easy!");

  useEffect(() => {
    notify();
  }, []);
  return (
    <>
      <Navbar />
      <div className="container mx-auto w-lg mt-10">
        <UsersLists />
        <ToastContainer />
      </div>
    </>

  );
}

export default App;
