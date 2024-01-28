import '../css/Home.css'
import like from '../assets/img/heart-thin.svg'
import { Link } from 'react-router-dom'


export default function Home(){

   const sectionNewObj = [
      {
         title: 'Серьги-кольца Асимметричные сердца любви',
         image: 'https://pandora.kz/upload/iblock/950/950ce063c9013a38752551b787d293ab.png',
         price: '27 900 тг'
      },
      {
         title: 'Колье Возвышенное сердце',
         image: 'https://pandora.kz/upload/iblock/e59/e59c4bebb59fe9a2a191d2af0ed3c5fb.png',
         price: '47 900 тг'
      },
      {
         title: 'Браслет Pandora Moments Маргаритка',
         image: 'https://pandora.kz/upload/iblock/c07/c0740ae6434d8f1c5e0ce8d5de270306.png',
         price: '42 900 тг'
      },
      {
         title: 'Браслет Pandora Reflexions c застежкой паве',
         image: 'https://pandora.kz/upload/iblock/590/5904c1f4ddfbcdbf3e837953f7a8ad7e.png',
         price: '99 900 тг'
      }
   ]

   const sectionCollectionObj = [
      {
         image: 'https://cdn.sokolov.ru/upload/content/area/483b75e868315fe3f115294fd9211f52.jpg',
         title: 'SVOBODA',
      },
      {
         image: 'https://cdn.sokolov.ru/upload/content/area/78a65a1b3dd29a0dac4e37d4f9855895.jpg',
         title: 'Russe',
      },
      {
         image: 'https://cdn.sokolov.ru/upload/content/area/c36ee686cfbd658ec0c82df17f6be36c.jpg',
         title: 'AW 2023/2024',
      },
      {
         image: 'https://cdn.sokolov.ru/upload/content/area/a9e50519c9c7685cf61ffbac86c8a7d0.jpg',
         title: 'Just for me',
      }
   ]
   
   return(
      <>
      
      <div className='banner'>
         <img src="https://pandora.kz/upload/iblock/68b/nvpu6s63zyfseo3c251rvy8uh80pxn6h.jpg" alt="" />
      </div>
      
         <section className='container section'>
            <div className='grid new-panel__grid'>
               <p className='section-title'>Новинки</p>
               <p className='section-body'>
                  Создайте свое настроение с украшениями из новой коллекции. Ваш стиль - ваша подпись.
               </p>
               <span></span>
               <div className='new-panel__control'>
                  <button className='arrow smooth'></button>
                  <span>1/<span style={{color: 'var(--grey)'}}>3</span></span>
                  <button className='arrow smooth'></button>
               </div>

               <div className="carousel flex justify-between">

                  {
                     sectionNewObj.map((item, index)=>
                        <div key={index} className='carousel__item' data-collection={index}>
                           <div className='carousel__item-img'>
                              <img src={item.image} alt='/' />
                           </div>
                           <div className='carousel__item-info'>
                              <p className='carousel__item-title'>{item.title}</p>
                              <p className='carousel__item-price'>{item.price}</p>
                              <button className='carousel__item-btn' onClick={(e)=>console.log('added to favs')}>
                                 <img src={like} className='icon-like' />
                              </button> 
                           </div>
                        </div>
                     )
                  }

                  {/* ... место для контента ... */}
                  
               </div>
               
               <div className='section-link'>
                  <Link to='/catalog'>посмотреть все украшения</Link>
               </div>
            </div>
         </section>

         <section className='container section'>
            <div className="grid collections-panel__grid">
               <div className="collections__item">
                  <p className="section-title">Коллекция</p>
                  <p className='section-body'>
                     Стильные коллаборации с известными брендами, где каждый найдет себе украшение по вкусу.
                  </p>
               </div>

               {
                  sectionCollectionObj.map((item, index)=>
                     <div key={index} className='collections__item'>
                        <img src={item.image} alt={item.title} />
                        <p className="collection-title"> { item.title } </p>
                     </div>
                  )
               }

               <div className='collections__item flex justify-end align-end'>
                  <a href='/collections' className="collection-title"> Посмотреть все коллекций </a>
               </div>
               
               {/* ... место для контента ... */}
               
            </div>
         </section>

      
      </>
   )
}