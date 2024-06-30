import React, { useState, useEffect } from 'react';
import { fetchData } from '../../main'; // Ensure this function is correctly implemented
import { useNavigate } from "react-router-dom";

function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState({ _id: '', username: '' });
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState('');

    useEffect(() => {
        const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage
        fetchData(`/user/profile/${userId}`, {}, 'GET')
            .then(data => {
                setUser(data);
                return fetchData(`/post/user/${data._id}`, {}, 'GET');
            })
            .then(postsData => setPosts(postsData))
            .catch(error => console.error('Error fetching profile data:', error));
    }, []);

    const handleNewPostChange = (e) => {
        setNewPost(e.target.value);
    };

    const handleCreatePost = (e) => {
        e.preventDefault();
        fetchData('/post/create', { userId: user._id, content: newPost }, 'POST')
            .then(newPost => {
                setPosts([...posts, newPost]);
                setNewPost('');
            })
            .catch(error => console.error('Error creating post:', error));
    };

    return (
        <div className="container mt-5">
            <h2>Welcome, {user.username}</h2>
            <h3>Your Posts</h3>
            <ul>
                {posts.map(post => (
                    <li key={post._id}>{post.content}</li>
                ))}
            </ul>
            <form onSubmit={handleCreatePost}>
                <div className="mb-3">
                    <label htmlFor="newPost" className="form-label">New Post</label>
                    <input
                        type="text"
                        className="form-control"
                        id="newPost"
                        value={newPost}
                        onChange={handleNewPostChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Create Post</button>
            </form>
        </div>
    );
}

export default Profile;
