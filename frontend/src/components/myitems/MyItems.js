import Sale from "./Sale"
import Sold from "./Sold"
import Bought from "./Bought"
import AddItemForm from "./AddItemForm"
import EditItemForm from "./EditItemForm"
import itemService from "../../services/items"
import { useState, useEffect } from "react"

const MyItems = (props) => {
  const [myData, setMyData] = useState({page: [], count: 0})
  const [soldData, setSoldData] = useState({page: [], count: 0})
  const [boughtData, setBoughtData] = useState({page: [], count: 0})
  const [activeItem, setActiveItem] = useState('')

  useEffect(() => {
    itemService
      .getFirstPage(`${props.username}/myitems/`)
      .then(response => {
        setMyData(response)
      })
      .catch(error => {
        console.log(error)
      })
    itemService
      .getFirstPage(`${props.username}/sold/`)
      .then(response => {
        setSoldData(response)
      })
      .catch(error => {
        console.log(error)
      })
    itemService
      .getFirstPage(`${props.username}/bought/`)
      .then(response => {
        setBoughtData(response)
      })
      .catch(error => {
        console.log(error)
      })
  },[props.username])

  const updateActiveItem = (item) => {
    setActiveItem(item)
    props.showEditItemForm()
  }
  
  return (
    <div className='my-items'>
      <button id='additem-btn' className='swag-btn swag-border additem-button' onClick={props.showItemForm}>Add Item</button>
      <div className='forms'>
        <AddItemForm addItem={props.addItem}/>
        <EditItemForm item={activeItem} editItem={props.editItem} />
      </div>
      <h2>My Items</h2>
      <Sale isLogged={props.isLogged} editItem={updateActiveItem} data={myData} getPage={() => console.log("ey")} />
      <h2>Sold Items</h2>
      <Sold data={soldData} getPage={() => console.log("ey")} />
      <h2>Bought Items</h2>
      <Bought data={boughtData} getPage={() => console.log("ey")} />
    </div>
  )
}

export default MyItems