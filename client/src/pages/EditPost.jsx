import React, { useContext, useEffect, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import {UserContext} from '../context/userContext'
import {useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'


const EditPost = () => {
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('Uncategorized')
    const [desc, setDesc] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate();
    const {id} = useParams();
    
    const {currentUser} = useContext(UserContext)
    const token = currentUser?.token;

    // redirect to home page for any user who isn't logged in
    useEffect(()=>{
      if(!token){
        navigate('/')
      }
    })


    useEffect(() => {
      const getPost = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`)
          setTitle(response.data.title)
          setDesc(response.data.desc)
          setCategory(response.data.category)
        } catch (error) {
          console.log(error)
        }
      }

      getPost();
    }, [])

    const POST_CATEGORIES = ["Agricultura", "Negócios", "Educação", "Entretenimento", "Arte", "Investimento", "Sem Categoria", "Meteorologia"]

    const editPost = async (e) => {
        e.preventDefault();

        const postData = new FormData();
      postData.set('title', title)
      postData.set('category', category)
      postData.set('desc', desc)
      postData.set('thumbnail', thumbnail)

      try {
        const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/posts/${id}`, postData, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
        if(response.status == 200){
          return navigate('/news')
        }
      } catch (err) {
        setError(err.response.data.message)
      }
    } 


  return (
    <section className="create-post">
      <div className="container">
        <h2>Editar Post</h2>
        {error &&<p className="form-error-message">{error}</p>}
        <form className="form create-post-form" onSubmit={editPost}>
          <input type="text" placeholder='Título' value={title} onChange={e => setTitle(e.target.value)} autoFocus/>
          <select name="category" value={category} onChange={e => setCategory(e.target.value)}>
            {
              POST_CATEGORIES.map(cat => <option key={cat}>{cat}</option>)
            }
          </select>
          <Editor
          apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
          value={desc} 
      init={{
        height: 240,
        menubar: true,
        language: 'pt_PT',
        directionality: 'ltr',
        
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
            <input type="file" onChange={e => setThumbnail(e.target.files[0])} accept='.png, .jpg, .jpeg'/>
            <button type='submit' className="btn primary">Atualizar</button>
        </form>
      </div>
    </section>
  )
}

export default EditPost