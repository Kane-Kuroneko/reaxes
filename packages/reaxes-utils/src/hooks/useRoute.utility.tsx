export const useRouter = () => {
	return {
		navigate : useNavigate() ,
		params : useParams() ,
		location : useLocation() ,
	};
};

export const withOutlet = ( ReactElement:React.ReactElement ) => {
	return <>
		{ReactElement}
		<Outlet />
	</>;
};
import {
	useLocation ,
	useNavigate ,
	useParams ,
	Outlet,
} from 'react-router-dom';
