import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Style/Gallery.css';

interface Photo {
  id: number;
  thumbnailUrl: string;
  title: string;
}

interface Album {
  id: number;
  title: string;
}

const Gallery: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
      navigate('/');
    }

    const fetchAlbums = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/albums');
        const albumsData = await response.json();
        setAlbums(albumsData);
        if (albumsData.length > 0) {
          setSelectedAlbumId(albumsData[0].id.toString());
        }
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };

    fetchAlbums();
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedAlbumId) {
        try {
          const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${selectedAlbumId}&_limit=30`);
          const data = await response.json();
          setPhotos(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [selectedAlbumId]);

  const handleDelete = (photoId: number) => {
    const updatedPhotos = photos.filter(photo => photo.id !== photoId);
    setPhotos(updatedPhotos);
  };

  return (
      <div className="gallery-container container">
        <h1>Gallery</h1>
        <select value={selectedAlbumId} onChange={(e) => setSelectedAlbumId(e.target.value)} className="album-selector form-select">
          {albums.map((album) => (
              <option key={album.id} value={album.id}>
                {album.title}
              </option>
          ))}
        </select>
        <div className="photo-gallery">
          {photos.map((photo) => (
              <div key={photo.id} className="photo-item">
                <img src={photo.thumbnailUrl} alt={photo.title} />
                <p>{photo.title}</p>
                <button className="photo-btn btn btn-primary" onClick={() => handleDelete(photo.id)}>Delete</button>
              </div>
          ))}
        </div>
      </div>
  );
};

export default Gallery;