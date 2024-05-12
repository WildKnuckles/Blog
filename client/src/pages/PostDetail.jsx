import React, { useEffect, useState} from 'react'
import PostAuthor from '../components/PostAuthor'
import { Link, useParams } from 'react-router-dom'
import { useContext } from 'react'
import DeletePost from './DeletePost'
import {UserContext} from '../context/userContext'
import Loader from '../components/Loader'
import axios from 'axios'
import Footer from '../components/Footer'

const PostDetail = () => {
  const {id} = useParams()
  const [post, setPost] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(()=>{
    const getPost = async () =>{
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`)
        setPost(response.data)
      } catch (error) {
        setError(error)
      }
      setIsLoading(false)
    }
    getPost();
  }, [])

  const {currentUser} = useContext(UserContext)
  if(isLoading){
    return <Loader/>
  }

  return (
    <>
    <section className="post-detail">
      {error && <p className='error'>{error}</p>}
      {post && <div className="container post-detail-container">
        <div className="post-detail-header">
          <PostAuthor authorID={post.creator} createdAt={post.createdAt}/>
          {currentUser?.id == post?.creator &&<div className="post-detail-buttons">
            <Link to={`/posts/${post?._id}/edit`} className='btn sm primary'>Editar</Link>
            <DeletePost postId={id}/>
          </div>}
        </div>
        <h1>{post.title}</h1>
        <div className="post-detail-thumbnail">
          <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${post.thumbnail}`} alt="" />
        </div>
        <span className='p' dangerouslySetInnerHTML={{__html: post.desc}}></span>
      </div>}
    </section><Footer/></>
  )
}

export default PostDetail