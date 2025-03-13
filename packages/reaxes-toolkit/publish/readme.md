# 🚀 基于 `reaxes` 的工具集

## 📦 安装
```sh
$ npm i -S reaxes-toolkit
```
⚠️ **注意:** `reaxes-toolkit` 依赖 `reaxes` 运行，如果未安装 `reaxes`，则会自动安装。

---

## 🎯 `rexaStatus`

🔹 **简介:**  
`rexaStatus` 是基于 `reaxes` 封装的工具，专注于 `pending` & `error` 状态管理。  
✅ **不仅限于 UI 组件，适用于各种场景**  
✅ `status.pending` / `status.error` 可以是任何值,且默认值均为`false`.你可以传入泛型`<P,E>`来约束`pending`和`error`的类型.  

---

### 🛠 在 `reaxel` 中使用
```tsx
//reaxels/user-bio.ts
import { rexaStatus } from 'reaxes-toolkit';
export const reaxel_UserBio = reaxel(() => {
   const { status,setStatus } = rexaStatus();
   const { store , setState , mutate } = createReaxable({
      bio : null as string ,
      status ,
   });
   
   const fetchBio = () => {
      if( store.status.pending ) {
         return;
      }
      new Promise<string>(( resolve , reject ) => {
         setStatus({pending : true});
         setTimeout(() => {
            //Choose which code to comment out to switch different promise results.
            resolve(`I'm an software engineer.`);
            // reject('403 Forbidden');
         } , 2000);
      }).
      then(( bio ) => {
         setState({ bio });
         setStatus({ pending : false , error : false });
      }).catch(e => {
         setStatus({error : e,pending : false})
      });
   };
   const rtn = {
      UserBio_Store : store ,
      UserBio_SetState : setState ,
      UserBio_Mutate : mutate ,
      fetchBio ,
   };
   return () => rtn;
});

//components/UserBio.tsx
import { useEffect } from 'react';
import { reaxel_UserBio } from '../reaxels/user-bio';

export default reaxper(() => {
   const {fetchBio,UserBio_Store} = reaxel_UserBio();
   
   React.useEffect(() => {
      fetchBio();
   } , []);
   
   if(UserBio_Store.status.error){
      return <div>Error Code: {UserBio_Store.status.error}</div>
   }
   if(UserBio_Store.status.pending){
      return <div>pending...</div>
   }
   
   return <div>{ UserBio_Store.bio }</div>;
});
```

---

### 🏗 纯 `React` 示例
```tsx
const Test = reaxper(() => {
   const { current : { status,setStatus } } = useRef(rexaStatus());
   const [ data , setData ] = useState(null);
   
   useEffect(() => {
      fetch(`api.com`).
      then(( data ) => {
         setData(data);
	      setStatus({pending:false});
      }).
      catch(e => {
         setStatus({pending:false,error:e});
      });
   },[]);
   
   if( status.pending ) {
      return <div>pending...</div>;
   }
   
   if( status.error ) {
      return <div>Error!</div>;
   }
   
   return <div>{ data }</div>;
});

import { rexaStatus } from 'reaxes-toolkit';
import { reaxper } from 'reaxes-react';
import { useEffect , useRef , useState } from 'react';
```
