import { Reaxlass , Reaxper , orzMobx , Reaxes } from 'reaxes';

export const Counter = Reaxper( class extends Reaxlass {
   
   reax_counter = reaxel_counter();
   
   render() {
      const {count , setCount} = this.reax_counter;
      
      return <>
         <p>current count : { count }</p>
         <button onClick = { () => setCount( count + 1 ) }>
            click me
         </button>
      </>;
   }
} );


export const reaxel_user_login = function () {
   
   const {store ,setState} = orzMobx( {
      user_account : null ,
      user_token : null ,
      user_info : null,
   } );
   
   const login = () => {
      return new Promise<any>( ( resolve ) => {
         setTimeout( () => resolve( {
            user_account : "xxx@gmail.com" ,
            user_token : "9d8as9vasd" ,
            user_info : {
               name : "papa" ,
               age : 19,
            } ,
         } ) );
      } ).then( ( res ) => {
         setState( { ...res } );
      } );
   }
   
   return () => {
      
      return {
         get user_store() {
            return store;
         },
         login,
      };
   };
}();




// 反向继承
const Wrapper = (Component) => {
   
   
   return class extends Component {
   
      render(){
      
      }
   }
}


const Sub = class extends React.Component{


}


//属性代理

const Parent = class extends React.Component{

   render() {
      return <Child/>;
   }
}

const Child = class extends React.Component{
   
   componentDidMount() {
   
   }
   
   render() {
      return <></>;
   }
}