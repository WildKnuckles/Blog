import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/userContext.js';

const ForgetPassword = () => {
  const [userData, setUserData] = useState({
    email: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { setCurrentUser } = useContext(UserContext);

  const changeInputHandler = (e) => {
    setUserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const forgetPass = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/users/forget-password`, userData);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Erro ao tentar recuperar a senha. Por favor, tente novamente mais tarde.');
      }
    }
  };

  return (
    <section className="login">
      <div className="container">
        <h2 className="center">Recuperação de Senha</h2>
        <form className="form login-form" onSubmit={forgetPass}>
          {error && <p className="form-error-message">{error}</p>}
          <input type="text" name="email" placeholder="Email" value={userData.email} onChange={changeInputHandler} autoFocus />
          <button type="submit" className="btn primary">
            Enviar
          </button>
          <small>
            Lembra da senha? <Link to="/login">Faça login</Link>
          </small>
        </form>
      </div>
    </section>
  );
};

export default ForgetPassword;
