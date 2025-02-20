import styled from "@emotion/styled";
import {
  Toolbar,
  TextField,
  InputAdornment,
  Divider,
  Box,
  List,
  ListItem,
  ListItemButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../../shared/context/context";
import { IUser } from "../../../shared/models";
import ContactService from "../../../shared/services/contacts.service";
import { Search } from "@mui/icons-material";

const Image = styled("img")(({ theme }) => ({
  height: "20px",
  width: "20px",
  borderRadius: 10,
}));

const myContactsService = new ContactService();

function Chats() {
  const [value, setValue] = useState<string>("");
  const [contacts, setContacts] = useState<
      { isFavoriteUser: boolean; user: { fullName: string; _id: string } }[]
    >([] as any);
  const currentUser = useContext(CurrentUserContext) as IUser;

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const getContacts = async () => {
      try {
        let contacts = await myContactsService.getContacts(currentUser._id);
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
              .map((el) => (
                <ListItemButton
                  key={el.user._id}
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
                    <Typography variant="subtitle2" ml={2} textTransform="capitalize">
                      {el.user.fullName}
                    </Typography>
                  </Stack>
                </ListItemButton>
              ))}
          </ListItem>
        </List>
        {contacts?.filter(
          (el) =>
            el.user.fullName.toLowerCase().indexOf(value.toLowerCase()) > -1
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

export default Chats;
