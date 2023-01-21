import { useEffect, useState, useContext } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import "./home.css";
import { useLocation } from "react-router";
import axiosBaseURL from "../httpCommon";
import { Context } from "../../context/Context";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  const { user } = useContext(Context);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axiosBaseURL.get("/posts" + search);
      const allPosts = res.data;
      const validPost = [];
      if( user ){
        allPosts.forEach(addRelevant);
        function addRelevant(item) {
          if( item.userCategory !== user.userCategory ){
            validPost.push(item);
          }
          if( search ){
            validPost.push(item);
          }
        }
        setPosts(validPost.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        }));
      } else{
        setPosts(allPosts.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        }));
      }
      // console.log(posts);
    };
    fetchPosts();
  }, [user, search]);

  return (
    <>
      <Header />
      {/* if( search.params.id ) */}
      <div className="home">
        <Posts posts={posts} />
      </div>
    </>
  );
}
