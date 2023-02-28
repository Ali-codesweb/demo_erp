import { createBrowserRouter } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import { LoginScreen } from "./screens/LoginScreen";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeScreen/>,
    },
    {
      path: "/login",
      element: <LoginScreen/>,
    },
  ]);
  