import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ReactTimeAgo from 'react-time-ago'
import TimeAgo from 'javascript-time-ago'
import pt from 'javascript-time-ago/locale/pt.json'
import ru from 'javascript-time-ago/locale/ru.json'


TimeAgo.addDefaultLocale(pt)
TimeAgo.addLocale(ru)

const PostAuthor = ({authorID, createdAt}) => {
  const [author, setAuhtor] = useState({})
  useEffect(() =>{
    const getAuthor = async ()=>{
      try {
          const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${authorID}`)
          setAuhtor(response?.data)
      } catch (err) {
        console.log(err)
      }
      
    }
    getAuthor();
  }, [])

  return (
    <Link to={`/posts/users/${authorID}`} className='post-author'>
      <div className="post-author-avatar">
        <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${author?.avatar}`} alt="" />
      </div>
      <div className="post-author-details">
        <h5>De: {author?.name}</h5>
        <small><ReactTimeAgo date={new Date(createdAt)} locale='pt-PT'/></small>
      </div>
    </Link>
  )
}

export default PostAuthor