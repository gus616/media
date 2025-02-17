
import { toast } from "react-toastify";
import "./App.css";
import { useEffect } from "react";
import { Router } from "./Router/Router";

function App() {
  const notify = () => toast("🚀 Welcome to MediaFy");

  useEffect(() => {
    notify();
  }, []);
  return (
    <>
      <Router />
    </>

  );
}

export default App;
