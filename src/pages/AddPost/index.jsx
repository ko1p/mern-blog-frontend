import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";

import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { isAuth } from "../../store/slices/authSlice";
import { useRef } from "react";
import axios from "../../axios/axios";

export const AddPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isUserAuth = useSelector(isAuth);
  const inputFileRef = useRef(null);
  // eslint-disable-next-line
  const [loading, setLoading] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState("");
  const [text, setText] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [tags, setTags] = React.useState("");

  const isEditingMode = Boolean(id);

  const handleChangeFile = async (e) => {
    try {
      const formData = new FormData();
      const file = e.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("/upload", formData);
      setImageUrl(data.url);
    } catch (err) {
      console.warn(err);
      alert("Ошибка при загрузке файла");
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl("");
  };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const onSubmitHandler = async (e) => {
    console.log(e);
    e.preventDefault();
    try {
      setLoading(true);

      const fields = {
        title,
        imageUrl,
        tags,
        text,
      };

      const { data } = isEditingMode
        ? await axios.patch(`/posts/${id}`, fields)
        : await axios.post("/posts", fields);
      const postId = isEditingMode ? id : data._id;
      navigate(`/posts/${postId}`);
    } catch (err) {
      console.warn(err);
      alert("Ошибка при отправке поста");
    }
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`/posts/${id}`)
        .then(({ data }) => {
          setTitle(data.title);
          setImageUrl(data.imageUrl);
          setTags(data.tags.join(", "));
          setText(data.text);
        })
        .catch((err) => {
          console.warn(err);
          alert(`При загрузке статьи произошла ошибка.`);
        });
    }
  }, [id]);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Введите текст...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  if (!window.localStorage.getItem("token") && !isUserAuth) {
    return <Navigate to={"/"} />;
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button
        variant="outlined"
        size="large"
        onClick={() => inputFileRef.current.click()}
      >
        Загрузить превью
      </Button>
      <input
        ref={inputFileRef}
        type="file"
        onChange={handleChangeFile}
        hidden
      />
      {imageUrl && (
        <>
          <Button
            variant="contained"
            color="error"
            onClick={onClickRemoveImage}
          >
            Удалить
          </Button>
          <img
            className={styles.image}
            src={`${process.env.REACT_APP_API_URL}${imageUrl}`}
            alt="Uploaded"
          />
        </>
      )}
      <br />
      <br />
      <form onSubmit={onSubmitHandler}>
        <TextField
          classes={{ root: styles.title }}
          variant="standard"
          placeholder="Заголовок статьи..."
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          classes={{ root: styles.tags }}
          variant="standard"
          placeholder="Тэги"
          fullWidth
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <SimpleMDE
          className={styles.editor}
          value={text}
          onChange={onChange}
          options={options}
        />
        <div className={styles.buttons}>
          <Button size="large" variant="contained" type="submit">
            {isEditingMode ? `Сохранить` : `Опубликовать`}
          </Button>
          <Link to="/" className={styles.reset}>
            <Button size="large" variant="outlined">Отмена</Button>
          </Link>
        </div>
      </form>
    </Paper>
  );
};
