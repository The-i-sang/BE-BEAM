import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./page/Home";
import NotFoundPage from "./page/NotFoundPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <NotFoundPage />,
      children: [],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
