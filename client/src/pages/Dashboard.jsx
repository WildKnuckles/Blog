import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {UserContext} from '../context/userContext'
import {useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'
import Loader from '../components/Loader'
import DeletePost from './DeletePost'



const Dashboard = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const {id} = useParams()

    const {currentUser} = useContext(UserContext)
    const token = currentUser?.token

    // redirect to home page for any user who isn't logged
    useEffect(() => {
      if(!token){
        navigate('/')
      }
    }, [])



    useEffect(() => {
      const fetchPosts = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/users/${id}`, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
          setPosts(response.data)
        } catch (error) {
          console.log(error)
        }
        setIsLoading(false)
      }

      fetchPosts();
    }, [id])


    if(isLoading){
      return <Loader/>
    }


  return (
    <section className="dashboard">
      {
        posts.length ? <div className="container dashboard container">
          {posts.map(post => {
            return <article key={posts.id} className="dashboard-post">
                <div className="dashboard-post-info">
                  <div className="dashboard-post-thumbnail">
                    <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${post.thumbnail}`} alt="" />
                  </div>
                  <h5>{post.title}</h5>
                </div>
                <div className="dashboard-post-actions">
                  <Link to={`/posts/${post._id}`} className='btn sm'>Ver</Link>
                  <Link to={`/posts/${post._id}/edit`} className='btn sm primary'>Editar</Link>
                  <DeletePost postId={post._id}/>
                </div>
            </article>
          })}
        </div> : <h2 className='center'>Você ainda não tem posts.</h2>
      }
    </section>
  )
}

export default Dashboard