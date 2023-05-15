import React, { useEffect} from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchImages } from "./actions/imageActions";
import Navbar from "./components/Navbar";
import ImageView from "./components/imageview";
import Signup from "./components/signup/signup";
import Login from "./components/login/login";

const App = () => {
  const dispatch = useDispatch();
  const images = useSelector((state) => state.images.images);
  const loading = useSelector((state) => state.images.loading);
  const error = useSelector((state) => state.images.error);

  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const user = localStorage.getItem("token");

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/login" element={<Login />} />
        {user&&<Route exact path="/home" element={<ImageView images={images} />} />}
        <Route exact path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
};

export default App;
