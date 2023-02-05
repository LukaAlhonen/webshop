import { useState } from 'react'

const Signup = (props) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const updateUsername = (e) => {
    setUsername(e.target.value)
  }

  const updateEmail = (e) => {
    setEmail(e.target.value)
  }

  const updatePassword = (e) => {
    setPassword(e.target.value)
  }

  return (
    <div className='swag-border auth-container'>
      <label>
        <div className='auth-input'>Username: <input className='swag-border' type='text' value={username} onChange={updateUsername} /></div>
        <div className='auth-input'>Email: <input className='swag-border' type='text' value={email} onChange={updateEmail} /></div>
        <div className='auth-input'>Password: <input className='swag-border' type='password' value={password} onChange={updatePassword} /></div>
      </label>
      <button className='swag-btn swag-border auth-btn' onClick={() => props.signUp(username, email, password)}>Sign Up</button>
    </div>
  )
}

export default Signup