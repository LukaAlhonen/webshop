import { useState } from 'react'

const Signin = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const updateUsername = (e) => {
    setUsername(e.target.value)
  }

  const updatePassword = (e) => {
    setPassword(e.target.value)
  }
  
  return (
    <div className='swag-border auth-container'>
      <label>
        <div className='auth-input'>Username: <input className='swag-border' type='text' value={username} onChange={updateUsername} /></div>
        <div className='auth-input'>Password: <input className='swag-border' type='password' value={password} onChange={updatePassword} /></div>
      </label>
      <button className='swag-border swag-btn auth-btn' onClick={() => props.signIn(username, password)}>Sign In</button>
    </div>
  )
}

export default Signin