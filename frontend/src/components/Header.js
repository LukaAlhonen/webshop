import Search from './Search'
import HeaderNavbar from './HeaderNavbar'

const Header = (props) => (
  <div className='header swag-border'>
    <div id='logo-container'>
      <img onClick={props.handleLogoClick} className='logo swag-border' alt='logo' src='https://lukaswebshop.azurewebsites.net/media/images/logo.png'></img>
    </div>
    <Search search={props.search} />
    <HeaderNavbar 
      signOut={props.signOut} 
      username={props.username}
      isLogged={props.isLogged} 
      items={props.items} 
      removeFromCart={props.removeFromCart}
      emptyCart={props.emptyCart} 
      showCart={props.showCart}
      purchaseItems={props.purchaseItems}
      />
  </div>
)

export default Header