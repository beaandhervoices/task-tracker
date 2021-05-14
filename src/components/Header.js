import PropTypes from 'prop-types'
//En lugar de {props}, especifico más si pongo {title}
const Header = ({title}) => {
    return (
        <header className='header'>
          <h1>{title}</h1> 
          <button className="btn">Add</button>
        </header>
    )
}
 //Pone este título por defecto
Header.defaultProps = {
    title: 'Task Tracker'
}
 //Para especificar qué tipo de props
Header.propTypes = {
    title: PropTypes.string
}

//CSS in JS
// const headingStyle = {color:'red', backgroundColor:'black'}
export default Header
