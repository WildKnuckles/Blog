import {useState} from 'react'
import {Link} from 'react-router-dom'
import emailjs from '@emailjs/browser';

const Footer = () => {

  const [data, setData] = useState({
    nome: '',
    email: '',
    assunto: ''
});

const valorInput = e => setData({ ...data, [e.target.name]: e.target.value });

const enviarDados = (e) => {
  e.preventDefault();
const TemplateParams = {
  from_name: data.nome,
  email: data.email,
  assunto: data.assunto
};

emailjs.send("service_eu9k3pi", "template_xovf7ms", TemplateParams, "g315dGgdsD-S7xzVU")
            .then((response) => {

              alert("Feedback enviado.");
                if(!data.nome || !data.email || !data.assunto){
                    alert("Preencha os campos corretamente.")
                } else {
                  setData({
                    nome: '',
                    email: '',
                    assunto: ''
                });
                }
}, (err) => {
  console.log("Erro: ", err);
})

}

  return (
    <>
    <br />
    <div className='container profile-container'>
      <form className='form feed-form' onSubmit={enviarDados}>
        <h3>Deixe seu Feedback</h3>
      <input type="text" name='nome' onChange={valorInput} value={data.nome} placeholder='Nome Completo' autoFocus required/>
          <input name='email' type="email" value={data.email} onChange={valorInput} placeholder='Email'  required/>
          <textarea type="text" name='assunto' value={data.assunto} onChange={valorInput} placeholder='Assunto' rows='5' />
          <button type='submit' className="btn primary">Enviar</button>
      </form>
    </div>
<footer>
  <ul className="footer-categories">
    <li><Link to="/posts/categories/Negócios">Negócios</Link></li>
    <li><Link to="/posts/categories/Educação">Educação</Link></li>
    <li><Link to="/posts/categories/Entretenimento">Entretenimento</Link></li>
    <li><Link to="/posts/categories/Arte">Arte</Link></li>
    <li><Link to="/posts/categories/Investimento">Investimento</Link></li>
    <li><Link to="/posts/categories/Sem Categoria">Sem Categoria</Link></li>
    <li><Link to="/posts/categories/Meteorologia">Meteorologia</Link></li>
    <li><Link to="/posts/categories/Agricultura">Agricultura</Link></li>
  </ul>
    <div className="footer-copyright">
      <small>All Rights Reserved &copy; Copyright, IPIL DEVs.</small>
    </div>

</footer>
</>
  )
}

export default Footer