import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaCheck, FaEye, FaEyeSlash } from "react-icons/fa";

const UserProfile = () => {
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const { id, token } = useParams();
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar se a senha está visível

  const isPasswordValid = (password) => {
    // Verifica se a senha possui pelo menos 8 caracteres, um número, uma letra maiúscula e uma minúscula
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    return passwordRegex.test(password);
  };

  //mostrar senha
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (password) => {
    if (!isPasswordValid(password)) {
      setError(
        'A senha deve conter pelo menos 8 caracteres, incluindo pelo menos um número, uma letra maiúscula e uma minúscula.'
      );
      setShowSuccess(false);
    } else {
      setError('');
      setShowSuccess(true);
    }
    setNewPassword(password);
  };

  const updateUserDetails = async (e) => {
    e.preventDefault();

    if (!isPasswordValid(newPassword)) {
      setError(
        'A senha deve conter pelo menos 8 caracteres, incluindo pelo menos um número, uma letra maiúscula e uma minúscula.'
      );
      return;
    }

    try {
      const userData = new FormData();
      userData.set('newPassword', newPassword);

      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/users/reset-password/${id}/${token}`,
        userData
      );
      if (response.status === 200) {
        setShowSuccess(true);
        // log user out
        navigate('/login');
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <section className="profile">
      <div className="container profile-container">
        <div className="profile-details">
          <h1>Redefinir Senha</h1>
          {/* form to update user details */}
          <form className="form profile-form" onSubmit={updateUserDetails}>
          <h2>{showSuccess && (
              <FaCheck className="success-icon" />
            )}</h2>
            {error && <p className="form-error-message">{error}</p>}
            <div className='password-input-container'>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Senha Nova"
              value={newPassword}
              onChange={(e) => handlePasswordChange(e.target.value)}
              autoFocus
            />
            <div className="password-toggle" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
            </div>
            <button type="submit" className="btn primary">
              Atualizar
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
