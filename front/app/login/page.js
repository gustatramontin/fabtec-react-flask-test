
'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';

import req from '../utils.js'


export default function Home() {

  const [form, setForm] = useState({ username: '', password: '' });
  const router = useRouter()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form)
  }

  const handleLogin = () => {

    req.post('login', JSON.stringify(form))
      .then(res => res.json())
      .then(token => {
        if (token.error)
          alert(token.error)
        else {
          req.setToken(token.token)
          alert("Login bem sucedido")
          router.push('/')
        }
      })
      .catch(error => alert(error))
  }
  return (
    <div style={{ padding: '20px' }}>
        <label>Usuário <input type="text" name="username" onChange={handleChange} placeholder="gustavo"/></label>

        <label>Senha <input type="password" name="password" onChange={handleChange} placeholder="the lord"/></label>
        <button onClick={handleLogin}>Logar</button>
    </div>
  );
}
