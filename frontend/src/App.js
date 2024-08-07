import logo from "./logo.svg";
import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import SummaryApi from "./common";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);

  const fetchUserDetails = async (id, data = {}) => {
    if (!data) {
      const dataResponse = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        body: JSON.stringify({ userId: id }),
      });

      const dataApi = await dataResponse.json();
      console.log(id);
      console.log(dataApi);
      console.log("here");
      if (dataApi.success) {
        dispatch(setUserDetails(dataApi.data));
      } else {
        alert("Incorrect credentials");
      }
    } else {
      dispatch(setUserDetails(data));
    }
  };

  const fetchUserAddToCart = async () => {
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
      method: SummaryApi.addToCartProductCount.method,
    });

    const dataApi = await dataResponse.json();

    setCartProductCount(dataApi?.data?.count);
  };
  const handleAuthenticate = async () => {
    console.log({
      userId: localStorage.getItem("userID"),
    });
    const dataResponse = await fetch(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method,
      //   credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ userId: localStorage.getItem("userID") }),
    });
    const dataApi = await dataResponse.json();
    console.log(dataApi);

    dispatch(setUserDetails(dataApi.data));
  };
  useEffect(() => {
    // fetchUserDetails(localStorage.getItem("UserID"));
    /**user Details cart product */
    handleAuthenticate();
    fetchUserAddToCart();
  }, []);
  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails, // user detail fetch
          cartProductCount, // current user add to cart product count,
          fetchUserAddToCart,
        }}
      >
        <ToastContainer position="top-center" />

        <Header />
        <main className="min-h-[calc(100vh-120px)] pt-16">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
