import { useState } from 'react'

const AddItemForm = (props) => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(null)
  
  const updateName = (e) => {
    setName(e.target.value)
  }

  const updatePrice = (e) => {
    setPrice(e.target.value)
  }

  const updateDescription = (e) => {
    setDescription(e.target.value)
  }

  const updateImage = (e) => {
    console.log(e.target.files[0])
    setImage(e.target.files[0])
  }

  return (
    <div id='addItem' className='swag-border additem-form'>
      <label>
        <div className='auth-input'>Name: <input type='text' value={name} onChange={updateName} /></div>
        <div className='auth-input'>Description: <input type='text' value={description} onChange={updateDescription} /></div>
        <div className='auth-input price-input'>Price: <input type='text' value={price} onChange={updatePrice} /></div>
        <label className="image-upload swag-border swag-btn">
          <input type="file" accept='image/png, image/jpeg' onChange={updateImage} required/>
          Upload Image
        </label>
      </label>
      <button className='swag-border swag-btn upload-item-btn' onClick={() => props.addItem(name, price, description, image)}>Submit</button>
    </div>
  )
} 

export default AddItemForm