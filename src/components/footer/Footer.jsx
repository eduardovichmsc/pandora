import './Footer.css'

export default function Footer(){
   return(
      <footer>
         <div className="container footer-wrapper grid">
            <div className="footer-item">
               <h1 className="logo footer__logo">Pandora</h1>
               <p className="footer__body">Официальный представитель в Казахстане <br />ТОО "Амадео Центральная Азия"</p>
            </div>

            <div className='footer-item flex-col'>
               <p className='footer__title'>Информация</p>
               <div className='footer__nav flex-col'>
                  <a href='/' className='footer__nav-item'>О компаний</a>
                  <a href='/' className='footer__nav-item'>Магазины</a>
                  <a href='/' className='footer__nav-item'>Политика</a>
                  <a href='/' className='footer__nav-item'>Контакты</a>
                  <a href='/' className='footer__nav-item'>Новости</a>
               </div>
            </div>
            
            <div className='footer-item flex-col'>
               <p className='footer__title'>Сервис</p>
               <div className='footer__nav flex-col'>
                  <a href='/' className='footer__nav-item'>Доставка</a>
                  <a href='/' className='footer__nav-item'>Оплата</a>
                  <a href='/' className='footer__nav-item'>Возвраты / Гарантия</a>
                  <a href='/' className='footer__nav-item'>Промокд</a>
                  <a href='/' className='footer__nav-item'>Бонусный клуб</a>
                  <a href='/' className='footer__nav-item'>Рассрочка</a>
               </div>
            </div>

            <div className='footer-item flex-col'>
               <p className='footer__title'>Помощь</p>
               <div className='footer__nav flex-col'>
                  <a href='/' className='footer__nav-item'>Вопрос - ответ</a>
                  <a href='/' className='footer__nav-item'>Таблица размеров</a>
                  <a href='/' className='footer__nav-item'>Хранение и уход</a>
                  <a href='/' className='footer__nav-item'>О бренде Pandora</a>
               </div>
            </div>

            <div className='footer__lowbar'>
               <div className='divider footer__divider'></div>
               <p style={{float: 'left'}}> Выше использованные материалы принадлежать официальным представителям </p>
               <a href='https://github.com/eduardovichmsc' className='darzhan smooth'>made by darzhan eduarduly. </a>
            </div>
         </div>
      </footer>
   )
}