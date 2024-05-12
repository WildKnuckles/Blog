import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {UserContext} from '../context/userContext'

const Register = () => {
  const nav = useNavigate();

    const {currentUser} = useContext(UserContext)
    const token = currentUser?.token

    // redirect to home page for any user who isn't logged
    useEffect(() => {
      if(!token){
        nav('/')
      }
    })
  
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const changeInputHandler = (e) =>{
    setUserData(prevState => {
      return {...prevState, [e.target.name]: e.target.value}
    })
  }

  const registerUser = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/register`, userData)
      const newUser = await response.data;
      console.log(newUser);
      if(!newUser){
        setError("Couldn't register user. Please try again.")
      }
      navigate('/login')
    } catch (err) {
      setError(err.response.data.message)
    }
  }

  return (
    <section className="register">
      <div className="container">
        <h2>Cadastro</h2>
        <form className="form register-form" onSubmit={registerUser}>
          {error && <p className="form-error-message">{error}</p>}
          <input type="text" name="name" placeholder='Nome Completo' value={userData.name} onChange={changeInputHandler} autoFocus/>
          <input type='text' name="email" placeholder='Email' value={userData.email} onChange={changeInputHandler} />
          <input type="password" name="password" placeholder='Senha' value={userData.password} onChange={changeInputHandler} />
          <input type="password" name="password2" placeholder='Confirmar Senha' value={userData.password2} onChange={changeInputHandler} />
          <button type="submit" className='btn primary'>Cadastrar</button>
          <small>Já tem uma conta? <Link to="/login">Faz Login</Link></small>
        </form>
      </div>
    </section>
  )
}

export default Register