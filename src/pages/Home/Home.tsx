import { useState } from "react";
import { ToastContainer } from "react-toastify";
import Header from "../../components/Header/Header";
import Books from "../../components/Books/Books";

const Home = () => {
  const [searchTitle, setSearchTitle] = useState("");

  return (
    <>
      <Header setSearchTitle={setSearchTitle} />
      <Books searchTitle={searchTitle} />
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
};

export default Home;