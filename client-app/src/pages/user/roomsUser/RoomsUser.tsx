import React, { useContext, useEffect, useState } from "react";
import { useLoaderData, useOutletContext } from "react-router-dom";
import { IRoom, IUser } from "../../../shared/models";
import styled from "@emotion/styled";
import {
  Toolbar,
  Divider,
  Typography,
  List,
  ListItem,
  ListItemButton,
  Stack,
  Badge,
  Avatar,
  Card,
  CardHeader,
  IconButton,
  CardActions,
} from "@mui/material";
import { IActiveUser } from "../../../shared/layouts/AdminLayout";
import { CurrentUserContext, IUserContext, UserContext } from "../../../shared/context/context";
import { Dispatch } from "react";
import { red } from "@mui/material/colors";
import MenuIcon from "@mui/icons-material/Menu";
import RoomService from "../../../shared/services/rooms.service";
const roomService = new RoomService();

function RoomsUser() {
    const [roomsData, setRooms] = useState([] as IRoom[]);
  const currentUser = useContext(CurrentUserContext) as IUser;

  useEffect(() => {
    const getRoomsByUserId = async () => {
      try {
        const rooms = await roomService.getRoomsByUserId(currentUser._id);
        setRooms(rooms);
      } catch (err) {
        console.log(err);
      }
    };
    getRoomsByUserId();
  }, []);
  const userContext = React.useContext(UserContext) as IUserContext;
  const { state, dispatch } = userContext;

  React.useEffect(() => {
    dispatch({ type: "group", group: roomsData[0] });
  }, []);
  const activeUserContext = useOutletContext() as IActiveUser[];
  const Image = styled("img")(({ theme }) => ({
    height: "20px",
    width: "20px",
    borderRadius: 10,
  }));
  return (
    <>
      <Toolbar>Users</Toolbar>
      <Divider />
      <Typography variant="subtitle2" pt={1} px={3} color="primary">
        Favorites
      </Typography>
      <List>
          {roomsData.length && roomsData.map((el) =>
            el.members.map((user) => (
              <ListItem disablePadding sx={{ display: "block" }} key={user._id}>
              <ListItemButton
                sx={{
                  borderBottom: 1,
                  borderColor: "grey.300",
                  minHeight: 48,
                  pl:"24px"
                }}
              >
                <Stack direction="row" width="100%">
                  <Badge
                    sx={{ 
                      "& .MuiBadge-dot": {
                        top: "auto",
                        bottom: "-1px",
                        right: "1px",
                      },
                    }}
                    color={
                      activeUserContext.find(
                        (activeUser) => activeUser.userId === user._id
                      ) ?? ""
                        ? "success" 
                        : "error"
                    }
                    variant={"dot"}
                  >
                    <Image
                      src="https://doot-light.react.themesbrand.com/static/media/avatar-4.474927d6a33a7b8cde52.jpg"
                      alt="loading"
                    />
                  </Badge>
                  <Typography variant="subtitle2" ml={2} textTransform="capitalize">
                    {user.firstName + " " + user.lastName}
                  </Typography>
                </Stack>
              </ListItemButton>
              </ListItem>
            ))
          )}
      </List>
    </>
  );
}

export default RoomsUser;
