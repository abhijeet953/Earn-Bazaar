import "./settings.css";
import { useContext } from "react";
import { Context } from "../../context/Context";
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

export default function Settings() {
  const { user, dispatch } = useContext(Context);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="settings">
      <MDBCard className="settingsWrapper">
        <div className="pic">
          <Avatar
            color={Avatar.getRandomColor("sitebase")}
            size="95"
            name={user.username}
            round={true}
          />{" "}
        </div>
        <MDBListGroup flush>
          <MDBListGroupItem>
            <b>Name: </b>{user.username}
          </MDBListGroupItem>
          <MDBListGroupItem>
            <b>Email: </b> {user.email}
          </MDBListGroupItem>
          <MDBListGroupItem>
            <b>Category: </b> {user.userCategory}
          </MDBListGroupItem>
        </MDBListGroup>
        <MDBCardBody>
          <MDBCardBody>
            <MDBCardTitle> About Section</MDBCardTitle>
            <MDBCardText>All other details.. User's Bio</MDBCardText>
          </MDBCardBody>
          <Button className="btn-md btn-warning" onClick={handleLogout}>
            Logout
          </Button>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
}
