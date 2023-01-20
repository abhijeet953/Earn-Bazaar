import { useContext, useState } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";
import DatePicker from "react-date-picker";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axiosBaseURL, { writePost } from "../httpCommon";

export default function Write() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [reward, setReward] = useState("");
  const [guest, setGuest] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);
  const [value, onChange] = useState(new Date());

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      userCategory: user.userCategory,
      title,
      desc,
      location,
      category,
      reward,
      guest
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axiosBaseURL.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await writePost(newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };
  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Event Title"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <input
            type="text"
            placeholder="Event Location"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <Container>
            <Row>
              <Col sm={12}>
                <Row>
                  <Col sm={3}>
                    Start Date :
                    <DatePicker
                      onChange={onChange}
                      value={value}
                      className="date"
                    />
                  </Col>
                  <Col sm={3}>
                    End Date :
                    <DatePicker
                      onChange={onChange}
                      value={value}
                      className="date"
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="writeFormGroup">
          <input
            type="text"
            placeholder="Event Category"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <input
            type="text"
            placeholder="Event Rewards"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setReward(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <input
            type="text"
            placeholder="Event Guest of Honour"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setGuest(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story... Why one should sponser you??"
            type="text"
            className="writeInput writeText"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
/*
    event name
    event place
    event start date - end date
    event type/cat
    event prizes
    event registrations
    event cheif guest if any
    event logo/poster/banner
    Why anyone should sponser the event/benefits 
    
*/
