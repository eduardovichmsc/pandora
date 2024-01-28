import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Spinner from "../components/ui/Spinner/Spinner";
import like from '../assets/img/heart-thin.svg'
import Breadcrumbs from "../components/ui/Breadcrumbs/Breadcrumbs";
import { Context } from "../context";

export default function CatalogSingle(){
   const { limitCount } = useContext(Context);

   const [products, setProducts] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [pageLoaded, setPageLoaded] = useState(false);

   const [startIndex, setStartIndex] = useState(0);
   const [limit, setLimit] = useState(limitCount);
   const [totalPageCount, setTotalPageCount] = useState(limit);

   // const [totalItemCount, setTotalItemCount] = useState(0);
   
   const [uniqueCategories, setUniqueCategories] = useState([]);   
   let [fetchSort, setFetchSort] = useState('');

   let { category } = useParams(); // выбранная категория
   const categoryURI = encodeURIComponent(category); // превращает кириллицу в код

   // пагиниций кнопки
   const nextPage = () => {
   setStartIndex(startIndex + limit);
   };
   const prevPage = () => {
   setStartIndex(startIndex - limit);
   };

   // x-total-count - для пагинаций
   useEffect(()=>{
      fetch(`http://localhost:5931/all?category=${categoryURI}`)
         .then(response=>response.json())
         .then(response=>{
            setTotalPageCount(Math.ceil(response.length/limit));
         })
         .then(console.log(`totalPageCount --- ${totalPageCount}`))
   }, [limit, products, totalPageCount]);


   // переход между страницами каталога
   useEffect(()=>{
      setStartIndex(0);
      setFetchSort('');
   }, [category])


   // данные из сервера
   useEffect(() => {
      setIsLoading(true);
      fetch(`http://localhost:5931/all?category=${categoryURI}&_start=${startIndex}&_limit=${limit}${fetchSort}`, {
         
      })
         .then(response => {
            if (!response.ok) {
               return;
            }
            console.log(response);
            return response.json();
         })
         .then(response => {
            setProducts(response);
            setUniqueCategories([...new Set(response.map(item => item.category))]);
         })
         .finally(() => {
            setIsLoading(false);
            setPageLoaded(true);
         });
   }, [categoryURI, limit, startIndex, fetchSort]);

   const handleFav = (id) => {      
      let favItems = JSON.parse(localStorage.getItem('favItems')) || [];

      fetch(`http://localhost:5931/all`)
      .then(response=>response.json())
      .then(products=>products.find(item=>item['id']===id))
      // .then(response=>{
         // localStorage.
         // })
      .then(response=>{
         favItems.push(response);
         localStorage.setItem('favItems')
      })
      .then(console.log(favItems));
   }

   return pageLoaded ? (
      <div className="section container catalogItem-wrapper flex flex-col" style={{
         height: products.length===0 && '100%'
      }} >

         <Breadcrumbs title={category} />

         <div className='grid catalog__panel-grid'>
            <h1 className='catalog__panel-item section-title'>{ category }</h1>
            <p className='catalog__panel-item section-body'></p>

            {/* пагинация */}
            <div className='pagination'>
               <button className="pagination-item smooth" onClick={prevPage} disabled={startIndex<1}>предыдущая</button>
               <button className="pagination-item smooth" onClick={nextPage} disabled={ (startIndex/limit===totalPageCount-1) || (products.length === 0 ? true : false) } >следующая</button>
            </div>
            
         </div>
         <div className='filter'>

            <div className="filter__topbar flex align-center">
               <button className='filter-open'>Filters (3)</button>
               <select onChange={(e) => setFetchSort(e.target.value)} name="" id="" 
                  className='filter-select' defaultValue='' 
                  value={fetchSort}
                  disabled={products.length===0 ? true : false}
               >
                  <option value=''>Без сортировки</option>
                  <option value='&_sort=article'>Артикул</option>
                  <option value='&_sort=price'>Цена</option>
               </select>
            </div>
            <div className='filter__content grid' style={{display: 'none'}}>
               <div className="filter__content-item">
                  <p className='filter-title'>Металлы</p>
                  <form className='filter__content-item__inner flex-col'>

                     {uniqueCategories.map((item, index)=>
                     <div key={index} className='flex align-center' style={{gap: '1em'}}>
                        <input type='checkbox' name={ item } className='filter-checkbox' />
                        <label htmlFor={ item }>{ item }</label>
                     </div>
                     )}
                     
                  </form>
               </div>
               <div className='filter__content-item'></div>
               <div className='filter__content-item'></div>
               <div className='filter__content-item'></div>
               <div className='filter__content-item flex align-start justify-end' style={{gridArea: '2 / 1 / 3 / 5'}}>
                  <button className='filter__close-btn smooth flex justify-center align-center'>
                     Закрыть
                  </button>
               </div>
            </div>
         </div>

         {
               !isLoading &&
               <div className='catalog-flexbox flex'>
               {products.map((item, index)=>{
                  return(
                     <div key={index} className='catalog-item' data-product-id={item['article']}>
                        {item.image.map((image, index)=>{
                           if(index === 0){
                              return(
                                 <Link key={index} to={`/catalog/${item['category']}/${item['article']}`} className="catalog-item__img">
                                    <img src={image['image-src'] ? `https://pandora.kz/${image['image-src']}` : 'https://placehold.co/400x400'} alt="" />
                                 </Link>
                              )
                           }
                        })}
                        <div className='catalog-item__info'>
                           <Link to={`/catalog/item/${item['article']}`} className="catalog-item__title">{item['title']}</Link>
                           <p className="catalog-item__price">{item['price']}</p>
                           <button 
                              className='carousel__item-btn' 
                              onClick={(e)=>{
                                 e.preventDefault();
                                 handleFav(item['id']);
                              }}
                           >
                              <img src={like} className='icon-like' color="white" />
                           </button> 
                        </div>
                     </div>
                  )
               })}
               {products.length === 0 && 
                  <div className="page-fetch-error flex justify-center align-start">
                     <span>
                        Данные раздела "{category}" не найдены. 
                        <a href="mailto:eduardovdarzhan@gmail.com">Сообщите об этой ошибке!</a>
                     </span>
                  </div>
               }
            </div>
         }
{
   console.log(`
   isLoading: ${isLoading}
   pageLoaded: ${pageLoaded}
   `)
}
      </div>
   )
   : 
   // <div className="page-loading flex justify-center align-center">
      // { !isLoading || <Spinner id='spinner' margin='10em 0' />}
      !isLoading || <Spinner id='spinner' margin='10em 0' />
   // </div>
}