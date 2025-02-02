
import "./App.css";
import Navbar from "./components/UI/Navbar";
import UsersLists from "./Users/UsersLists";

function App() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto w-lg mt-10">
        <UsersLists />
      </div>
    </>

  );
}

export default App;
