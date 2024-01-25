const Cart = (props) => (
  <div id='myCart' className='cart swag-border'>
    <div className='cart-header'>
      <h4>Item, Price</h4>
      <button className='swag-border swag-btn' onClick={props.emptyCart}>Remove All</button>
    </div>
    <div className='cart-items'>
      <ul className='cart-item-list'>
        {props.items.map((item, index) => 
          <li className='cart-item' key={index}>{item.name}, {item.price}<button className='cart-item-btn swag-border swag-btn' onClick={() => props.removeFromCart(index)}>X</button></li>
        )}
      </ul>
      <button className="swag-btn swag-border" onClick={props.purchaseItems}>Buy</button>
    </div>        
  </div>
)

export default Cart