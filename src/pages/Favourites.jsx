// modules
import { Link } from 'react-router-dom'
import cl from  '../css/Favourites.module.css'

// icons
import like from '../assets/img/heart-thin.svg'

export default function Favourites(){
   return(
      <div className="section container">
         <div className='catalog-item'>
            <Link to="" className="catalog-item__img">
               <img src="https://pandora.kz/upload/iblock/742/31xdx5xpp6liwioem2lmsej93573npe9.png" alt="" />
            </Link>
            <div className='catalog-item__info'>
               <Link to="https://pandora.kz/262633c01-sergi-s-pozolotoy-kub-oksid-tsirkoniya/" className="catalog-item__title">Серьги «Сверкающий гербарий»</Link>
               <p className="catalog-item__price">67 900 тг</p>
               <button className='carousel__item-btn' onClick={(e)=>console.log('added to favs')}>
                  <img src={like} className='icon-like' color="white" />
               </button>
            </div>
         </div>
      </div>
   )
}