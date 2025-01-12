import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation } from "../../hooks/hook";
import {
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
} from "../../redux/api/api";
import { setIsSearch } from "../../redux/reducers/misc";
import UserItem from "../shared/UserItem";

const Search = () => {
  const { isSearch } = useSelector((state) => state.misc);

  const [searchUser] = useLazySearchUserQuery();

  const [sendFriendRequest, isLoadingSendFriendRequest] = useAsyncMutation(
    useSendFriendRequestMutation
  );

  const dispatch = useDispatch();

  const search = useInputValidation("");

  const [users, setUsers] = useState([]);

  const addFriendHandler = async (id) => {
    await sendFriendRequest("Sending friend request...", { userId: id });
  };

  const searchCloseHandler = () => dispatch(setIsSearch(false));

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      searchUser(search.value)
        .then(({ data }) => setUsers(data.users))
        .catch((e) => console.log(e));
    }, 1000);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [search.value]);

  return (
    <Dialog open={isSearch} onClose={searchCloseHandler}>
      <Stack p={"2rem"} direction={"column"} width={"25rem"} spacing={2}>
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField
          label="Search"
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "primary.main",
              },
              "&:hover fieldset": {
                borderColor: "primary.dark",
              },
              "&.Mui-focused fieldset": {
                borderColor: "primary.dark",
              },
            },
          }}
        />

        <List
          sx={{
            maxHeight: "15rem",
            overflow: "auto",
            bgcolor: "background.paper",
            borderRadius: "0.5rem",
            boxShadow: 1,
          }}
        >
          {users.length > 0 ? (
            users.map((i) => (
              <UserItem
                user={i}
                key={i._id}
                handler={addFriendHandler}
                handlerIsLoading={isLoadingSendFriendRequest}
              />
            ))
          ) : (
            <Typography
              variant="body2"
              color="textSecondary"
              textAlign="center"
              mt={2}
            >
              No users found
            </Typography>
          )}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
