import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import PostAddIcon from "@mui/icons-material/PostAdd";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import styles from "./Header.module.scss";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { isAuth } from "../../store/slices/authSlice";
import { logout } from "../../store/slices/authSlice";

export const Header = () => {
  const isUserAuth = useSelector(isAuth);
  const dispatch = useDispatch();

  const onClickLogout = () => {
    if (window.confirm("Вы действительно хотите выйти?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    }
  };

  return (<div className={styles.root}>
    <Container maxWidth="lg">
      <div className={styles.inner}>
        <Link className={styles.logo} to="/">
          <h1>SHISHKOVA BLOG</h1>
        </Link>
        <div className={styles.buttons}>
          {isUserAuth ? (<>
            <Link to="/add-post">
              <Button variant="contained">
                <PostAddIcon />
              </Button>
            </Link>
            <Button onClick={onClickLogout} color="error" variant="contained" aria-label="Выйти">
              <LoginIcon />
            </Button>
          </>) : (<>
            <Link to="/login">
              <Button color="primary" component="button" variant="contained" aria-label="Войти">
                <LoginIcon />
              </Button>
            </Link>
            <Link to="/register">
              <Button color="success" variant="contained" aria-label="Создать аккаунт">
                <PersonAddIcon />
              </Button>
            </Link>
          </>)}
        </div>
      </div>
    </Container>
  </div>);
};
