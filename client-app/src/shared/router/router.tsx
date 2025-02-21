import {
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import Login from "../../pages/auth/login/Login";
import DefaultLayout from "../layouts/DefaultLayout";
import AdminLayout from "../layouts/AdminLayout";
import AuthService from "../services/auth.service";
import RoomService from "../services/rooms.service";
import Profile from "../../pages/user/profile/Profile";
import Chats from "../../pages/user/chats/Chats";
import Contacts from "../../pages/user/contacts/Contacts";
import { Suspense } from "react";
import Register from "../../pages/auth/register/Register";
import { Navigate,} from "react-router-dom";
import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";

const authService = new AuthService();
const roomService = new RoomService();

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token"); // Check if token exists in localStorage

  if (token) {
    // If the user is logged in, redirect them to the home page (or another route)
    return <Navigate to="/sign-in" />;
  }

  return children;
};

const router = createBrowserRouter([
  {
    path: "",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <AdminLayout />
      </Suspense>
    ),
    errorElement: <ErrorBoundary />,
    loader: async () =>{ 
      if(!localStorage.getItem("token")){
        return  redirect("/sign-in");
      }
      const user = await authService.getCurrentUser();
      if (user.error) {
        // Redirect to rooms or dashboard if authenticated
        return redirect("/sign-in");
      }
      // Show login page if not authenticated
      return user;
     },
    children: [
      {
        path: "",
        element: <Contacts />,
      },
      {
        path: "rooms",
        lazy: async () => {
          let Rooms = (await import("../../pages/user/rooms/Rooms")).default;
          return { Component: Rooms };
        },
      },
      {
        path: "rooms/:id",
        lazy: async () => {
          let UserRooms = (await import("../../pages/user/roomsUser/RoomsUser"))
            .default;
          return { Component: UserRooms };
        },
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "contacts",
        element: <Contacts />,
      },
      {
        path: "chats",
        element: <Chats />,
      },
    ],
  },
  {
    path: "",
    element: (
      <PrivateRoute>
        <DefaultLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "sign-in",
        element: <Login />,
      },
      {
        path: "sign-up",
        element: <Register />,
      },
    ],
  },
]);

export default router;
