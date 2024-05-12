import React from 'react'
import {Link} from 'react-router-dom'

const ErrorPage = () => {
  return (
    <section className='error-page'>
      <div className="center">
        <Link to="/" className='btn primary'>Voltar para Home</Link>
        <h2>Página Não Encontrada</h2>
      </div>
    </section>
  )
}

export default ErrorPage