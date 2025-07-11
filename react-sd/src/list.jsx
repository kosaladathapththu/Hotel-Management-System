function ListGroup(){
    const items=['colombo','gampaha','galle','matara'];
    
    return(
        <>
        <h1>List Group</h1>
        <ul className="ListGroup">
            {items.map(item=> <li key={item}>{item}</li>)}
        </ul>
        </>
    )
}
export default ListGroup