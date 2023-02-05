import { useState } from "react"

const Account = (props) => {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const updateOldPassword = (e) => {
    setOldPassword(e.target.value)
  }

  const updateNewPassword = (e) => {
    setNewPassword(e.target.value)
  }

  const updateConfirmPassword = (e) => {
    setConfirmPassword(e.target.value)
  }

  return (
    <div className='swag-border auth-container'>
      <label>
        <div className='auth-input'>Old Password: <input className='swag-border' type='password' value={oldPassword} onChange={updateOldPassword} /></div>
        <div className='auth-input'>New Password: <input className='swag-border' type='password' value={newPassword} onChange={updateNewPassword} /></div>
        <div className='auth-input'>Confirm New Password: <input className='swag-border' type='password' value={confirmPassword} onChange={updateConfirmPassword} /></div>
      </label>
      <button className='swag-btn swag-border auth-btn' onClick={() => props.updatePassword(newPassword, oldPassword, confirmPassword)}>Confirm</button>
    </div>
  )
}

export default Account