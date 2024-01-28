import '../css/Catalog.css'
export default function NotFound(){
   return(
      <div className='section container' style={{
         height: '31.9vh'
      }}>
         <p className="flex-col justify-center align-center" style={{
            gap: '0em'
         }}>
            <span style={{
               fontWeight: 500,
               lineHeight: '0em',
               fontSize: '1.4em'
               }}>#404</span>
            <br />
            <span style={{
               fontSize: '1.2em',
               fontWeight: '400'
            }}>
               Данная страница не найдена
            </span>
         </p>
      </div>
   )
}