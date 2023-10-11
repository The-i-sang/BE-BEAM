import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NotFoundPage from "./page/NotFoundPage";
import Main from "./page/Main";
import Detail from "./page/Detail";
import Root from "./page/Root";
import Toolkit from "./page/Toolkit";
import Search from "./page/Search";
import { useState } from "react";
import Activity from "./component/Activity";
import ActivityDetail from "./component/ActivityDetail";
import Community from "./page/Community";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <NotFoundPage />,
      children: [
        { index: true, element: <Main /> },
        {
          path: "/activity",
          element: <Activity />,
        },
        {
          path: "/activity/detail/:id",
          element: <ActivityDetail />,
        },
        { path: "/search", element: <Search /> },
        {
          path: "/toolkit",
          element: <Toolkit />,
        },
        {
          path: "/toolkit/detail/:id",
          element: <Detail />,
        },
        { path: "*", element: <NotFoundPage /> },
        {
          path: "/community",
          element: <Community setCategoryOn={setCategoryOn} />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
