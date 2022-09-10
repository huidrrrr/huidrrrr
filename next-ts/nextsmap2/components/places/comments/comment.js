import {
  DislikeFilled,
  DislikeOutlined,
  LikeFilled,
  LikeOutlined,
} from "@ant-design/icons";
import { Avatar, Comment, Tooltip } from "antd";
import moment from "moment";
import React, { createElement, useState } from "react";

const CommentBox = (props) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);
  const { placeData } = props;
  const { comments } = placeData;
  const commentsData = [];
  for (const key in comments) {
    commentsData.push({
      key: key,
      ...comments[key],
    });
  }

  commentsData.forEach((comment) => {
    comment.datetime = new Date(comment.datetime);
  });

  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction("liked");
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction("disliked");
  };

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === "liked" ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(
          action === "disliked" ? DislikeFilled : DislikeOutlined
        )}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,
  ];
  if (!placeData) {
    return <p>Loading...</p>;
  } else {
    return (
      <div>
        {commentsData.map((comment) => (
          <Comment
            key={comment.key}
            actions={actions}
            author={<a>Han Solo</a>}
            avatar={
              <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
            }
            content={<p>{comment.content}</p>}
            datetime={
              <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
                <span>{moment().fromNow()}</span>
              </Tooltip>
            }
          />
        ))}
      </div>
    );
  }
};

export default CommentBox;
