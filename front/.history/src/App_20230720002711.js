import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./page/Home";
import NotFoundPage from "./page/NotFoundPage";
import Main from "./page/Main";
import Detail from "./page/Detail";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <NotFoundPage />,
      children: [
        { index: true, element: <Main /> },
        { path: "/detail/:id", element: <Detail /> },
        { path: "*", element: <NotFoundPage /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
