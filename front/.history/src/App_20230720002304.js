import { createBrowserRouter } from "react-router-dom";
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
  return <div></div>;
}

export default App;
