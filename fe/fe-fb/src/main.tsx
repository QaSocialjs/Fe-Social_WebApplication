import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store, persistor } from "./store/ConfigureStore.tsx";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App.tsx";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Login />,
//     errorElement: <Error404 />,
//   },
//   {
//     path: "/Signup",
//     element: <Signup />,
//   },
//   {
//     path: "/Dashboard",

//     element: <Dashbord />,
//     children: [
//       {
//         path: "/Dashboard/New",
//         element: <NewRepository></NewRepository>,
//       },
//     ],
//   },
//   {
//     path: "/Error/:id",
//     element: <Erorr></Erorr>,
//   },
// ]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <AuthProvider> */}
        <App />
        {/* </AuthProvider> */}
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
