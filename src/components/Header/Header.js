import './Header.css'
import { Link, useLocation } from "react-router-dom";
import Navigation from '../Navigation/Navigation';

export default function Header({ name, isLoggedIn }) {
  const { pathname } = useLocation()

  return (
    <header className={`header ${pathname === '/' ? '' : 'header_type_page'}`}>
      <div>
        {pathname === '/signin' || pathname === '/signup' ? <></> :
        <Link to={'/'} className="header__link-home"></Link>}
      </div>
      <Navigation isLoggedIn={isLoggedIn}/>
    </header>
  )
}