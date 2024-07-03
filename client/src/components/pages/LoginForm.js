import { useState, useContext } from 'react';
import { fetchData } from '../../main';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../context';

function LoginForm() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const { setUser } = useContext(UserContext); 

    const { username, password } = form;

    const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await fetchData('/user/login', { username, password }, 'POST');
            console.log('User data on login:', userData); 
            setUser(userData);
            navigate("/profile");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={onSubmit}>
                        <h2 className="mb-3">Login</h2>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="username" 
                                name="username" 
                                placeholder="barackobama123"
                                onChange={onChange}
                                value={username}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                id="password"
                                name="password"
                                onChange={onChange}
                                value={password}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
