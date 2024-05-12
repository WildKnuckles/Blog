import React, { useState, useEffect } from 'react'
import PostItem from './PostItem'
import Loader from './Loader'
import axios from 'axios'
import data from '../data'


const Posts = () => {
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=>{
      const fetchPosts = async () => {
        setIsLoading(true);
        try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts`)
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

export default Posts