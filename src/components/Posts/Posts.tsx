import { useEffect, useState } from 'react';
import { getData } from "../../../core/http_methods.ts";
import { base_url, posts_url } from "../../../core/end_points.ts";
import Navbar from '../Navbar/Navbar.tsx';
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
    <Navbar />
      <ol>
        {posts.map((post) => (
          <li key={post.id}><a href={`/posts/${post.id}`}>{post.title}</a></li>
        ))}
      </ol>
    </>
  );
};

export default Posts;
