import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./routes/login/login.tsx";
import Signup from "./routes/signup/Signup.tsx";
import Erorr from "./routes/UI/erorr/Erorr.tsx";
import Error404 from "./routes/UI/erorr/404Error.tsx";
import Dashbord from "./routes/UI/dashboard/Dashbord.tsx";

import { Provider } from "react-redux";
import { store, persistor } from "./store/ConfigureStore.tsx";
import { PersistGate } from "redux-persist/integration/react";
import AuthProvider from "./Context/AuthProvider.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <Error404 />,
  },
  {
    path: "/Signup",
    element: <Signup />,
  },
  {
    path: "/Dashboard",

    element: <Dashbord />,
  },
  {
    path: "/Error/:id",
    element: <Erorr></Erorr>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <AuthProvider> */}
        <RouterProvider router={router} />
        {/* </AuthProvider> */}
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
