import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Dashboard() {
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