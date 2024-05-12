import React from 'react'
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
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
  )
}

export default Footer