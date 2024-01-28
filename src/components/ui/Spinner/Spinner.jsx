import cl from './Spinner.module.css'

export default function Spinner(props){
   return(
      <div className={cl.wrapper} {...props} style={props}>
         <div className={cl.dot}></div>
         <div className={cl.dot}></div>
         <div className={cl.dot}></div>
      </div>
   )
}