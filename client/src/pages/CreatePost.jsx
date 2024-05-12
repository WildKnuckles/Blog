import React, { useContext, useEffect, useState } from 'react'
import {UserContext} from '../context/userContext'
import { Editor } from '@tinymce/tinymce-react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'


const CreatePost = () => {
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('Uncategorized')
    const [desc, setDesc] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate();

    const {currentUser} = useContext(UserContext)
    const token = currentUser?.token

    // redirect to home page for any user who isn't logged
    useEffect(() => {
      if(!token){
        navigate('/')
      }
    })

    const POST_CATEGORIES = ["Sem Categoria", "Agricultura", "Negócios", "Educação", "Entretenimento", "Arte", "Investimento", "Meteorologia"]



    const createPost = async (e) => {
      e.preventDefault();

      const postData = new FormData();
      postData.set('title', title)
      postData.set('category', category)
      postData.set('desc', desc)
      postData.set('thumbnail', thumbnail)

      try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/posts`, postData, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
        if(response.status == 201){
          return navigate('/news')
        }
      } catch (err) {
        setError(err.response.data.message)
      }
    }


  return (
    <section className="create-post">
      <div className="container">
        <h2>Criar Post</h2>
        {error && <p className="form-error-message">{error}</p>}
        <form className="form create-post-form" onSubmit={createPost}>
          <input type="text" placeholder='Título' value={title} onChange={e => setTitle(e.target.value)} autoFocus/>
          <select name="category" value={category} onChange={e => setCategory(e.target.value)}>
            {
              POST_CATEGORIES.map(cat => <option key={cat}>{cat}</option>)
            }
          </select>
          
          <Editor
          apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
      init={{
        height: 240,
        menubar: true,
        language: 'pt_PT',
        autoresize_min_height: 250,
        autoresize_max_height: 500,
        plugins: [
          'advlist autolink lists link image',
          'charmap print preview anchor help',
          'searchreplace visualblocks code',
          'insertdatetime media table paste wordcount',
          'media'
        ],
        toolbar:
          'undo redo | formatselect | bold italic | \
          alignleft aligncenter alignright | \
          bullist numlist outdent indent | help | media'
      }}
      onEditorChange={(content, editor) => setDesc(content)}
    /> <p className="form-error-message">A imagem deve ser um quadrado perfeito, exemplo: 1080 x 1080</p>
          <input className='custom-file-input' type="file" onChange={e => setThumbnail(e.target.files[0])} accept='.png, .jpg, .jpeg, .pdf'/>
          
            <button type='submit' className="btn primary">Criar</button>
        </form>
      </div>
    </section>
  )
}

export default CreatePost