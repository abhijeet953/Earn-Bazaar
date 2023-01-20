import React from 'react'
import { useState, useContext, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
// import { Context } from '../../context/Context';
import axiosBaseURL from '../httpCommon';
import Posts from '../../components/posts/Posts';
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

const Profile = ({username}) => {

    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [ user, setUser ] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axiosBaseURL.get("/users/profile/" + path);
            const userDetails = res.data;
            setUser(userDetails[0]);
        };
        fetchPosts();      
    }, [path])

  return (
    <>
    <div>Profile</div>
    <div className="settings">
      <MDBCard className="settingsWrapper">
        <div className="pic">
          <Avatar
            color={Avatar.getRandomColor("sitebase")}
            size="95"
            name={user?.username}
            round={true}
          />{" "}
        </div>
        <MDBListGroup >
          <MDBListGroupItem>
            <b>Name: </b>{user?.username}
          </MDBListGroupItem>
          <MDBListGroupItem>
            <b>Email: </b> {user?.email}
          </MDBListGroupItem>
          <MDBListGroupItem>
            <b>Category: </b> {user?.userCategory}
          </MDBListGroupItem>
        </MDBListGroup>
        <MDBCardBody>
          <MDBCardBody>
            <MDBCardTitle> About Section</MDBCardTitle>
            <MDBCardText>All other details.. User's Bio</MDBCardText>
          </MDBCardBody>
        </MDBCardBody>
      </MDBCard>
    </div>
  
    </>
  )
}

export default Profile