import React from 'react'
import {Link} from 'react-router-dom'
import PostAuthor from './PostAuthor' 

const PostItem = ({postID, category, title, desc, authorID, thumbnail, createdAt}) => {
    const shortDesc = desc.length > 145 ? desc.substr(0, 145) + '...' : desc;
    const postTitle = title.length > 30 ? title.substr(0, 30) + '...' : title;
  return (
    <Link to={`/posts/${postID}`}>
        <article className="post">
        <div className="post-thumbnail">
        <Link to={`/posts/${postID}`}>
            <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${thumbnail}`} alt={title} />
        </Link>
        </div>
        <div className="post-content">
            <Link to={`/posts/${postID}`}>
                <h3>{postTitle}</h3>
            </Link>
            <p dangerouslySetInnerHTML={{__html: shortDesc}}/>
            <div className="post-footer">
            <PostAuthor authorID={authorID} createdAt={createdAt}/>
            <Link to={`/posts/categories/${category}`} className='btn category'>{category}</Link>
            </div>
        </div>
    </article></Link>
  )
}

export default PostItem