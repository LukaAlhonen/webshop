import {Routes, Route} from 'react-router-dom'
import Items from './Items'
import Signin from './auth/Signin'
import Signup from './auth/Signup'
import Account from './auth/Account'
import MyItems from './myitems/MyItems'

const Main = (props) => {
  
  return (
    <div className='main'>
      <Routes>
        <Route path='shop' element={<Items getNext={props.getNext} getPrev={props.getPrev} isLogged={props.isLogged} addToCart={props.addToCart} page={props.page} count={props.count} getPage={props.getPage} />} />
        <Route path='signup' element={<Signup signUp={props.signUp} />} />
        <Route path='signin' element={<Signin signIn={props.signIn} />} />
        <Route path='myitems' element={<MyItems editItem={props.editItem} showEditItemForm={props.showEditItemForm}  showItemForm={props.showItemForm} addItem={props.addItem} username={props.username} isLogged={props.isLogged} />} />
        <Route path='account' element={<Account updatePassword={props.updatePassword} />} />
      </Routes>
    </div>
  )
}

export default Main