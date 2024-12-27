import { Routers } from "@routers";
import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Suspense fallback={"...loading"}>
    <RouterProvider router={Routers} />
  </Suspense>,
);
