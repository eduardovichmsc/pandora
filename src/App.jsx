import './assets/fonts.css'
import './css/App.css'
import './css/stylesheet.css'
import './css/icons.css'

import {Routes, Route, useFetcher} from 'react-router-dom'

import Layout from './pages/Layout'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import CatalogSingle from './pages/CatalogSingle'
import Login from './pages/Login'
import ItemPage from './pages/ItemPage'
import { useState, useEffect } from 'react'
import { Context } from './context'
import NotFound from './pages/NotFound'
import Cart from './pages/Cart'
import Favourites from './pages/Favourites'

function App() {
  
  const initializeState = useState('');
  const [globalUsername, setGlobalUsername] = localStorage.getItem('activeUser') || initializeState;

  const [cartCounter, setCartCounter] = useState(0);
  useEffect(()=>{
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (cartItems) {
        setCartCounter(cartItems.length);
    }
  }, [cartCounter])
  
  const [favsCounter, setFavsCounter] = useState(0);
  const limitCount = 12;

  useEffect(()=>{
    fetch('http://localhost:5931/cart')
       .then(response=>{
          if(!response.ok){
             throw new Error(Error)
          }
          return response.json();
       })
       .then(response=>{
          const cart = response.filter(item=>item['by'] === globalUsername)
          setCartCounter(cart.length)
       })
 }, [globalUsername])

  return (
    <>
      <Context.Provider value={{
        globalUsername, setGlobalUsername, cartCounter, setCartCounter, favsCounter, setFavsCounter, limitCount
      }}>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path='/home' element={<Home />}></Route>
            <Route path='/catalog' element={<Catalog />}></Route>
            <Route path='/catalog/:category' element={<CatalogSingle />}></Route>
            <Route path='/catalog/:category/:id' element={<ItemPage />}></Route>
            {/* <Route path='/login' element={<Login />}></Route> */}
            <Route path='/favs' element={<Favourites />}></Route>
            <Route path='/cart' element={<Cart />}></Route>
            <Route path='*' element={<NotFound />} ></Route>
          </Route>
        </Routes>
      </Context.Provider>
    </>
  )
}

export default App