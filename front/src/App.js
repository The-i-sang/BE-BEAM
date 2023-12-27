import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NotFoundPage from "./page/NotFoundPage";
import Main from "./page/Main";
import Detail from "./page/Detail";
import Root from "./page/Root";
import Toolkit from "./page/Toolkit";
import Search from "./page/Search";
import ActivityDetail from "./component/ActivityDetail";
import ApplyForm from "./page/ApplyForm";
import Auth from "./page/Auth";
import Mypage from "./page/Mypage";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userState } from "./recoil/userState";
import UserInfoModify from "./page/UserInfoModify";
import UserProfileModify from "./page/UserProfileModify";
import Meeting from "./page/Meeting";

function App() {
  const [userIn, setUserIn] = useRecoilState(userState);

  useEffect(() => {
    const user = "서버에서 받아오는 유저 데이터";

    // if (user) {
    //   // 유저 값이 있을시
    //   setUserIn(true);
    // } else {
    //   setUserIn(false);
    // }

    setUserIn(false);
  }, [setUserIn]);

  console.log(userIn);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <NotFoundPage />,
      children: [
        { index: true, element: <Main /> },
        {
          path: "/meeting",
          element: <Meeting />,
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
          path: "/applyForm",
          element: <ApplyForm />,
        },
        {
          path: "/auth",
          element: <Auth />,
        },
        {
          path: "/mypage",
          element: <Mypage />,
        },
        {
          path: "/mypage/userInfoModify",
          element: <UserInfoModify />,
        },
        {
          path: "/mypage/userProfileModify",
          element: <UserProfileModify />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
