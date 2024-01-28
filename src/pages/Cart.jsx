import { useContext, useEffect, useState } from 'react';
import '../css/Cart.css';
import { Context } from '../context';
import Spinner from '../components/ui/Spinner/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import arrowLeft from '../assets/img/left_arrow_icon.svg';

export default function Cart() {
   const { globalUsername, cartCounter, setCartCounter } = useContext(Context);
   const [isLoading, setIsLoading] = useState(true);
   const [cartContent, setCartContent] = useState([]);

   
   
//  фетчинг с сервера
   // useEffect(() => {
   //    setIsLoading(true);
   //    fetch('http://localhost:5931/cart')
   //       .then(response => {
   //          if (!response.ok) {
   //             throw new Error('Error fetching cart data');
   //          }
   //          return response.json();
   //       })
   //       .then(response => {
   //          const cart = response.filter(item => item['by'] === globalUsername);
   //          setCartContent(cart);
   //       })
   //       .catch(error => {
   //          console.error('Error fetching cart data:', error);
   //       })
   //       .finally(() => setIsLoading(false));
   // }, [globalUsername]);

   // const deleteCartItem = (id) => {
   //    console.log(id);
   //    fetch(`http://localhost:5931/cart/${id}`, {
   //       method: 'DELETE'
   //    })
   //       .then(() => {
   //          setCartContent((prevCartContent) => prevCartContent.filter((item) => item.id !== id));
   //          setCartCounter((prevCounter) => prevCounter - 1);
   //       })
   //       .catch((error) => {
   //          console.error('Error deleting item:', error);
   //       });
   // };



   useEffect(() => {
      setIsLoading(true);
  
      // Получаем текущий список товаров из localStorage
      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  
      // Фильтруем товары, чтобы оставить только те, которые принадлежат текущему пользователю
      const userCartItems = cartItems.filter(item => item.by === globalUsername);
  
      // Устанавливаем состояние корзины
      setCartContent(userCartItems);
      setIsLoading(false);
  }, [globalUsername]);
  
  const deleteCartItem = (id) => {
      // Получаем текущий список товаров из localStorage
      let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  
      // Фильтруем товары, чтобы оставить только те, которые не соответствуют переданному id
      cartItems = cartItems.filter(item => item.id !== id);
  
      // Обновляем данные в localStorage
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
  
      // Обновляем состояние корзины
      setCartContent(prevCartContent => prevCartContent.filter(item => item.id !== id));
  
      // Уменьшаем счетчик корзины
      setCartCounter(() => cartCounter - 1);
  };




  console.log(cartContent);


   const navigate = useNavigate();
   const goBack = () => navigate(-1);

   return (
      <div className="section container" style={{
         height: cartContent.length===0 && '100%'
      }}>
         <div className="cart-wrapper">
            {cartContent.length !== 0 && (
               <div className="cart__left">
                  <button className="cart__left-btn flex align-center smooth" onClick={goBack}>
                     <img src={arrowLeft} alt="" className="icon" style={{ float: 'left' }} color="#fff" />
                     <p style={{ float: 'right' }}>Назад</p>
                  </button>
               </div>
            )}
            {isLoading ? (
               <Spinner />
            ) : cartContent.length !== 0 ? (
               cartContent.map((item, index) => (
                  <div key={index} className="cart-item flex" data-id={item['id']}>
                     <div className="cart-item__image-wrapper">
                        <img src={item['image']} alt="" className="cart-item__image" />
                     </div>
                     <div className="cart-item__info">
                        <Link to={`/catalog/${item['category']}/${item['article']}`} className="cart-item__article">
                           Код товара - #{item['article']}
                        </Link>
                        <Link to={`/catalog/${item['category']}/${item['article']}`} className="cart-item__title">
                           {item['title']}
                        </Link>
                        <p className="cart-item__size">
                           Размер: {item['chosenSize'] ? item['chosenSize'] : 'не выбран'}
                        </p>
                        <p className="cart-item__material">Материал: {item['material']}</p>
                        <button className="cart-item__deletebtn smooth" onClick={() => deleteCartItem(item['id'])}>
                           Удалить
                        </button>
                     </div>
                  </div>
               ))
            ) : (
               <p className="section__title">Корзина пуста</p>
            )}
            {cartContent.length !== 0 && (
               <div className="cart-panel flex justify-end">
                  <button className="cart-panel__btn smooth">Перейти к оформлению</button>
               </div>
            )}
         </div>
      </div>
   );
}
