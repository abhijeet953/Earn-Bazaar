import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

import { Context } from "../../context/Context";

import axiosBaseURL from "../../pages/httpCommon";

import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";
import "./singlePost.css";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = `${process.env.REACT_APP_AXIOS_BASEURL}/images/` || "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  console.log(user);
  console.log(post);
  useEffect(() => {
    const getPost = async () => {
      const res = await axiosBaseURL.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axiosBaseURL.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) { console.log(err)}
  };

  const handleUpdate = async () => {
    try {
      await axiosBaseURL.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false);
    } catch (err) {console.log(err)}
  };
  return (
    <div className="singlePost">
      <Container className="singlePostWrapper">
        {post.photo && (
          <img src={PF + post.photo} alt="" className="singlePostImg" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {(post.username === user?.username) && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                >edit</i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                >delete</i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author: 
            {(user?.username === post.username) ? (
                <Link to='/settings'>My Profile</Link>
            ) : (
              <Link to={`/profile/${post.username}`} className="link">
                <b> {post.username}</b>
              </Link>
            )}
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
        {updateMode && (
          <Button
            className="singlePostButton btn-secondary btm-sm"
            onClick={handleUpdate}
          >
            Update
          </Button>
        )}
      </Container>
    </div>
  );
}
