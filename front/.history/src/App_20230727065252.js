import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NotFoundPage from "./page/NotFoundPage";
import Main from "./page/Main";
import Detail from "./page/Detail";
import Root from "./page/Root";
import Toolkit from "./page/Toolkit";
import Search from "./page/Search";
import { CategoryProvider } from "./context/CategoryContext";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <NotFoundPage />,
      children: [
        { index: true, element: <Main /> },
        { path: "/search", element: <Search /> },
        { path: "/toolkit", element: <Toolkit /> },
        { path: "/detail/:id", element: <Detail /> },
        { path: "*", element: <NotFoundPage /> },
      ],
    },
  ]);
  return (
    <RouterProvider router={router}>
      <CategoryProvider />
    </RouterProvider>
  );
}

export default App;
