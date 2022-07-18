import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SideBlock } from "../SideBlock";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchRemoveComment } from "../../store/actions/posts";

export const CommentsBlock = ({ items, children, isLoading = true }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.data._id);

  const deleteComment = commentId => {
    dispatch(fetchRemoveComment(commentId));
  }

  return (
    <SideBlock title="Комментарии">
      <List>
        {(isLoading ? [...Array(5)] : items).map((obj, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                {isLoading ? (
                  <Skeleton variant="circular" width={40} height={40} />
                ) : (
                  <Avatar alt={obj.user.fullName} src={obj.user.avatarUrl} />
                )}
              </ListItemAvatar>
              {isLoading ? (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Skeleton variant="text" height={25} width={120} />
                  <Skeleton variant="text" height={18} width={230} />
                </div>
              ) : (
                <>
                  <Grid item container direction="column">
                    <b>{obj.user.fullName}</b>
                    <span>{obj.text}</span>
                  </Grid>
                  {obj.user._id === userId ? (
                    <IconButton aria-label="delete" onClick={() => deleteComment(obj._id)} >
                      <DeleteIcon />
                    </IconButton>
                  ) : null}
                </>
              )}
            </ListItem>

            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
      {children}
    </SideBlock>
  );
};
