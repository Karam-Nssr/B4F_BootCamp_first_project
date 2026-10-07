import React, { useEffect, useState } from 'react'
import { useUser } from '../../userContext';
import { base_url, posts_url } from '../../../core/end_points';
import { getData } from '../../../core/http_methods';
import Navbar from '../Navbar/Navbar';
import PostCard from '../PostCard/PostCard';
import './MyPosts.css';

const MyPosts = () => {
  const { currentId } = useUser();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentId) return;

    const fetchUserPosts = async () => {
      try {
        setLoading(true);
        const response = await getData(`${base_url}${posts_url}?userId=${currentId}`);
        setPosts(response.data || response);
      } catch (error) {
        console.error("Error fetching user posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [currentId]);

  if (!currentId) return <h1>No user selected. Please go back and choose a user.</h1>;
  if (loading) return <h1>Loading posts...</h1>;

  return (
  <>
    <Navbar />

    <div className="my-posts-page">
      <h1>User {currentId}'s Posts</h1>

      {posts.length === 0 ? (
        <p>This user hasn't posted anything yet.</p>
      ) : (
        <div className="posts-container">
          {posts.map((post: any) => (
            <PostCard
              key={post.id}
              title={post.title}
              body={post.body}
              showActions={true}
            />
          ))}
        </div>
      )}
    </div>
  </>
);
}

export default MyPosts
