import { useEffect, useState } from 'react';
import { useUser } from '../../userContext';
import { base_url, my_albums_url } from '../../../core/end_points';
import { getData } from '../../../core/http_methods';
import Navbar from '../Navbar/Navbar';
import './MyAlbums.css'; 

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

  const renderContent = () => {
    if (!currentId) {
      return (
        <div className="albums-status-message error-state">
          <h2>No user selected.</h2>
          <p>Please go back to the users tab and choose an active profile.</p>
        </div>
      );
    }

    if (loading) {
      return (
        <div className="albums-status-message loading-state">
          <div className="spinner"></div>
          <h2>Loading your albums...</h2>
        </div>
      );
    }

    if (albums.length === 0) {
      return (
        <div className="albums-status-message empty-state">
          <p>This user hasn't created any albums yet.</p>
        </div>
      );
    }

    return (
      <ul className="albums-grid">
        {albums.map((album) => (
          <li key={album.id} className="album-card">
            <div className="album-icon-wrapper">
              <span className="album-icon">📁</span>
              <span className="album-id-badge">ID: {album.id}</span>
            </div>
            <div className="album-content">
              <h3>{album.title}</h3>
              {album.body && <p>{album.body}</p>}
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="page-container">
      <Navbar />
      <main className="albums-main">
        {currentId && (
          <header className="albums-header">
            <h1>User {currentId}'s Albums</h1>
            <span className="albums-count-badge">{albums.length} Albums Total</span>
          </header>
        )}
        <section className="albums-content-area">
          {renderContent()}
        </section>
      </main>
    </div>
  );
};

export default MyAlbums;
