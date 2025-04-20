import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
const navigate = useNavigate();
  const getSession = useSelector((state) => state.session);

  useEffect(() => {
	if(getSession.isLogin === false){
		alert("You're not authorized, please login");
		navigate('/login')
	}

  },[])
	return(
		<div className="flex">
			<div className="h-screen w-1/5">
				<Sidebar />
			</div>
			<div className="h-screen w-full overflow-auto">
				<Outlet />
			</div>
		</div>
	);
}