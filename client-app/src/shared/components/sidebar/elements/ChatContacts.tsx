import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  Stack,
  TextField,
  Toolbar,
  Typography,
  styled,
  InputAdornment,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Search } from "@mui/icons-material";
import ContactService from "../../../services/contacts.service";
import { IUser } from "../../../models";
import { CurrentUserContext } from "../../../context/context";

const Image = styled("img")(({ theme }) => ({
  height: "20px",
  width: "20px",
  borderRadius: 10,
}));

const myContactsService = new ContactService();

function ChatContacts() {
  const [value, setValue] = useState<string>("");
  const [contacts, setContacts] = useState<
    { isFavoriteUser: boolean; user: IUser; _id: string }[]
  >([]);
  const currentUser = useContext(CurrentUserContext) as IUser;
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const getContacts = async () => {
      try {
        let contacts = await myContactsService.getContacts(
          currentUser._id
        );
        setContacts(contacts.contacts);
      } catch (e) {
        console.log(e);
      }
    };

    getContacts();

    // return () => controller.abort();
  }, []);
  return (
    <>
      {" "}
      <Toolbar
        sx={{
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 1,
          py: 3,
        }}
      >
        Contacts
        <TextField
          value={value}
          onChange={(e) => setValue(e.target.value)}
          fullWidth
          placeholder="Search..."
          sx={{
            display: "block",
            "& .MuiInputBase-input": {
              py: 1,
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        ></TextField>
      </Toolbar>
      <Divider />
      <Box>
        <List>
          <ListItem disablePadding sx={{ display: "block" }}>
            {contacts
              ?.filter(
                (el) =>
                  el.user.firstName.toLowerCase().indexOf(value.toLowerCase()) >
                    -1 ||
                  el.user.lastName.toLowerCase().indexOf(value.toLowerCase()) >
                    -1
              )
              .map((el) => (
                <ListItemButton
                  key={el._id}
                  sx={{
                    minHeight: 48,
                    px: 2.5,
                  }}
                >
                  <Stack direction={"row"}>
                    <Image
                      src="https://doot-light.react.themesbrand.com/static/media/avatar-4.474927d6a33a7b8cde52.jpg"
                      alt="loading"
                    />
                    <Typography variant="subtitle2" ml={2}>
                      {el.user.firstName + " " + el.user.lastName}
                    </Typography>
                  </Stack>
                </ListItemButton>
              ))}
          </ListItem>
        </List>
        {contacts?.filter(
          (el) =>
            el.user.firstName.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
            el.user.lastName.toLowerCase().indexOf(value.toLowerCase()) > -1
        ).length === 0 && (
          <Typography
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          >
            No result found
          </Typography>
        )}
      </Box>
    </>
  );
}

export default ChatContacts;
