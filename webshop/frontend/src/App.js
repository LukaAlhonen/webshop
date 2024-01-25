import './App.css'
import Header from './components/Header'
import { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Main from './components/Main'
import itemService from './services/items'
import authService from './services/auth'
import { useCookies } from 'react-cookie'

const App = () => {
  const [cartItems, setCartItems] = useState([])
  const [pages, setPages] = useState([[]])
  const [currentPage, setCurrentPage] = useState([])
  const [count, setCount] = useState(0)
  const [myItems, setMyItems] = useState([[]])
  const [isLogged, setIsLogged] = useState(false)
  const [next, setNext] = useState('')
  const [prev, setPrev] = useState('')
  const [filter, setFilter] = useState('')
  const [cookie, setCookie] = useCookies(['auth'])
  const setToken = (token, username) => {
    setCookie('token', token, { path: '/' })
    setCookie('username', username, { path: '/' })
  }

  // Display cart
  const showCart = () => {
    document.getElementById('myCart').classList.toggle('show')
    document.getElementById('cart-btn').classList.toggle('active')
  }

  // Add an item to the cart
  const handleAddToCart = (key) => {
    setCartItems(prevCartItems => [...prevCartItems, currentPage.find(item => item.id === key)])
  }

  const addToCart = cookie.token === '' ? undefined : handleAddToCart

  // Remove item from cart
  const removeFromCart = (key) => {
    const prevCartItems = [...cartItems]
    prevCartItems.splice(key, 1)
    setCartItems(prevCartItems)
  } 

  // Remove all items from cart
  const emptyCart = () => {
    setCartItems([])
  }

  // Get first page of shop items
  useEffect(() => {
    let username = cookie.username
    if(cookie.token === '' || cookie.token === undefined || cookie.token === 'undefined') {
      setIsLogged(false)
      username = ''
    } else {
      setIsLogged(true)
    }
    itemService
      .getPage(`?username=${username}`)
      .then(response => {
        setPages([response.page])
        setMyItems(...response.page.filter(item => item.seller === username))
        setCurrentPage(response.page)
        setCount(response.count)
        setNext(response.next)
        setPrev(response.prev)
      })
      .catch(error => {
        console.log(error)
      })
  }, [cookie])

  const getNext = () => {
    if(next) {
      itemService
      .get(next)
      .then(response => {
        setPages(prevPages => [...prevPages, response.page])
        setCurrentPage(response.page)
        setNext(response.next)
        setPrev(response.prev)
      })
      .catch(error => {
        console.log(error)
      })
    }
  }

  const getPrev = () => {
    if(prev) {
      itemService
      .get(prev)
      .then(response => {
        setPages(prevPages => [...prevPages, response.page])
        setCurrentPage(response.page)
        setNext(response.next)
        setPrev(response.prev)
      })
      .catch(error => {
        console.log(error)
      })
    }
  }

  // Get specific page
  const getPage = (pageNumber, endpoint) => {
    const username = cookie.username === undefined ? '' || cookie.username === 'undefined' : cookie.username
    if(pages[pageNumber-1] !== undefined) {
      setCurrentPage(pages[pageNumber-1])
    } else {
      itemService
      .getPage(`${endpoint}&username=${username}&filter=${filter}`)
      .then(response => {
        setPages(prevPages => [...prevPages, response.page])
        setCurrentPage(response.page)
      })
      .catch(error => {
        console.log(error)
      })
    }
  }

  // Redirect to specified url
  const redirect = (url) => {
    window.location.replace(url)
  }

  // Login user
  const handleLogin = (username, password) => {
    authService
      .signin(username, password)
      .then(response => {
        if(response.status === 200) {
          setToken(response.access, username)
          redirect('/shop')
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
  
  // Signup user
  const handleSignUp = (username, email, password) => {
    authService
      .signup(username, email, password)
      .then(response => {
        if(response.status === 200){
          redirect('/shop')
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  // Signout user
  const handleSignOut = () => {
    setToken('', '')
    redirect('/shop')
  }

  // Update user password
  const handleUpdatePassword = async (newPassword, oldPassword, confirmPassword) => {
    // Confirm old password, if confirmed => update password
    const confirmOldPassword = await authService.signin(cookie.username, oldPassword).then(response => {return response.status === 200})
    if(confirmOldPassword && (newPassword === confirmPassword)) {
      authService
      .update(cookie.username, newPassword)
      .then(response => {
        if(response.status === 200) {
          window.alert(response.message)
          redirect('/shop')
        }
      })
      .catch(error => {
        console.log(error)
      })
    } else {
      window.alert('wrong password')
    }    
  }

  // Add item
  const handleAddItem = (name, price, description, image) => {
    const newItem = {
      name: name,
      price: price,
      description: description,
      image: image,
      username: cookie.username
    }
    itemService
      .create(newItem, cookie)
      .then(response => {
        redirect('/myitems')
      })
      .catch(error => {
        console.error(error)
      })
  }

  // Display form to add item
  const showItemForm = () => {
    document.getElementById('addItem').classList.toggle('show')
    document.getElementById('additem-btn').classList.toggle('active')
  }

  const showEditItemForm = () => {
    document.getElementById('editItem').classList.toggle('show')
  }

  // Return to /shop when logo is clicked
  const handleLogoClick = () => {
    redirect('/shop')
  }

  const arrWindowAlert = (arr) => {
    console.log(arr.length)
    if(arr.length === 1){
      window.alert(`The following item is not available for purchase anymore: ${arr[0]}`)
    } else {
      window.alert(`The following items are no longer available for purchase: ${arr.join(', ')}`)
    }
  }
  
  // Purchase items
  const handlePurchase = (id) => {
    const items = []
    cartItems.forEach(item => items.push(item.id))
    itemService
      .purchase(items, cookie)
      .then(response => {
        if(Array.isArray(response)) {
          arrWindowAlert(response)
        } else {
          redirect('/shop')
        }
      })
      .catch(error => {
        console.log(error.message)
      })
  }

  const handleSearch = (filter) => {
    setFilter(filter)
    itemService
      .getFirstPage(`?filter=${filter}&username=${cookie.username}`)
      .then(response => {
        setPages([response.page])
        setCurrentPage(response.page)
        setCount(response.count)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleEditItem = async (item) => {
    itemService
      .edit(item, cookie.token)
      .then(response => {
        window.alert(response.message)
        redirect('/myitems')
      })
      .catch(error => {
        window.alert(error)
      })
  }
  
  return(
    <div id='App'>
      <h1 className='title'>Luka's Marketplace</h1>
      <BrowserRouter>
        <Header 
          search={handleSearch}
          username={cookie.username}
          isLogged={isLogged} 
          signOut={handleSignOut} 
          items={cartItems} 
          emptyCart={emptyCart} 
          removeFromCart={removeFromCart}
          showCart={showCart}
          handleLogoClick={handleLogoClick} 
          purchaseItems={handlePurchase}
        />
        <Main 
          updatePassword={handleUpdatePassword} 
          signUp={handleSignUp} 
          signIn={handleLogin} 
          page={currentPage} 
          count={count/10} 
          getPage={getPage} 
          addToCart={addToCart}
          addItem={handleAddItem}
          showItemForm={showItemForm}
          username={cookie.username}
          isLogged={isLogged}
          myItems={myItems}
          editItem={handleEditItem}
          showEditItemForm={showEditItemForm}
          getNext={getNext}
          getPrev={getPrev}
        />
      </BrowserRouter>
    </div>
  )
}

export default App;
