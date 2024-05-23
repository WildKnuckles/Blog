import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {FaEdit} from "react-icons/fa"
import {FaCheck} from "react-icons/fa"
import {UserContext} from '../context/userContext'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const UserProfile = () => {
  const [avatar, setAvatar] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const navigate = useNavigate();
  const [error, setError] = useState('')
  const {id, token} = useParams()



    const updateUserDetails = async (e) => {
      e.preventDefault();

      try {
        const userData = new FormData();
      userData.set('newPassword', newPassword)

      const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/users/reset-password/${id}/${token}`, userData)
      if(response.status == 200){
        // log user out
        navigate('/login')
      }
      } catch (error) {
        setError(error.response.data.message);
      }
    }




  return (
    <section className="profile">
      <div className="container profile-container">

        <div className="profile-details">


        <h1>Redefinir Senha</h1> 

        {/* form to update user details */}
        <form className="form profile-form" onSubmit={updateUserDetails}>
          {error && <p className="form-error-message">{error}</p>}
          <input type="password" placeholder='Senha Nova' value={newPassword} onChange={e => setNewPassword(e.target.value)} autoFocus/>
          <button type='submit' className="btn primary">Atualizar</button>
        </form>


      </div> 
      </div>
    </section>
  )
}

export default UserProfile