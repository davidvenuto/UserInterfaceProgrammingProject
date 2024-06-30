import { useState } from 'react';
import { fetchData } from '../../main';
import { useNavigate } from "react-router-dom";

function RegisterForm() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: '',
        email: '', 
        password: '',
        password2: '' 
    });
    const [error, setError] = useState('');

    const { username, email, password, password2 } = user;

    const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        if (password !== password2) {
            setError('Passwords do not match');
            return;
        }
        fetchData('/user/register', { username, email, password }, 'POST')
            .finally(() => {
                navigate("/profile");
            });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={onSubmit}>
                        <h2 className="mb-3">Register</h2>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                name="username"
                                onChange={onChange}
                                value={username}
                                placeholder='barackobama123'
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                onChange={onChange}
                                value={email}
                                placeholder='barackobama@gmail.com'
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
                        <div className="mb-3">
                            <label htmlFor="password2" className="form-label">Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password2"
                                name="password2"
                                onChange={onChange}
                                value={password2}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegisterForm;
