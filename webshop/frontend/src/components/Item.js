const Item = (props) => {
  const b1 = <button id='item-btn' className='item-btn swag-border swag-btn' onClick={() => props.addToCart(props.item.id)}>Add To Cart</button>
  const b2 = <button className='item-btn swag-border swag-btn' onClick={() => props.editItem(props.item)}>Edit</button>
  let button = ''
  if(props.isLogged && !props.editItem) {
    button = b1
  } else if(props.isLogged && props.editItem) {
    button = b2
  }
  const dateString = new Date(props.item.date_added)
  const date = `${dateString.getDate()}.${dateString.getMonth()+1}.${dateString.getFullYear()}`
  return (
    <div className='shop-item swag-border'>
      <div className='item-props'>
        <div className='prop-container'>
          <div className='prop-title'>Name:</div><div>{ props.item.name }</div>
        </div>
        <div className='prop-container-d'>
          <div className='prop-title'>Description:</div><div>{ props.item.description }</div>
        </div>
        <div className='prop-container'>
          <div className='prop-title'>Price:</div><div>{ props.item.price }</div>
        </div>
        <div className='prop-container'>
          <div className='prop-title'>Date Added:</div><div>{ date }</div>
        </div>
          {button}
      </div>
      <div className='image-container swag-border'>
        <span className='helper'></span><img className='item-image' alt='img' src={'http://127.0.0.1:8000' + props.item.image}></img>
      </div>
    </div>
  )
}

export default Item