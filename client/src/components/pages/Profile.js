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
    const [comments, setComments] = useState({});

    useEffect(() => {
        let isMounted = true;

        const fetchProfileData = async () => {
            try {
                if (!user) {
                    throw new Error('User not found');
                }
                const postsData = await fetchData(`/post/user/${user._id}`, {}, 'GET');
                if (isMounted) {
                    setPosts(postsData);
                    // Fetch comments for each post
                    postsData.forEach(async post => {
                        const postComments = await fetchData(`/comment/post/${post._id}`, {}, 'GET');
                        if (isMounted) {
                            setComments(prev => ({
                                ...prev,
                                [post._id]: postComments || [] 
                            }));
                        }
                    });
                }
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

    const handleAddComment = async (postId, content) => {
        try {
            const newComment = await fetchData('/comment/create', { postId, userId: user._id, content }, 'POST');
            setComments(prev => ({
                ...prev,
                [postId]: [...(prev[postId] || []), newComment] 
            }));
        } catch (error) {
            console.error('Error adding comment:', error);
            setError('Error adding comment');
        }
    };

    const handleCommentChange = (e, postId) => {
        const { value } = e.target;
        setComments(prev => ({
            ...prev,
            [postId]: {
                ...prev[postId],
                newCommentContent: value
            }
        }));
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
                    <li key={post._id}>
                        <p>{post.content}</p>
                        <h4>Comments</h4>
                        <ul>
                            {comments[post._id] && Array.isArray(comments[post._id]) ? (
                                comments[post._id].map(comment => (
                                    <li key={comment._id}>{comment.content}</li>
                                ))
                            ) : (
                                <li>No comments yet</li>
                            )}
                        </ul>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            handleAddComment(post._id, comments[post._id]?.newCommentContent || '');
                        }}>
                            <input
                                type="text"
                                value={comments[post._id]?.newCommentContent || ''}
                                onChange={(e) => handleCommentChange(e, post._id)}
                                placeholder="Add a comment"
                                required
                            />
                            <button type="submit">Add Comment</button>
                        </form>
                    </li>
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
