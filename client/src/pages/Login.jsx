import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/userContext.js';

const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Estado de loading
  const navigate = useNavigate();

  const { setCurrentUser } = useContext(UserContext);

  const changeInputHandler = (e) => {
    setUserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true); // Ativa o loading
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/login`, userData);
      const user = await response.data;
      setCurrentUser(user);
      navigate('/news');
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setLoading(false); // Desativa o loading
    }
  };

  return (
    <section className="login">
      <div className="container">
        <h2 className='center'>Login</h2>
        <form className="form login-form" onSubmit={loginUser}>
          {error && <p className="form-error-message">{error}</p>}
          <input type='text' name="email" placeholder='Email' value={userData.email} onChange={changeInputHandler} autoFocus />
          <input type="password" name="password" placeholder='Senha' value={userData.password} onChange={changeInputHandler} />
          <button type="submit" className='btn primary' disabled={loading}>
            {loading ? 'A Entrar...' : 'Entrar'}
          </button>
          <small>Esqueceu a senha? <Link to="/forget-password">Recupere - a</Link></small>
        </form>
      </div>
    </section>
  );
};

export default Login;
