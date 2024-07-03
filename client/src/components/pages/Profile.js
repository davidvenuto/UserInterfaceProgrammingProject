import { useState, useEffect, useContext } from 'react';
import { fetchData } from '../../main';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../context';

function Profile() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext); 
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        let isMounted = true;

        const fetchProfileData = async () => {
            try {
                if (!user) {
                    throw new Error('User not found');
                }
                const postsData = await fetchData(`/post/user/${user._id}`, {}, 'GET');
                if (isMounted) setPosts(postsData);
            } catch (error) {
                console.error('Error fetching profile data:', error);
                setError('Error fetching profile data');
            }
        };

        fetchProfileData();

        return () => {
            isMounted = false;
        };
    }, [user]);

    const handleNewPostChange = (e) => {
        setNewPost(e.target.value);
    };

    const handleCreatePost = async (e) => {
        e.preventDefault();
        try {
            const newPostData = await fetchData('/post/create', { userId: user._id, content: newPost }, 'POST');
            setPosts([...posts, newPostData]);
            setNewPost('');
        } catch (error) {
            console.error('Error creating post:', error);
            setError('Error creating post');
        }
    };

    if (!user) {
        return <div className="container mt-5"><h2>Loading...</h2></div>;
    }

    return (
        <div className="container mt-5">
            <h2>Welcome, {user.username}</h2>
            {error && <div className="alert alert-danger">{error}</div>}
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
