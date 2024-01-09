
import React, { useState, useEffect } from 'react';
import './Style/Gallery.css'; 

const Gallery: React.FC = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=30');
        const data = await response.json();
        setPhotos(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = (photoId: number) => {
    const updatedPhotos = photos.filter((photo: any) => photo.id !== photoId);
    setPhotos(updatedPhotos);
  };

  return (
    <div className="gallery-container">
      <h1>Gallery</h1>
      <div className="photo-gallery">
        {photos.map((photo: any) => (
          <div key={photo.id} className="photo-item">
            <img src={photo.thumbnailUrl} alt={photo.title} />
            <p>{photo.title}</p>
            <button onClick={() => handleDelete(photo.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
