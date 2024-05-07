import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes";
import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
