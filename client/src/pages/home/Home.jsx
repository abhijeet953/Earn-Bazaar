import { useEffect, useState, useContext } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import "./home.css";
// import { useLocation } from "react-router";
import axiosBaseURL from "../httpCommon";
import { Context } from "../../context/Context";

export default function Home() {
  const [posts, setPosts] = useState([]);
  // const { search } = useLocation();
  const { user } = useContext(Context);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axiosBaseURL.get("/posts");
      const allPosts = res.data;
      const validPost = [];
      if( user ){
        allPosts.forEach(addRelevant);
        function addRelevant(item) {
          if( item.userCategory !== user.userCategory ){
            validPost.push(item);
          }
        }
        setPosts(validPost)
      } else{
        setPosts(allPosts);
      }
    };
    fetchPosts();
  }, [user]); 



  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
      </div>
    </>
  );
}
