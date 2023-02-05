import Item from './Item'
import PageNavBar from './PageNavBar'

const Items = (props) => {  
  return (
    <div className='swag-border items-container'>
      <div className='items'>
        {props.page.map((item) =>
          <Item 
            key={item.id}
            item={item}
            addToCart={props.addToCart}
            editItem={props.editItem}
            isLogged={props.isLogged}
          />
        )}
      </div>
      <PageNavBar count={props.count} getPage={props.getPage} getNext={props.getNext} getPrev={props.getPrev} />
    </div>
  )
}

export default Items