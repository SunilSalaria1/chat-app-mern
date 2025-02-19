import {
  Avatar,
  Badge,
  Box,
  Divider,
  Drawer,
  IconButton,
  ImageListItem,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  TooltipProps,
  Typography,
  tooltipClasses,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import React, { useContext, useEffect } from "react";
import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import RoomService from "../../services/rooms.service";
import { IRoom, IUser } from "../../models";
import FaceIcon from "@mui/icons-material/Face";
import Face6Icon from "@mui/icons-material/Face6";
import {
  Link,
  Outlet,
  redirect,
  useNavigate,
  useParams,
} from "react-router-dom";
import { IActiveUser } from "../../layouts/AdminLayout";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ChatIcon from "@mui/icons-material/Chat";
import SearchIcon from "@mui/icons-material/Search";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import InfoIcon from "@mui/icons-material/Info";
import AddCommentIcon from "@mui/icons-material/AddComment";
import HomeIcon from "@mui/icons-material/Home";
import { AccountBox, Logout, Person, Settings } from "@mui/icons-material";
import { CurrentUserContext, ThemeModeContext } from "../../context/context";
import ChatProfile from "./elements/ChatProfile";
import ChatContacts from "./elements/ChatContacts";
import AuthService from "../../services/auth.service";
import logo from "../../../assets/chat-logo.png";
interface Props {
  window?: () => Window;
  handleDrawerTransitionEnd: () => void;
  handleDrawerClose: () => void;
  mobileOpen: boolean;
  drawerWidth: number;
  isConnected: boolean;
  activeUsers: IActiveUser[];
  currentUser: IUser;
}

const authService = new AuthService();
const roomsService = new RoomService();
function Sidebar(props: Props) {
  const themModeContext = useContext(ThemeModeContext);
  const theme = useTheme();
  const navigate = useNavigate();
  const params = useParams();
  const [rooms, setRoom] = React.useState<IRoom[]>([]);
  const [activeTab, setActiveTab] = React.useState("home");
  const { window } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const currentUser = useContext(CurrentUserContext) as IUser;
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async (isLogin: boolean = false) => {
    if (isLogin) {
      try {
        const result = await authService.logout();
        console.log(result, "errr");
        // if (data) navigate("/sign-in");
      } catch (e) {
        console.log(e, "errror");
      }
    } else {
      setAnchorEl(null);
    }
  };
  useEffect(() => {
    roomsService.getRooms().then((rooms) => {
      setRoom(rooms);
    });
  }, []);

  const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color:
        theme.palette.mode !== "dark"
          ? theme.palette.common.black
          : theme.palette.common.white,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor:
        theme.palette.mode !== "dark"
          ? theme.palette.common.black
          : theme.palette.common.white,
      color:
        theme.palette.mode === "dark"
          ? theme.palette.common.black
          : theme.palette.common.white,
    },
  }));

  const container =
    window !== undefined ? () => window().document.body : undefined;
  const drawer = (
    <div>
      <Toolbar children={<Typography variant="h4">Chat App</Typography>} />
      <Divider />
      <List>
        {rooms.map((room, index) => (
          <ListItem
            key={room._id}
            disablePadding
            sx={{ display: "flex" }}
            onClick={() => {
              navigate("/rooms/" + room._id);
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={room.name} />
            </ListItemButton>
          </ListItem>
        ))}
        {rooms.map(
          (room) =>
            params.id === room._id &&
            room.members.map((member, index) => (
              <ListItem key={member._id} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Badge
                      color={
                        props.activeUsers.find(
                          (el) => el.userId === member._id
                        ) ?? ""
                          ? "success"
                          : "error"
                      }
                      variant={"dot"}
                    >
                      {index % 2 === 0 ? <FaceIcon /> : <Face6Icon />}
                    </Badge>
                  </ListItemIcon>
                  <ListItemText primary={member.firstName} />
                </ListItemButton>
              </ListItem>
            ))
        )}
      </List>
      <Divider />
    </div>
  );
  return (
    // <Box
    //   component="nav"
    //   sx={{ width: { sm: props.drawerWidth }, flexShrink: { sm: 0 } }}
    //   aria-label="mailbox folders"
    // >
    //   {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
    //   <Drawer
    //     container={container}
    //     variant="temporary"
    //     open={props.mobileOpen}
    //     onTransitionEnd={props.handleDrawerTransitionEnd}
    //     onClose={props.handleDrawerClose}
    //     ModalProps={{
    //       keepMounted: true, // Better open performance on mobile.
    //     }}
    //     sx={{
    //       display: { xs: "block", sm: "none" },
    //       "& .MuiDrawer-paper": {
    //         boxSizing: "border-box",
    //         width: props.drawerWidth,
    //       },
    //     }}
    //   >
    //     {drawer}
    //   </Drawer>
    //   <Drawer
    //     variant="permanent"
    //     sx={{
    //       display: { xs: "none", sm: "block" },
    //       "& .MuiDrawer-paper": {
    //         boxSizing: "border-box",
    //         width: props.drawerWidth,
    //       },
    //     }}
    //     open
    //   >
    //     {drawer}
    //   </Drawer>
    // </Box>

    <Box>
      <Box
        sx={{
          backgroundColor: "#2e2e2e",
          zIndex: props.mobileOpen ? 1000 : 0,
          position: "fixed",
          left: "0px",
          top: "0px",
          width: "80px",
          height: "100%",
          py: 2,
        }}
      >
        <Stack
          alignItems="center"
          height={"100%"}
          justifyContent={"space-between"}
          gap={4}
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            gap={4}
          >
            <IconButton style={{padding:0}}>
            <img src={logo} height="50px" style={{filter:"grayscale(1)"}}/>
            </IconButton>
            <IconButton
              sx={{
                color:
                  activeTab === "home"
                    ? theme.palette.primary.light
                    : theme.palette.common.white,
              }}
            >
              <AddCommentIcon color="warning" />
            </IconButton>
            <BootstrapTooltip title="Channels" placement="right-end">
              <IconButton
                component={Link}
                to="rooms"
                onClick={() => setActiveTab("rooms")}
                sx={{
                  color:
                    activeTab === "rooms"
                      ? theme.palette.primary.light
                      : theme.palette.common.white,
                }}
              >
                <HomeIcon />
              </IconButton>
            </BootstrapTooltip>
            <BootstrapTooltip title="Profile" placement="right-end">
              <IconButton
                component={Link}
                to="profile"
                onClick={() => setActiveTab("profile")}
                sx={{
                  color:
                    activeTab === "profile"
                      ? theme.palette.primary.light
                      : theme.palette.common.white,
                }}
              >
                <Person />
              </IconButton>
            </BootstrapTooltip>
            <BootstrapTooltip title="Contacts" placement="right-end">
              <IconButton
                component={Link}
                to="contacts"
                onClick={() => setActiveTab("contacts")}
                sx={{
                  color:
                    activeTab === "contacts"
                      ? theme.palette.primary.light
                      : theme.palette.common.white,
                }}
              >
                <AccountBox />
              </IconButton>
            </BootstrapTooltip>
            <BootstrapTooltip title="Chats" placement="right-end">
              <IconButton
                component={Link}
                to="chats"
                onClick={() => setActiveTab("chats")}
                sx={{
                  color:
                    activeTab === "chats"
                      ? theme.palette.primary.light
                      : theme.palette.common.white,
                }}
              >
                <ChatIcon />
              </IconButton>
            </BootstrapTooltip>
            <BootstrapTooltip
              title={theme.palette.mode === "dark" ? "Dark Mode" : "Light Mode"}
              placement="right-end"
            >
              <IconButton
                sx={{ color: theme.palette.common.white }}
                onClick={themModeContext.toggleColorMode}
              >
                {theme.palette.mode === "dark" ? (
                  <Brightness7Icon color="action" />
                ) : (
                  <Brightness4Icon />
                )}
              </IconButton>
            </BootstrapTooltip>
            <BootstrapTooltip title="Settings" placement="right-end">
              <IconButton
                onClick={() => setActiveTab("settings")}
                sx={{
                  color:
                    activeTab === "settings"
                      ? theme.palette.primary.light
                      : theme.palette.common.white,
                }}
              >
                <Settings />
              </IconButton>
            </BootstrapTooltip>
          </Box>
          <Box>
            <IconButton
              onClick={handleClick}
              size="small"
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar sx={{ width: 28, height: 28 }}>
                {currentUser?.firstName?.at(0) ?? ""}
              </Avatar>
            </IconButton>
          </Box>
        </Stack>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={() => handleClose(false)}
          onClick={() => handleClose(false)}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem onClick={() => handleClose(false)}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={() => handleClose(true)}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Box>
      <Drawer
        variant="permanent"
        open={props.mobileOpen}
        sx={{
          width: { sm: !props.mobileOpen ? "166px" : "339px" },
          "& .MuiDrawer-paperAnchorDockedLeft": {
            left: "80px",
            width: "350px",
          },
        }}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        {
          <>
            {/* <Toolbar>Chats</Toolbar>
						<Divider />
						<Typography variant="subtitle2" pt={1} px={3}>
							Favorites
						</Typography>
						<List>
							<ListItem disablePadding sx={{ display: 'block' }}>
								<ListItemButton
									sx={{
										minHeight: 48,
										px: 2.5
									}}
								>
									<Stack direction={'row'}>
										<Image
											src="https://doot-light.react.themesbrand.com/static/media/avatar-4.474927d6a33a7b8cde52.jpg"
											alt="loading"
										/>
										<Typography variant="subtitle2" ml={2}>
											Mahesh
										</Typography>
									</Stack>
								</ListItemButton>
								<ListItemButton
									sx={{
										minHeight: 48,
										px: 2.5
									}}
								>
									<Stack direction={'row'}>
										<Image
											src="https://doot-light.react.themesbrand.com/static/media/avatar-4.474927d6a33a7b8cde52.jpg"
											alt="loading"
										/>
										<Typography variant="subtitle2" ml={2}>
											Vinkesh
										</Typography>
									</Stack>
								</ListItemButton>
								<ListItemButton
									sx={{
										minHeight: 48,
										px: 2.5
									}}
								>
									<Stack direction={'row'}>
										<Image
											src="https://doot-light.react.themesbrand.com/static/media/avatar-4.474927d6a33a7b8cde52.jpg"
											alt="loading"
										/>
										<Typography variant="subtitle2" ml={2}>
											Rajesh
										</Typography>
									</Stack>
								</ListItemButton>
							</ListItem>
						</List>
						<Typography variant="subtitle2" pt={1} px={3}>
							Directs
						</Typography>
						<List>
							<ListItem disablePadding sx={{ display: 'block' }}>
								<ListItemButton
									sx={{
										minHeight: 48,
										px: 2.5
									}}
								>
									<Stack direction={'row'}>
										<Image
											src="https://doot-light.react.themesbrand.com/static/media/avatar-4.474927d6a33a7b8cde52.jpg"
											alt="loading"
										/>
										<Typography variant="subtitle2" ml={2}>
											Mahesh
										</Typography>
									</Stack>
								</ListItemButton>
								<ListItemButton
									sx={{
										minHeight: 48,
										px: 2.5
									}}
								>
									<Stack direction={'row'}>
										<Image
											src="https://doot-light.react.themesbrand.com/static/media/avatar-4.474927d6a33a7b8cde52.jpg"
											alt="loading"
										/>
										<Typography variant="subtitle2" ml={2}>
											Vinkesh
										</Typography>
									</Stack>
								</ListItemButton>
								<ListItemButton
									sx={{
										minHeight: 48,
										px: 2.5
									}}
								>
									<Stack direction={'row'}>
										<Image
											src="https://doot-light.react.themesbrand.com/static/media/avatar-4.474927d6a33a7b8cde52.jpg"
											alt="loading"
										/>
										<Typography variant="subtitle2" ml={2}>
											Rajesh
										</Typography>
									</Stack>
								</ListItemButton>
							</ListItem>
						</List>{' '} */}
          </>
        }
        {/* {
					activeTab === 'profile' && <ChatProfile currentUser={props.currentUser}/>
				} */}
        {activeTab !== "settings" && <Outlet context={props.activeUsers} />}
        {/* {activeTab === 'contacts' && <ChatContacts />} */}
      </Drawer>
    </Box>
  );
}

export default Sidebar;
