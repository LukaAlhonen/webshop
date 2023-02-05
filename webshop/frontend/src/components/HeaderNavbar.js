import { NavLink } from 'react-router-dom'
import Cart from './Cart'

const HeaderNavbar = (props) => {
  const nv1 = (
    <>
      <NavLink className='header-nv-link swag-border swag-btn' to='signin'>Sign In</NavLink>
      <NavLink className='header-nv-link swag-border swag-btn' to='signup'>Sign Up</NavLink>
    </>
  )
  const nv2 = (
    <>
      <NavLink className='header-nv-link swag-border swag-btn' to='account'>Change Password</NavLink>
      <NavLink className='header-nv-link swag-border swag-btn' to='myitems'>My Items</NavLink>
      <button className='logout-btn swag-btn swag-border' onClick={props.signOut}>Log Out</button>
    </>
  )
  const navLinks = !props.isLogged ? nv1 : nv2
  const handleClick = !props.isLogged ? undefined : props.showCart
  return (
    <div>
      <div className="username">{props.username}</div>
      <div className='header-nv'>
        {navLinks}
        <button id='cart-btn' onClick={handleClick} className='header-nv-link swag-border swag-btn'>Cart</button>
        <Cart 
          items={props.items} 
          emptyCart={props.emptyCart}
          purchaseItems={props.purchaseItems}
          removeFromCart={props.removeFromCart}
        />
      </div>
    </div>
  )
}

export default HeaderNavbar