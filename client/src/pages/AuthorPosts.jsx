import React, { useState, useEffect, useContext } from 'react'
import PostItem from '../components/PostItem'
import Loader from '../components/Loader'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const AuthorPosts = () => {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const {id} = useParams()
  useEffect(()=>{
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/users/${id}`)
        setPosts(response?.data)
      } catch (error) {
        console.log(error)
      }
        setIsLoading(false)
    }
    fetchPosts();
  }, [])

  if(isLoading) {
    return <Loader/>
  }
return (
   <section className="posts">
      {posts.length > 0 ? <div className="container posts-container">
      {
          posts.map(({_id: id, thumbnail, category, title, desc, creator, createdAt}) => <PostItem key={id} postID={id} thumbnail={thumbnail} category={category} title={title} desc={desc} authorID={creator} createdAt={createdAt}/>)
      }
      </div> : <h2 className='center'>Sem posts</h2>}
   </section>
)
}

export default AuthorPosts