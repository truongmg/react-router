import useWindowSize from './hooks/useWindowSize'
import { FaLaptop, FaMobileAlt, FaTabletAlt } from 'react-icons/fa'

const Header = ({ title }) => {
  const { width } = useWindowSize();

  return (
    <header className='Header'>
        <h1>{title}</h1>
        { width < 768 ? <FaMobileAlt /> 
          : width < 992 ? <FaTabletAlt />
            : <FaLaptop /> 
        }
    </header>
  )
}

export default Header
