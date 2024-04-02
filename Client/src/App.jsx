import { RouterProvider } from "react-router-dom";
import router from "./Routes";

// import { useEffect, useState } from "react";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
