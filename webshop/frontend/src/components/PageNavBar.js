const PageNavBar = (props) => {
    const buttons = []
    for(let i = 0; i < props.count; i++) {
        buttons.push(
            <button className='swag-border swag-btn' key={i+1} onClick={() => props.getPage(i+1, `?page=${i+1}`)}>{i+1}</button>
        )
    }
    const prev = '<<'
    const next = '>>'
    return (
        <div className='page-nv swag-border'>
            <button className='swag-border swag-btn' onClick={props.getPrev} >{prev}</button>
            {buttons}
            <button className='swag-border swag-btn' onClick={props.getNext} >{next}</button>
        </div>
    )
}

export default PageNavBar