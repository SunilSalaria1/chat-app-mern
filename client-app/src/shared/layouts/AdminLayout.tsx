import {
  Box,
  CssBaseline,
  Toolbar,
  Typography,
  TextField,
  Button,
  useTheme,
  Divider,
  Stack,
  IconButton,
  Grid,
  Card,
  CardContent,
  CardActions,
  Menu,
  MenuItem,
  Alert,
  Paper,
  Collapse,
  Avatar,
  styled,
} from "@mui/material";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import { socket } from "../../App";
import MessageService from "../services/message.service";
import { Link, useLoaderData, useLocation, useParams } from "react-router-dom";
import { IUser } from "../models";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import SendIcon from "@mui/icons-material/Send";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ReactTimeAgo from "react-time-ago";
import Picker, { EmojiClickData } from "emoji-picker-react";
import { CurrentUserContext, UserContext } from "../context/context";
import { currentSelectedUserReducer } from "../reducers/reducer";
import {
  Badge,
  Close,
  ContactMail,
  ContentCopy,
  Delete,
  Edit,
  Home,
  Message,
  More,
  MoreVert,
  Reply,
  Settings,
} from "@mui/icons-material";
import SectionCard from "../components/sectionCard/Card";
import useMutationObservable from "../hooks/mutationObserverHook";
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

interface IMessage {
  _id: string;
  message: string;
  parentMessage: IMessage;
  room: string | null;
  contactName: IUser | null;
  sender: IUser;
  createdAt: Date;
  isContactEntity: boolean;
}

export interface IActiveUser {
  userId: string;
  id: string;
}

const drawerWidth = 240;
const messageService = new MessageService();

function AdminLayout() {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(true);
  const loaderData = useLoaderData() as IUser;
  const [isClosing, setIsClosing] = React.useState(false);
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState<IMessage[]>([]);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [activeUsers, setActiveUser] = useState<IActiveUser[]>([]);
  const [isPicker, setPicker] = useState<boolean>(false);
  const [state, dispatch] = useReducer(currentSelectedUserReducer, null);
  const contentRef = useRef<HTMLElement>();
  const ref = useRef<HTMLElement>();
  const params = useParams();
  const [footerHeight, setFooterHeight] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [replyText, setReplyText] = React.useState<{message:string,_id:string}>({message:"",_id:""});

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  socket.emit('joinRoom', params.id);

  async function sendMessage(reply: string) {

    console.log(replyText._id)
    socket.emit("send_message", {
      message: message,
      parentMessage: replyText._id,
      room: (params.id as string),
      sender: loaderData,
    });
    // let m = {
    //   _id: Date.now().toString(),
    //   message: message,
    //   parentMessage: reply,
    //   room: contextValue.state ? null : (params.id as string),
    //   contactName: contextValue.state,
    //   isContactEntity: !!contextValue.state,
    //   sender: loaderData,
    //   createdAt: new Date(),
    // };

    // setMessageReceived(messageReceived.concat(m as any));
    setMessage("");
    setReplyText({message:"",_id:""});
    if (contentRef.current) {
      let scrollHeight =
        contentRef.current.scrollHeight - contentRef.current.clientHeight;
      contentRef.current.scroll({
        left: 0,
        top: scrollHeight,
        behavior: "instant",
      } as any);
    }
  }

  socket.on("receive_message", (data: any) => {
    console.log(data);
    let m = {
      _id: Date.now().toString(),
      parentMessage: data.parentMessage,
      message: data.message,
      room: params.id as string,
      sender: data.sender,
      isContactEntity: !!contextValue.state,
      contactName: contextValue.state,
      createdAt: new Date(),
    };
    setMessageReceived(messageReceived.concat(m as any));
    //setMessageReceived((previous:any) => [...previous,{_id:Date.now().toString(),message:message,room:roomId,sender:loaderData._id}])
    if (contentRef.current) {
      let scrollHeight =
        contentRef.current.scrollHeight - contentRef.current.clientHeight;
      contentRef.current.scroll({
        left: 0,
        top: scrollHeight + 144,
        behavior: "instant",
      } as any);
    }
  });

  socket.on("end_typing", (data) => {
    console.log("typing", data);
  });

  function onConnect() {
    const sessionID = socket.id;
    console.log("Connected with sessionID: ", sessionID);
    socket.emit("online");
    setIsConnected(true);
  }

  function onDisconnect() {
    socket.emit("offline");
    setIsConnected(false);
  }

  socket.on("connect", () => {
    console.log(socket.id, "test"); // ojIckSD2jqNzOqIrAGzL
  });

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  useEffect(() => {
    if (contextValue.state) {
      messageService
        .getMessageByRoomId(params.id as string)
        .then((messages) => {
          setMessageReceived(messages);
        });
    } else {
      messageService
        .getMessageByRoomId(params.id as string)
        .then((messages) => {
          setMessageReceived(messages);
        });
    }
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    function onEvent(event: string) {
      console.log(event);
    }

    socket.on("some_event", onEvent);

    socket.emit("online", loaderData._id);

    socket.on("getOnlineUsers", (data) => {
      setActiveUser(data);
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, [loaderData, contextValue.state]);

  const onEmojiClick = (emojiObject: EmojiClickData, event: Event) => {
    setMessage((prev) => prev + emojiObject.emoji);
  };

  useEffect(() => {
    setFooterHeight((ref.current as any)?.clientHeight);
    console.log(ref.current?.clientHeight);
  }, [setFooterHeight]);

  const handleKeyUp = () => {
    console.log("handleKeyUp");
    socket.emit("start_typing");
  };

  const Image = styled("img")(({ theme }) => ({
    height: "30px",
    width: "30px",
    borderRadius: "50%",
    margin: "0px 8px",
  }));

  return (
    <CurrentUserContext.Provider value={loaderData}>
      <UserContext.Provider value={contextValue}>
        <Box
          sx={{
            width: {
              sm: !mobileOpen ? `calc(100% - 164px)` : "calc(100% - 430px)",
            },
            ml: { sm: !mobileOpen ? "164px" : "430px" },
            position: "relative",
          }}
        >
          <CssBaseline />
          <Box
            overflow={"auto"}
            ref={contentRef}
            height={`calc(100vh - ${footerHeight ?? 89}px)`}
            sx={{
              backgroundColor:
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[800],
            }}
          >
            <Header
              isOpen={mobileOpen}
              handleDrawerToggle={handleDrawerToggle}
              drawerWidth={drawerWidth}
            />
            <Sidebar
              currentUser={loaderData}
              activeUsers={activeUsers}
              isConnected={isConnected}
              handleDrawerClose={handleDrawerClose}
              handleDrawerTransitionEnd={handleDrawerTransitionEnd}
              mobileOpen={mobileOpen}
              drawerWidth={drawerWidth}
            />
            <Box
              component="main"
              height="100%"
              sx={{
                flexGrow: 1,
              }}
            >
              <Stack>
                <Toolbar style={{ marginBottom: "16px" }} />
                {!state?._id && !params.id && (
                  <Grid container px={4} py={2} spacing={3}>
                    <Grid
                      item
                      xs={12}
                      lg={2}
                      component={Link}
                      to="settings"
                      sx={{ textDecoration: "none" }}
                    >
                      <SectionCard title="Settings">
                        <Settings sx={{ fontSize: "2rem" }} color="primary" />
                      </SectionCard>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      lg={2}
                      component={Link}
                      to="rooms"
                      sx={{ textDecoration: "none" }}
                    >
                      <SectionCard title="Channels">
                        <Home sx={{ fontSize: "2rem" }} color="primary" />
                      </SectionCard>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      lg={2}
                      component={Link}
                      to="contacts"
                      sx={{ textDecoration: "none" }}
                    >
                      <SectionCard title="Contacts">
                        <ContactMail
                          sx={{ fontSize: "2rem" }}
                          color="primary"
                        />
                      </SectionCard>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      lg={2}
                      component={Link}
                      to="profile"
                      sx={{ textDecoration: "none" }}
                    >
                      <SectionCard title="Profile">
                        <Badge sx={{ fontSize: "2rem" }} color="primary" />
                      </SectionCard>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      lg={2}
                      component={Link}
                      to="chats"
                      sx={{ textDecoration: "none" }}
                    >
                      <SectionCard title="Chats">
                        <Message sx={{ fontSize: "2rem" }} color="primary" />
                      </SectionCard>
                    </Grid>
                  </Grid>
                )}
                {(state?._id || params.id) &&
                  messageReceived?.map((el) => (
                    <Box
                      p={1}
                      key={el._id}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Box
                        padding="0px"
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start",
                        }}
                        flexDirection={
                          el.sender._id == loaderData._id
                            ? "row-reverse"
                            : "row"
                        }
                      >
                        <Image
                          style={{}}
                          src="https://doot-light.react.themesbrand.com/static/media/avatar-4.474927d6a33a7b8cde52.jpg"
                          alt="loading"
                        />
                        <Stack sx={{ flexDirection: "column-reverse" }}>
                          <Typography
                            id={el._id}
                            onClick={(e) => {
                              setAnchorEl(e.currentTarget);
                            }}
                            maxWidth="400px"
                            minWidth={
                              el.parentMessage ? "200px" : "fit-content"
                            }
                            component={"div"}
                            paragraph
                            bgcolor={
                              el.sender._id == loaderData._id
                                ? "#1976d2"
                                : "#1976d21c"
                            }
                            color={
                              el.sender._id == loaderData._id
                                ? "white"
                                : "default"
                            }
                            sx={{
                              wordWrap: "break-word",
                              cursor: "pointer",
                              px: 2,
                              py: 1,
                              borderRadius: "8px",
                              mb: 1,
                              order: el.sender._id === loaderData._id ? 1 : 2,
                            }}
                          >
                            {el.parentMessage ? (
                              <>
                                <Alert
                                  sx={{
                                    mt: 1,
                                    width: "100%",
                                    borderLeft: "4px solid green",
                                  }}
                                  icon={false}
                                >
                                  {el.parentMessage.message}
                                </Alert>
                                <Typography mt={2}>{el.message}</Typography>
                              </>
                            ) : (
                              el.message
                            )}
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            flexDirection={{
                              xs:
                                el.sender._id == loaderData._id
                                  ? "row"
                                  : "row-reverse",
                            }}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-end",
                            }}
                          >
                            <DoneAllIcon
                              sx={{
                                fontSize: "small",
                                mx: 1,
                                color: theme.palette.info.light,
                                verticalAlign: "middle",
                                order:
                                  el.sender._id === loaderData._id ? -1 : 3,
                              }}
                            />
                            <ReactTimeAgo
                              style={{
                                textTransform: "capitalize",
                                fontSize: "12px",
                                color: "gray",
                              }}
                              date={new Date(el.createdAt) ?? new Date()}
                            />
                            {el._id === anchorEl?.id && (
                              <Menu
                                sx={{ mt: "6px" }}
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={() => setAnchorEl(null)}
                                anchorOrigin={{
                                  vertical: "bottom",
                                  horizontal: "right",
                                }}
                                transformOrigin={{
                                  vertical: "top",
                                  horizontal: "right",
                                }}
                                MenuListProps={{
                                  "aria-labelledby": "basic-button",
                                }}
                              >
                                <MenuItem
                                  sx={{ pr: "50px" }}
                                  onClick={() => setAnchorEl(null)}
                                >
                                  <ContentCopy
                                    sx={{
                                      color: (theme) => theme.palette.grey[600],
                                      mr: 1,
                                      fontSize: "16px",
                                    }}
                                  />{" "}
                                  Copy
                                </MenuItem>
                                {el.sender._id == loaderData._id && (
                                  <MenuItem
                                    sx={{ pr: "50px" }}
                                    onClick={() => setAnchorEl(null)}
                                  >
                                    <Edit
                                      sx={{
                                        color: (theme) =>
                                          theme.palette.grey[600],
                                        mr: 1,
                                        fontSize: "16px",
                                      }}
                                    />{" "}
                                    Edit
                                  </MenuItem>
                                )}

                                <MenuItem
                                  sx={{ pr: "50px" }}
                                  onClick={() => {
                                    setAnchorEl(null);
                                    console.warn(el,'new')
                                    setReplyText((prev)=>({...prev,message:el.message,_id:el._id}));
                                  }}
                                >
                                  <Reply
                                    sx={{
                                      color: (theme) => theme.palette.grey[600],
                                      mr: 1,
                                      fontSize: "16px",
                                    }}
                                  />{" "}
                                  Reply
                                </MenuItem>
                                <MenuItem
                                  sx={{ pr: "50px" }}
                                  onClick={() => setAnchorEl(null)}
                                >
                                  <Delete
                                    color="error"
                                    sx={{ mr: 1, fontSize: "16px" }}
                                  />{" "}
                                  Delete
                                </MenuItem>
                              </Menu>
                            )}
                            {/* <Box
                              component={"span"}
                              ml={1}
                              sx={{
                                order:
                                  el.sender._id === loaderData._id ? 0 : -1,
                                ml: el.sender._id === loaderData._id ? 1 : "",
                                mr: el.sender._id !== loaderData._id ? 1 : "",
                              }}
                            >
                              {el.sender._id === loaderData._id
                                ? "You"
                                : el.sender.firstName}
                            </Box> */}
                          </Typography>
                        </Stack>
                      </Box>
                    </Box>
                  ))}
              </Stack>
            </Box>
          </Box>
          <Box
            component={"footer"}
            sx={{
              backgroundColor:
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[800],
              mt: "auto",
              p: 2,
              display: state?._id || params.id ? "" : "none",
              position: "sticky",
              bottom: "0",
            }}
            ref={ref}
          >
            <Stack
              direction={"row"}
              px={1}
              bgcolor={theme.palette.mode === "light" ? "white" : "black"}
              borderRadius="30px"
              alignItems="center"
            >
              <IconButton
                onClick={() => setPicker((prev) => !prev)}
                sx={{
                  mr: 2,
                  backgroundColor:
                    theme.palette.mode === "light"
                      ? theme.palette.grey[100]
                      : theme.palette.grey[800],
                }}
              >
                <InsertEmoticonIcon />{" "}
              </IconButton>
              {isPicker && (
                <Picker
                  onEmojiClick={(i, e) => onEmojiClick(i, e)}
                  style={{
                    position: "absolute",
                    transform: replyText.message
                      ? "translateY(-65%)"
                      : "translateY(-58%)",
                    zIndex: 11111,
                    left: "1%",
                  }}
                />
              )}
              <Stack direction={replyText.message ? "column" : "row"} width={"100%"}>
                {replyText.message && (
                  <Alert
                    sx={{ mt: 1, width: "100%", borderLeft: "3px solid green" }}
                    icon={false}
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                          setReplyText({message:"",_id:""});
                        }}
                      >
                        <Close fontSize="inherit" />
                      </IconButton>
                    }
                  >
                    {" "}
                    {replyText.message}
                  </Alert>
                )}
                <TextField
                  multiline
                  fullWidth
                  value={message}
                  rows={2}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyUp={(e) => handleKeyUp()}
                  variant="standard"
                  sx={{
                    "& .MuiInputBase-multiline": {
                      py: 1,
                    },
                    "& .MuiInputBase-multiline::before": {
                      borderBottom: "none",
                    },
                  }}
                />
              </Stack>
              <Button
                onClick={() => sendMessage(replyText.message)}
                sx={{
                  ml: 2,
                  alignSelf: "center",
                  borderRadius: "50%",
                  height: "40px",
                  minWidth: "40px",
                  width: "40px",
                }}
                variant="contained"
              >
                <SendIcon fontSize="small" />
              </Button>
            </Stack>
          </Box>
          <Paper
            sx={{
              position: "absolute",
              bottom: footerHeight + "px",
              transition: "all 0.5s",
              width: "100%",
            }}
          >
          </Paper>
        </Box>
      </UserContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default AdminLayout;
