import like from '../../assets/img/heart-thin.svg'
import basket from '../../assets/img/basket-thin.svg'
import search from '../../assets/img/search-thin.svg'

import { Link } from 'react-router-dom'
import { useContext } from 'react'

import './Header.css'
import { Context } from '../../context'

export default function Header() {
  
  const { globalUsername, cartCounter, favsCounter } = useContext(Context);
  
  
  return(
     <header>
        <div className="container header__topbar">
          <span className="header__topbar-item">
          </span>
          <div className="header__topbar-item header__logo">
            <Link to="/" className='logo'> Pandora </Link>
          </div>
          <span className='header__topbar-item'>
          </span>

          {/* <div className='header__topbar-item header__signin'>
            {globalUsername ? 
            <Link to='/profile' className='header__signin-link'>
              { 'Перейти в профиль' }
            </Link>
            :
            <Link to='/login' className='header__signin-link'>
              Войти в аккаунт
            </Link>
            }
          </div> */}

        </div>

        <div className="container header__lowbar flex justify-between align-center">
          <div className="header__search flex">
            <img src={search} alt='search' className='icon-search' />
            <input type="text" placeholder='Example, a ring' />
          </div>

          <nav className='header__nav header__lowbar-item flex justify-center'>
            <Link to='/catalog/кольца' className='header__nav-item'>Кольца</Link>
            <Link to='/catalog/серьги' className='header__nav-item'>Серьги</Link>
            <Link to='/catalog/браслеты' className='header__nav-item'>Браслеты</Link>
            <Link to='/catalog/колье' className='header__nav-item'>Колье</Link>
            <Link to='/catalog/наборы' className='header__nav-item'>Наборы</Link>
            <Link to='/catalog/коллекций' className='header__nav-item'>Коллекций</Link>
          </nav>

          <div className='header__panel header__lowbar-item flex justify-end'>
            <Link to='/favs' className='header__panel-item header__lowbar-item flex justify-center align-center'>
              <img src={like} className='icon header__icon icon-like' />

              {favsCounter !==0 &&
                <div className='panel-item__counter flex justify-center align-center'>
                  <p> { favsCounter }</p>
                </div>
              }

            </Link>
            <Link to='/cart' className='header__panel-item header__lowbar-item flex justify-center align-center'>
              <img src={basket} className='icon header__icon icon-basket nav-icon' />
              <div className='panel-item__counter flex justify-center align-center'>
                <p> { cartCounter }</p>
              </div>
            </Link>
          </div>
        </div>

        <div className='divider header__divider' />
        
    </header> 
  )
}