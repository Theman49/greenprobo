import { NavLink, useLocation, useParams } from 'react-router-dom';
import GridViewIcon from '@mui/icons-material/GridView';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Logo from './assets/LogoDashboard.svg';
import User from './assets/user.svg';


export default function Sidebar(){
	let userType = 'user';
	const url = useLocation();
	if(url.pathname.search('admin/dashboard') >= 0){
		userType = 'admin';
	}

	return(
		<div className="flex flex-col justify-between rounded-r-2xl bg-green-900 p-6 p-3 min-h-full">
			<div className="flex flex-col gap-8 text-white">
	          <div className="flex items-center gap-2">
	            <img alt="Logo Greenprobo" className="h-10 inline" src={Logo}/>
	            <h1 className="text-xl">Greenprobolinggo</h1>
	          </div>

	          {(userType === 'user') ?
		          <div className="flex flex-col gap-1">
			          <p>Menu</p>
			          <div className="flex flex-col gap-1">
			          	<NavLink to="/dashboard" className={`flex items-center gap-1 rounded-full px-3 py-2 hover:bg-white hover:text-green-900 ${(url.pathname === '/dashboard') ? ' bg-white text-green-900' : ''}`}>
			          		<GridViewIcon className="w-[20px] h-[20px]"/>
			          		<p>Dashboard</p>
			          	</NavLink>
			          	<NavLink to="/dashboard/trash-calculator" className={`flex items-center gap-1 rounded-full px-3 py-2 hover:bg-white hover:text-green-900 ${(url.pathname === '/dashboard/trash-calculator') ? ' bg-white text-green-900' : ''}`}>
			          		<CalculateOutlinedIcon className="w-[20px] h-[20px]"/>
			          		<p>Simulasi Penghasilan</p>
			          	</NavLink>
			          	<NavLink to="/dashboard/withdraw" className={`flex items-center gap-1 rounded-full px-3 py-2 hover:bg-white hover:text-green-900 ${(url.pathname === '/dashboard/withdraw') ? ' bg-white text-green-900' : ''}`}>
			          		<AccountBalanceWalletOutlinedIcon className="w-[20px] h-[20px]"/>
			          		<p>Penarikan Tabungan</p>
			          	</NavLink>
			          	<NavLink to="/dashboard/deposit-history" className={`flex items-center gap-1 rounded-full px-3 py-2 hover:bg-white hover:text-green-900 ${(url.pathname.search('/dashboard/deposit-history') >= 0) ? ' bg-white text-green-900' : ''}`}>
			          		<DescriptionOutlinedIcon className="w-[20px] h-[20px]"/>
			          		<p>Riwayat Setoran</p>
			          	</NavLink>
			          	<NavLink to="/dashboard/transaction-history" className={`flex items-center gap-1 rounded-full px-3 py-2 hover:bg-white hover:text-green-900 ${(url.pathname === '/dashboard/transaction-history') ? ' bg-white text-green-900' : ''}`}>
			          		<ReceiptLongOutlinedIcon className="w-[20px] h-[20px]"/>
			          		<p>Riwayat Transaksi</p>
			          	</NavLink>
			          </div>
		          </div>
		      :
		          <div className="flex flex-col gap-1">
			          <p>Menu</p>
			          <div className="flex flex-col gap-1">
			          	<NavLink to="/admin/dashboard" className={`flex items-center gap-1 rounded-full px-3 py-2 hover:bg-white hover:text-green-900 ${url.pathname === '/admin/dashboard' ? 'bg-white text-green-900' : ''}`}>
			          		<GridViewIcon className="w-[20px] h-[20px]"/>
			          		<p>Dashboard</p>
			          	</NavLink>
			          	<NavLink to="/admin/dashboard/receipt-history" className={`flex items-center gap-1 rounded-full px-3 py-2 hover:bg-white hover:text-green-900 ${url.pathname.includes('/admin/dashboard/receipt-history') ? 'bg-white text-green-900' : ''}`}>
			          		<ReceiptLongOutlinedIcon className="w-[20px] h-[20px]"/>
			          		<p>Riwayat Terima Sampah</p>
			          	</NavLink>
			          	<NavLink to="/admin/dashboard/withdraw" className={`flex items-center gap-1 rounded-full px-3 py-2 hover:bg-white hover:text-green-900 ${url.pathname === '/admin/dashboard/withdraw' ? 'bg-white text-green-900' : ''}`}>
			          		<AccountBalanceWalletOutlinedIcon className="w-[20px] h-[20px]"/>
			          		<p>Penarikan Tabungan</p>
			          	</NavLink>
			          	<NavLink to="/admin/dashboard/transaction-history" className={`flex items-center gap-1 rounded-full px-3 py-2 hover:bg-white hover:text-green-900 ${url.pathname === '/admin/dashboard/transaction-history' ? 'bg-white text-green-900' : ''}`}>
			          		<DescriptionOutlinedIcon className="w-[20px] h-[20px]"/>
			          		<p>Riwayat Transaksi</p>
			          	</NavLink>
			          	<NavLink to="/admin/dashboard/user-management" className={`flex items-center gap-1 rounded-full px-3 py-2 hover:bg-white hover:text-green-900 ${url.pathname === '/admin/dashboard/user-management' ? 'bg-white text-green-900' : ''}`}>
			          		<PeopleAltOutlinedIcon className="w-[20px] h-[20px]"/>
			          		<p>Data Nasabah</p>
			          	</NavLink>
			          	<NavLink to="/admin/dashboard/trash-management" className={`flex items-center gap-1 rounded-full px-3 py-2 hover:bg-white hover:text-green-900 ${url.pathname === '/admin/dashboard/trash-management' ? 'bg-white text-green-900' : ''}`}>
			          		<DeleteOutlinedIcon className="w-[20px] h-[20px]"/>
			          		<p>Data Sampah</p>
			          	</NavLink>
			          </div>
		          </div>
		      }
			</div>

			<div className="flex flex-col bg-white rounded-3xl p-3 gap-5">
				<div className="flex gap-1">
					<div className="rounded-full w-[48px] h-[48px]">
						<img src={User} />
					</div>
					<div className="flex flex-col p-1 justify-between">
						<p className="text-xl font-bold">Artena Nagara</p>
						<p>Individu</p>
					</div>
				</div>

				<div className="flex gap-1 items-center text-red-500">
					<LogoutOutlinedIcon className="rotate-y-180"/>
					<NavLink to="/logout">Keluar</NavLink>
				</div>
			</div>
		</div>
	)	
}