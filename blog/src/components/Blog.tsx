// Blog.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Style/Blog.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';



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
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [newPost, setNewPost] = useState({ title: '', body: '' });
  const [expandedPostIds, setExpandedPostIds] = useState<number[]>([]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn !== 'true') {
      navigate('/');
    }

    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => setPosts(response.data.slice(0, 15)))
      .catch(error => console.error('Błąd pobierania postów:', error));

    axios.get('https://jsonplaceholder.typicode.com/comments')
      .then(response => setComments(response.data))
      .catch(error => console.error('Błąd pobierania komentarzy:', error));

    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Błąd pobierania użytkowników:', error));
  }, []);

  const handleAddPost = () => {
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
      <div className="post-container">
        <h2>Dodaj nowy post</h2>
        <label>
          Tytuł:
        </label>
          <input
            type="text"
            value={newPost.title}
            className="form-control"
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />

        <br />
        <label>
          Treść:
        </label>
          <textarea
              className="form-control"
            value={newPost.body}
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
          />

        <br />
        <button onClick={handleAddPost}>Dodaj post</button>
      </div>

      <ul className="post-list">
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
