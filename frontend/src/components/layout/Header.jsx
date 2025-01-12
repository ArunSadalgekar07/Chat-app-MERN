import {
  AppBar,
  Backdrop,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  Button,
} from "@mui/material";
import React, { Suspense, lazy, useState } from "react";
import { orange } from "../../constants/color";
import {
  Add as AddIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
  SportsEsports as GamesIcon,
  SmartToy as AiIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../constants/config";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userNotExists } from "../../redux/reducers/auth";
import {
  setIsMobile,
  setIsNewGroup,
  setIsNotification,
  setIsSearch,
} from "../../redux/reducers/misc";
import { resetNotificationCount } from "../../redux/reducers/chat";

const SearchDialog = lazy(() => import("../specific/Search"));
const NotifcationDialog = lazy(() => import("../specific/Notifications"));
const NewGroupDialog = lazy(() => import("../specific/NewGroup"));

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isSearch, isNotification, isNewGroup } = useSelector(
    (state) => state.misc
  );
  const { notificationCount } = useSelector((state) => state.chat);

  const handleMobile = () => dispatch(setIsMobile(true));

  const openSearch = () => dispatch(setIsSearch(true));

  const openNewGroup = () => {
    dispatch(setIsNewGroup(true));
  };

  const openNotification = () => {
    dispatch(setIsNotification(true));
    dispatch(resetNotificationCount());
  };

  const navigateToGroup = () => navigate("/groups");

  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/user/logout`, {
        withCredentials: true,
      });
      dispatch(userNotExists());
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: .5}} height={"4.5rem"}>
        <AppBar
          position="static"
          sx={{
            bgcolor: "#1F509A",
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Toolbar sx={{ height: '4.5rem' }}>
            <Typography
              variant="h5"
              sx={{
                display: { xs: "none", sm: "block" },
                fontWeight: 600,
                letterSpacing: 1,
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                fontFamily: 'Arial, sans-serif'
              }}
            >
              संवाद
            </Typography>
             
            <Box
              sx={{
                display: { xs: "block", sm: "none" },
              }}
            >
              <IconButton 
                color="inherit" 
                onClick={handleMobile}
                sx={{ 
                  '&:hover': { 
                    bgcolor: 'rgba(255, 255, 255, 0.1)' 
                  } 
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
            
            <Box sx={{ flexGrow: 1 }} />
            
            <Box sx={{ 
              display: 'flex',
              gap: 1,
              '& .MuiIconButton-root': {
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  transform: 'scale(1.1)'
                }
              }
            }}>
              <IconButton
                href="http://127.0.0.1:5500/ai_chat/index.html"
                title="AI"
                sx={{
                  borderRadius: '50%',
                  backgroundColor: 'inherit',
                  color: 'white',
                  padding: '8px',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  },
                }}
              >
                <AiIcon />
              </IconButton>
              <IconButton
                href="http://127.0.0.1:5500/display/display.html"
                title="GAMES"
                sx={{
                  borderRadius: '50%',
                  backgroundColor: 'inherit',
                  color: 'white',
                  padding: '8px',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  },
                }}
              >
                <GamesIcon />
              </IconButton>
              <IconBtn
                title={"Search"}
                icon={<SearchIcon />}
                onClick={openSearch}
              />
              <IconBtn
                title={"New Group"}
                icon={<AddIcon />}
                onClick={openNewGroup}
              />
              <IconBtn
                title={"Manage Groups"}
                icon={<GroupIcon />}
                onClick={navigateToGroup}
              />
              <IconBtn
                title={"Notifications"}
                icon={<NotificationsIcon />}
                onClick={openNotification}
                value={notificationCount}
              />
              <IconBtn
                title={"Logout"}
                icon={<LogoutIcon />}
                onClick={logoutHandler}
              />
              
            </Box>
            
          </Toolbar>
        </AppBar>
      </Box>

      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <SearchDialog />
        </Suspense>
      )}

      {isNotification && (
        <Suspense fallback={<Backdrop open />}>
          <NotifcationDialog />
        </Suspense>
      )}

      {isNewGroup && (
        <Suspense fallback={<Backdrop open />}>
          <NewGroupDialog />
        </Suspense>
      )}
    </>
  );
};

const IconBtn = ({ title, icon, onClick, value }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onClick}>
        {value ? (
          <Badge badgeContent={value} color="error">
            {icon}
          </Badge>
        ) : (
          icon
        )}
      </IconButton>
    </Tooltip>
  );
};

export default Header;
