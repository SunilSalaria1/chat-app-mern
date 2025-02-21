import {
  Toolbar,
  Divider,
  Typography,
  List,
  ListItem,
  ListItemButton,
  Stack,
  styled,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { IRoom, IUser } from "../../../shared/models";
import RoomService from "../../../shared/services/rooms.service";
import { CurrentUserContext } from "../../../shared/context/context";
const roomService = new RoomService();
function Rooms() {
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

  const Image = styled("img")(({ theme }) => ({
    height: "20px",
    width: "20px",
    borderRadius: 10,
  }));

  return (
    <>
      <Toolbar>Rooms</Toolbar>
      <Divider />
      <Typography variant="subtitle2" pt={1} px={3} color="primary">
        Favorites
      </Typography>
      <List>
        {roomsData.length > 0 &&roomsData.map((el) => (
          <ListItem disablePadding sx={{ display: "block" }} key={el._id}>
            <ListItemButton
              sx={{
                borderBottom: 1,
                borderColor: "grey.300",
                minHeight: 48,
                pl: "24px",
              }}
              component={Link}
              to={el._id}
            >
              <Stack direction={"row"}>
                <Image
                  src="https://doot-light.react.themesbrand.com/static/media/avatar-4.474927d6a33a7b8cde52.jpg"
                  alt="loading"
                />
                <Typography
                  variant="subtitle2"
                  ml={2}
                  textTransform="capitalize"
                >
                  {el.name}
                </Typography>
              </Stack>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default Rooms;
