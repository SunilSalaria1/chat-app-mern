import { ErrorResponse, createBrowserRouter, useRouteError } from "react-router-dom";
import Login from "../../pages/auth/login/Login";
import DefaultLayout from "../layouts/DefaultLayout";
import AdminLayout from "../layouts/AdminLayout";
import Rooms from "../../pages/user/rooms/Rooms";
import AuthService from "../services/auth.service";
import RoomService from "../services/rooms.service";
import RoomsUser from "../../pages/user/roomsUser/RoomsUser";
import Profile from "../../pages/user/profile/Profile";
import Chats from "../../pages/user/chats/Chats";
import Contacts from "../../pages/user/contacts/Contacts";
import { Suspense } from "react";

const authService = new AuthService();
const roomService = new RoomService();

function ErrorBoundary() {
  const error = useRouteError() as ErrorResponse;
  console.error(error);
  return <div>{error.data}</div>;
}

const router = createBrowserRouter([
  {
    path: "/",
    element:		<Suspense fallback={<div>Loading...</div>}> <AdminLayout /></Suspense>,
    errorElement:<ErrorBoundary />,
    loader: async () => await authService.getCurrentUser(),
    children: [
      {
        path: "rooms",
        loader:async () => await roomService.getRooms(),
        lazy: async() => {
        let Rooms =   (await import("../../pages/user/rooms/Rooms")).default;
        return  {Component:Rooms}
        },
      },
      {
        path:"rooms/:id",
        loader:async () => await roomService.getRooms(),
        lazy: async() => {
          let UserRooms =   (await import("../../pages/user/roomsUser/RoomsUser")).default;
          return  {Component:UserRooms}
          },
      },{
        path:"profile",
        element:<Profile/>
      },
      {
        path:"contacts",
        element:<Contacts/>
      },{
        path:"chats",
        element:<Chats/>
      }
    ],
  },
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
