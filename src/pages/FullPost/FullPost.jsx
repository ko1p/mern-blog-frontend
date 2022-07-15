import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import { Post } from "../../components/Post";
import { AddComment } from "../../components/AddComment";
import { CommentsBlock } from "../../components/CommentsBlock/CommentsBlock";
import axios from "../../axios/axios";
import ReactMarkdown from "react-markdown";

export const FullPost = () => {
  const [data, setData] = useState();
  const [comments, setComments] = useState();
  const [isDataLoading, setIsDataIsLoading] = useState(true);
  const [isCommentsLoading, setIsCommentsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {

    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setIsDataIsLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert("Ошибка при получении статьи");
      });

    axios
      .get(`/comments/${id}`)
      .then((res) => {
        setComments(res.data);
        setIsCommentsLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert("Ошибка при получении комментариев");
      });

  }, [id]);

  if (isDataLoading) {
    return <Post isLoading={isDataLoading} isFullPost />;
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ''}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
        <p>
          <ReactMarkdown children={data.text} />
        </p>
      </Post>
      <CommentsBlock
        items={comments}
        isLoading={isCommentsLoading}
      >
        <AddComment />
      </CommentsBlock>
    </>
  );
};
