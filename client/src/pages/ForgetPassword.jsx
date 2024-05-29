import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/userContext.js';
import { FaCheck } from 'react-icons/fa';

const ForgetPassword = () => {
  const [userData, setUserData] = useState({
    email: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0); // Estado para a contagem regressiva
  const [showConfirmation, setShowConfirmation] = useState(false); // Estado para mostrar o ícone de confirmação
  const navigate = useNavigate();

  const { setCurrentUser } = useContext(UserContext);

  const changeInputHandler = (e) => {
    setUserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  useEffect(() => {
    if (countdown > 0) {
      setShowConfirmation(true); // Mostra o ícone de confirmação quando o temporizador começa
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      return () => clearInterval(timer); // Limpa o intervalo quando o componente desmonta ou o countdown muda
    } else {
      setShowConfirmation(false); // Esconde o ícone de confirmação quando o temporizador termina
    }
  }, [countdown]);

  const forgetPass = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/users/forget-password`, userData);
      setCountdown(60); // Inicia a contagem regressiva de 60 segundos
      setUserData({ email: '' }); // Limpa o campo de email
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Erro ao tentar recuperar a senha. Por favor, tente novamente mais tarde.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login">
      <div className="container">
        <h2 className="center">Recuperação de Senha</h2>
        <form className="form login-form" onSubmit={forgetPass}>
        {showConfirmation && <p className="success-icon" >Email Enviado</p>} {/* Ícone de confirmação */}
          {error && <p className="form-error-message">{error}</p>}
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={userData.email}
            onChange={changeInputHandler}
            autoFocus
            disabled={countdown > 0} // Desabilita o campo de email durante a contagem regressiva
          />
          
          <button
            type="submit"
            className={`btn primary ${loading || countdown > 0 ? 'disabled' : ''}`}
            disabled={loading || countdown > 0}
            style={{ cursor: loading || countdown > 0 ? 'not-allowed' : 'pointer' }}
          >
            {loading ? 'Enviando...' : countdown > 0 ? `Aguarde ${countdown}s` : 'Enviar'}
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
