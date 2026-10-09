import { useEffect, useState } from "react";
import { getData } from "../../../core/http_methods.ts";
import { base_url, posts_url } from "../../../core/end_points.ts";
import Navbar from "../Navbar/Navbar.tsx";
import PostCard from "../PostCard/PostCard.tsx";
import "./Posts.css";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getData(base_url + posts_url);
        setPosts(response.data || response);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
    console.log(posts);
  }, []);

  return (
    <>
      {" "}
      <Navbar />{" "}
      <div className="posts-page">
        {" "}
        <h1>Posts</h1>{" "}
        <div className="posts-container">
          {" "}
          {posts.map((post: any) => (
            <PostCard
              key={post.id}
              postId={post.id}
              title={post.title}
              body={post.body}
              canManageComments={false}
            />
          ))}{" "}
        </div>{" "}
      </div>{" "}
    </>
  );
};

export default Posts;
