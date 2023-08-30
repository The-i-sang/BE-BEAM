import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NotFoundPage from "./page/NotFoundPage";
import Main from "./page/Main";
import Detail from "./page/Detail";
import Root from "./page/Root";
import Toolkit from "./page/Toolkit";
import Search from "./page/Search";
import { useState } from "react";
import Activity from "./component/Activity";

function App() {
  const [categoryOn, setCategoryOn] = useState(false);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root categoryOn={categoryOn} setCategoryOn={setCategoryOn} />,
      errorElement: <NotFoundPage />,
      children: [
        { index: true, element: <Main setCategoryOn={setCategoryOn} /> },
        {
          path: "/activity",
          element: <Activity setCategoryOn={setCategoryOn} />,
        },
        { path: "/search", element: <Search setCategoryOn={setCategoryOn} /> },
        {
          path: "/toolkit",
          element: <Toolkit setCategoryOn={setCategoryOn} />,
        },
        { path: "/detail/:id", element: <Detail /> },
        { path: "*", element: <NotFoundPage /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
