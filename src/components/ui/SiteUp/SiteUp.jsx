import cl from './SiteUp.module.css';
import arrowUp from '../../../assets/img/up_arrow_icon.svg';
import { useEffect, useState } from 'react';
export default function SiteUp({ scrollHeight }){
   const [isVisible, setIsVisible] = useState(false);
   
   useEffect(() => {
      const handleScroll = () => {
          if (window.scrollY > y) {
              setIsVisible(true);
          } else {
              setIsVisible(false);
          }
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  }, [scrollHeight]);

  const scrollToTop = () => {
      window.scrollTo({
          top: 0,
          behavior: 'smooth',
      });
  };
   
   return(
      <button 
         className={`${cl['site-up']} smooth ${isVisible ? cl['visible'] : ''}`} 
         onClick={scrollToTop}
         disabled={isVisible ? false : true}
      >
         <img src={arrowUp} />
      </button>
   )
}