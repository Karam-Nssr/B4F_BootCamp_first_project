
import { useEffect, useState } from "react";

import { useUser } from "../../userContext";
import { base_url, posts_url } from "../../../core/end_points";
import { getData } from "../../../core/http_methods";

import Navbar from "../Navbar/Navbar";
import PostCard from "../PostCard/PostCard";
import "./MyPosts.css";

type Post = {
  id: number | string;
  userId: number | string;
  title: string;
  body: string;
};

const MyPosts = () => {
  const { currentId } = useUser();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (currentId === null || currentId === undefined) {
      setPosts([]);
      setLoading(false);
      return;
    }

    const fetchUserPosts = async () => {
      setLoading(true);
      setErrorMessage("");

      try {
        const response = await getData(
          `${base_url}${posts_url}?userId=${currentId}`
        );

        const data = Array.isArray(response)
          ? response
          : Array.isArray(response?.data)
            ? response.data
            : [];

        setPosts(data);
      } catch (error) {
        console.error("Error fetching user posts:", error);
        setErrorMessage("Could not load your posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [currentId]);

  const handlePostDeleted = (postId: number | string) => {
    setPosts((previousPosts) =>
      previousPosts.filter(
        (post) => String(post.id) !== String(postId)
      )
    );
  };

  if (currentId === null || currentId === undefined) {
    return (
      <h1>No user selected. Please go back and choose a user.</h1>
    );
  }

  return (
    <>
      <Navbar />

      <div className="my-posts-page">
        <h1>User {currentId}'s Posts</h1>

        {loading ? (
          <p>Loading posts...</p>
        ) : errorMessage ? (
          <p role="alert">{errorMessage}</p>
        ) : posts.length === 0 ? (
          <p>This user hasn't posted anything yet.</p>
        ) : (
          <div className="posts-container">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                postId={post.id}
                title={post.title}
                body={post.body}
                showActions={true}
                canManageComments={true}
                onPostDeleted={handlePostDeleted}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyPosts;