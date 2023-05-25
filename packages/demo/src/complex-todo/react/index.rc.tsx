const {store,setState} = orzMobx({
	userinfo : {
		username:"",
		
	},
	userlist : [
		{
			
		},
	],
	selected : ["58a68284","159e"],
	lists : [
		{
			title : "今日待办",
			id : "58a68284",
			tasks : [
				{
					status : "todo",
					id : "159e",
					title : "来一发吧",
					detail : "biubiubiu",
				},
			],
		}
	],
});

export const RC_Complex_Todo = reaxper(() => {
	
	const { user_list , user_id } = reaxel_user();
	const {} = reaxel_remote();
	return <div>
	
	</div>; 
}); 

const List = () => {
	
	return <aside>
		<ul>
			
		</ul>
	</aside>;
};

const Login = () => {
	return <div>
	
	</div>;
};

const Register = () => {
	return <div>
	
	</div>;
};
	
import {reaxper} from 'reaxes-react';
import { reaxel_user , reaxel_remote } from '../--reaxel--';
import less from './index.module.less';
