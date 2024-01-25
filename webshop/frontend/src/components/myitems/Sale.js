import Items from "../Items"

const Sale = (props) => {
  const items = props.data.page.length > 0 
  ? <Items isLogged={props.isLogged} editItem={props.editItem} page={props.data.page} count={props.data.count/10} getPage={props.getPage} />
  : <h3 className="swag-border placeholder">Sorry, there seems to be nothing here...</h3>

  return (
    <div className='user-items'>
      {items}
    </div>
  )
}

export default Sale