import { Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";

import { Header } from "..";
import { Home, FullPost, Registration, AddPost, Login, PostsWithTag } from "../../pages";
import { useDispatch,  } from "react-redux";
import { useEffect } from "react";
import { fetchAuthMe } from "../../store/actions/auth";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/posts/:id/edit" element={<AddPost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/tags/:tag" element={<PostsWithTag />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
