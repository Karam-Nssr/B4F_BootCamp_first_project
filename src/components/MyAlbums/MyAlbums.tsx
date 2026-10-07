import React, { useEffect, useState } from 'react'
import { useUser } from '../../userContext';
import {  base_url, my_albums_url,} from '../../../core/end_points';
import { getData } from '../../../core/http_methods';
import Navbar from '../Navbar/Navbar';

const MyAlbums = () => {
  const { currentId } = useUser();
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentId) return;

    const fetchUserAlbums = async () => {
      try {
        setLoading(true);
        const response = await getData(`${base_url}${my_albums_url}?userId=${currentId}`);
        setAlbums(response.data || response);
      } catch (error) {
        console.error("Error fetching user albums:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAlbums();
  }, [currentId]);

  if (!currentId) return <h1>No user selected. Please go back and choose a user.</h1>;
  if (loading) return <h1>Loading albums...</h1>;

  return (
    <>
    <Navbar />
    <div>
      <h1>User {currentId}'s Albums</h1>
      {albums.length === 0 ? (
        <p>This user hasn't created any albums yet.</p>
      ) : (
        <ul>
          {albums.map((album: any) => (
            <li key={album.id}>
              <h3>{album.title}</h3>
              <p>{album.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
    </>
  )
}

export default MyAlbums
