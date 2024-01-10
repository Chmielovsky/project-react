// Blog.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Style/Blog.css';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

interface User {
  id: number;
  name: string;
  username: string;
}

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [newPost, setNewPost] = useState({ title: '', body: '' });
  const [expandedPostIds, setExpandedPostIds] = useState<number[]>([]);

  useEffect(() => {
    // Pobierz posty
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => setPosts(response.data.slice(0, 15))) // Ogranicz do 15 postów
      .catch(error => console.error('Błąd pobierania postów:', error));

    // Pobierz komentarze
    axios.get('https://jsonplaceholder.typicode.com/comments')
      .then(response => setComments(response.data))
      .catch(error => console.error('Błąd pobierania komentarzy:', error));

    // Pobierz użytkowników
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Błąd pobierania użytkowników:', error));
  }, []);

  const handleAddPost = () => {
    // Dodaj nowy post
    axios.post('https://jsonplaceholder.typicode.com/posts', newPost)
      .then(response => {
        setPosts([...posts, response.data]);
        setNewPost({ title: '', body: '' });
      })
      .catch(error => console.error('Błąd dodawania posta:', error));
  };

  
  const handleToggleComments = (postId: number) => {
    if (expandedPostIds.includes(postId)) {
      setExpandedPostIds(expandedPostIds.filter(id => id !== postId));
    } else {
      setExpandedPostIds([...expandedPostIds, postId]);
    }
  };

  const getUserName = (userId: number) => {
    const user = users.find(user => user.id === userId);
    return user ? user.name : 'Nieznany użytkownik';
  };

  return (
    <div className="container">
      <h1>Blog</h1>
      {/* Formularz dodawania posta */}
      <div className="post-container">
        <h2>Dodaj nowy post</h2>
        <label>
          Tytuł:
          <input
            type="text"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
        </label>
        <br />
        <label>
          Treść:
          <textarea
            value={newPost.body}
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
          />
        </label>
        <br />
        <button onClick={handleAddPost}>Dodaj post</button>
      </div>

      {/* Wyświetlanie postów i komentarzy */}
      <ul>
        {posts.map(post => (
          <li key={post.id} className="post-container">
            <h2>{post.title}</h2>
            <p>Autor: {getUserName(post.userId)}</p>
            <p>{post.body}</p>
            
            <button onClick={() => handleToggleComments(post.id)}>
              {expandedPostIds.includes(post.id) ? 'Ukryj komentarze' : 'Pokaż komentarze'}
            </button>
            {expandedPostIds.includes(post.id) && (
              <ul>
                {comments
                  .filter(comment => comment.postId === post.id)
                  .map(comment => (
                    <li key={comment.id} className="comment-container">
                      <strong>{comment.name}</strong> ({comment.email}): {comment.body}
                    </li>
                  ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
