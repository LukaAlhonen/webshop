import { useState } from "react"

const EditItemForm = (props) => {
  const [price, setPrice] = useState('')

  const updatePrice = (e) => {
    setPrice(e.target.value)
  }

  const handleSubmit = () => {
    if(Number.isInteger(parseInt(price))) {
      props.item.price = price
      props.editItem(props.item)
    } else {
      window.alert('Incorrect price type')
    }
  }

  return (
    <div id='editItem' className='edititem-form swag-border'>
      <label>
        <div className='auth-input'>Name: <div className='swag-border edit-prop'>{props.item.name}</div></div>
        <div className='auth-input'>Set Price: <input className='swag-border' type='text' value={price} onChange={updatePrice} /></div>
        <div className='auth-input'>Description: <div className='swag-border edit-prop'>{props.item.description}</div></div>
      </label>
      <button className='swag-border swag-btn' onClick={handleSubmit} >Submit</button>
    </div>
  )
}

export default EditItemForm