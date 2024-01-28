import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import '../css/ItemPage.css'
import Spinner from "../components/ui/Spinner/Spinner";
import { Context } from "../context";
import Breadcrumbs from "../components/ui/Breadcrumbs/Breadcrumbs";

export default function ItemPage(){
   const { globalUsername, cartCounter, setCartCounter } = useContext(Context);
   
   const { id } = useParams();
   const params = useParams();
   const [selectedProduct, setSelectedProduct] = useState(null);
   const [addToCart, setAddToCart] = useState(false);
   const [sizeArr, setSizeArr] = useState([]);
   const [imageArr, setImageArr] = useState([]);
   const [tempSize, setTempSize] = useState(null);

   const [pageLoaded, setPageLoaded] = useState(false);
   
   useEffect(() => {
      window.scrollTo({ top: 0 });

      const fetchData = async () => {
         const response = await fetch(`http://localhost:5931/all`);
         if (!response.ok) {
            throw new Error(response.text);
         }
         const data = await response.json();
         const product = data.find(item => item['article'] === id);
         setSelectedProduct(product);
         if (product && product['size']) {
            setSizeArr(product['size']);
         }
         if (product && product['image']) {
            setImageArr(product['image']);
            setPageLoaded(true)
         }
      };
      fetchData();
   }, [id, params]);
   




   //  делали под фетчинг на сервер, но из-за отсутствия авторизаций пришлось убрать !!!
   // const itemToCart = () => {
   //    setAddToCart(true);
   //    addCartItem()
   // }

   // const addCartItem = () => {
   //    fetch(`http://localhost:5931/cart/`, {
   //    method: "POST",
   //    headers: {
   //       "Content-type": "application/json"
   //    },
   //    body: JSON.stringify({
   //       id: toString(Date.now()),
   //       by: globalUsername,
   //       article: selectedProduct['article'],
   //       image: `https://pandora.kz/${selectedProduct['image'][0]['image-src']}`,
   //       title: selectedProduct['title'],
   //       material: selectedProduct['material'],
   //       link: selectedProduct['link-href'],
   //       chosenSize: tempSize,
   //       price: selectedProduct['price']
   //    })
   // }).then(setCartCounter(parseInt(cartCounter+1)))
   // }



   const itemToCart = () => {
      setAddToCart(true);
      addCartItem();
  }
  
  const addCartItem = () => {
      const cartItem = {
          id: Date.now().toString(),
          by: globalUsername,
          category: selectedProduct['category'],
          article: selectedProduct['article'],
          image: `https://pandora.kz/${selectedProduct['image'][0]['image-src']}`,
          title: selectedProduct['title'],
          material: selectedProduct['material'],
          link: selectedProduct['link-href'],
          chosenSize: tempSize,
          price: selectedProduct['price']
      };
  
      let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      cartItems.push(cartItem);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      setCartCounter(() => cartCounter + 1);
  }
  
   
   
   

   return pageLoaded ? (
      selectedProduct &&
         <div className="section container product-view">

            <Breadcrumbs category={selectedProduct.category} title={selectedProduct.title} />


            <div className="item__inner flex">
               <div className="item__image-wrapper flex">
                  {
                     imageArr.map((item, index)=>{
                        return(
                           <img key={index} src={`https://pandora.kz/${item['image-src']}`} className="item__image" />
                        )
                     })
                  }
               </div>
               <div className="item__info">
                  <p className="item__info-article"> Код артикула № {selectedProduct['article']} </p>
                  
                  <p className="item__info-title">{selectedProduct['title']}</p>
                     {
                        selectedProduct['category'] ? 
                        (
                        <div className="item__info-category flex">
                           <div className="item__info-main-category">
                              <p className="item__info-category-title">Категория</p>
                              <p className="item__info-category-body">
                                 {selectedProduct['category'].charAt(0).toUpperCase() + selectedProduct['category'].slice(1)}
                              </p>
                           </div>
                           <div className="item__info-sub-category">
                              <p className="item__info-category-title">Подкатегория</p>
                              <p className="item__info-category-body">{ selectedProduct['subcategory']  }</p>
                           </div>
                        </div>
                        )
                        :
                        (
                           <div className="item__info-main-category">
                              <p className="item__info-category-title">Назначение</p>
                              <p className="item__info-category-body">{ selectedProduct['subcategory'] }</p>
                           </div>
                        )
                     }
                  {
                     sizeArr.length!==0 &&
                     <p className="item__info__size-title">Доступные размеры</p>
                  }
                  <div className="item__info__size-wrapper flex ">
                     {
                        sizeArr.map((item, index) => (
                           !Number.isNaN(+item.size) && (
                              <button
                                 key={index}
                                 className={tempSize === +item.size ? "item__info__size size-chosen smooth" : "item__info__size smooth"}
                                 onClick={() => setTempSize(+item.size)}
                                 disabled={addToCart}
                              >
                                 {+item.size}
                              </button>
                           )
                         ))
                     }
                  </div>
                  <p className="item__info-price">{selectedProduct['price']}</p>
                  <div className="item__info-cart flex flex-reverse align-center justify-start">
                     <button 
                        disabled={addToCart} 
                        className="item__info-cartbtn smooth" 
                        onClick={() => itemToCart(
                           selectedProduct['id'],
                           globalUsername,
                           selectedProduct['article'],
                           selectedProduct['image'][0]['image-src'],
                           selectedProduct['title'],
                           selectedProduct['material'],
                           selectedProduct['link-href'],
                           tempSize,
                           selectedProduct['price']
                        )}
                     >
                        Добавить в корзину
                     </button>
                     <button className={addToCart ? "item__info-success smooth addedToCart" : "item__info-success smooth"}>
                        Товар успешно добавлен в корзину
                     </button>
                  </div>
               </div>
            </div>

            <div className="item__details flex-col">
               
               <div className="item__details-inner flex justify-between align-center">
                  <p className="item__details-title">Металл</p>
                  <p className="item__details-body">{ selectedProduct['metall'] }</p>
               </div>
               <div className="item__details-inner flex justify-between align-center">
                  <p className="item__details-title">Материал</p>
                  <p className="item__details-body">{ selectedProduct['material'] }</p>
               </div>
               <div className="item__details-inner flex justify-between align-center">
                  <p className="item__details-title">Вставка</p>
                  <p className="item__details-body">{ selectedProduct['vstavka'] }</p>
               </div>
               <div className="item__details-inner flex justify-between align-center">
                  <p className="item__details-title">Концепция</p>
                  <p className="item__details-body">{ selectedProduct['concept'] }</p>
               </div>

               {
                  selectedProduct['collection'] &&
                  <div className="item__details-inner flex justify-between align-center">
                     <p className="item__details-title">Коллекция</p>
                     <p className="item__details-body">{ selectedProduct['collection'] }</p>
                  </div>
               }
               
            </div>
         </div>
   )
   :
   <div className="page-loading flex justify-center align-center" >
      {
         <Spinner />
      }
   </div>
}