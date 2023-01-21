import React from "react";
import { useState, useContext, useEffect } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { Context } from '../../context/Context';
import axiosBaseURL from "../httpCommon";
import Posts from "../../components/posts/Posts";
import Avatar from "react-avatar";

import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";

const Profile = ({ username }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [otherUser, setOtherUser] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(Context);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axiosBaseURL.get("/users/profile/" + path);
      const userDetails = res.data;
      setOtherUser(userDetails[0]);
    };
    fetchPosts();
  }, [path]);

  const handleMessage = () => {
    const friendship ={
      senderId: otherUser._id,
      receiverId: user._id
    }
    const setConversations = async () => {
      try {
        await axiosBaseURL.post("/conversations", friendship);
        navigate("/messenger");
      } catch (err) {
        console.log(err);
      }
    } 
    setConversations();
  }

  return (
    <>
      <div className="settings">
        <MDBCard className="settingsWrapper">
          <MDBCardBody>
            <MDBCardTitle> Profile </MDBCardTitle>
          </MDBCardBody>
          <Avatar
            color={Avatar.getRandomColor("sitebase")}
            size="95"
            name={otherUser?.username}
            round={true}
          />{" "}
          <MDBCardBody>
            <MDBCardTitle> {otherUser?.username} </MDBCardTitle>
            <button className="btn btn-info" onClick={handleMessage} >
              Message
            </button>
          </MDBCardBody>
          <MDBListGroup>
            <MDBListGroupItem>
              <b>Name: </b>
              {otherUser?.username}
            </MDBListGroupItem>
            <MDBListGroupItem>
              <b>Email: </b> {otherUser?.email}
            </MDBListGroupItem>
            <MDBListGroupItem>
              <b>Category: </b> {otherUser?.userCategory}
            </MDBListGroupItem>
          </MDBListGroup>
          <MDBCardBody>
            <MDBCardBody>
              <MDBCardTitle> About Section</MDBCardTitle>
              <MDBCardText>All other details.. User's Bio</MDBCardText>
            </MDBCardBody>
            <MDBCardTitle> Author's Posts: </MDBCardTitle>
            <Link to={`/?user=${otherUser.username}`} className="link">
              <b> View all Posts</b>
            </Link>
          </MDBCardBody>
        </MDBCard>
      </div>
    </>
  );
};

export default Profile;
