import { NavLink, useLocation } from 'react-router-dom';
import {
  GridView as GridViewIcon,
  CalculateOutlined as CalculateIcon,
  AccountBalanceWalletOutlined as WalletIcon,
  DescriptionOutlined as DescriptionIcon,
  ReceiptLongOutlined as ReceiptIcon,
  LogoutOutlined as LogoutIcon,
  PeopleAltOutlined as PeopleIcon,
  DeleteOutlined as DeleteIcon,
} from '@mui/icons-material';
import Logo from './assets/LogoDashboard.svg';

export default function Sidebar() {
  const { pathname } = useLocation();
  const isAdmin = pathname.includes('admin/dashboard');

  const userMenus = [
    { path: '/dashboard', label: 'Dashboard', icon: <GridViewIcon fontSize="small" /> },
    { path: '/dashboard/trash-calculator', label: 'Simulasi Penghasilan', icon: <CalculateIcon fontSize="small" /> },
    { path: '/dashboard/withdraw', label: 'Penarikan Tabungan', icon: <WalletIcon fontSize="small" /> },
    { path: '/dashboard/deposit-history', label: 'Riwayat Setoran', icon: <DescriptionIcon fontSize="small" /> },
    { path: '/dashboard/transaction-history', label: 'Riwayat Transaksi', icon: <ReceiptIcon fontSize="small" /> },
  ];

  const adminMenus = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: <GridViewIcon fontSize="small" /> },
    { path: '/admin/dashboard/receipt-history', label: 'Riwayat Terima Sampah', icon: <ReceiptIcon fontSize="small" /> },
    { path: '/admin/dashboard/withdraw', label: 'Penarikan Tabungan', icon: <WalletIcon fontSize="small" /> },
    { path: '/admin/dashboard/transaction-history', label: 'Riwayat Transaksi', icon: <DescriptionIcon fontSize="small" /> },
    { path: '/admin/dashboard/customer-management', label: 'Data Nasabah', icon: <PeopleIcon fontSize="small" /> },
    { path: '/admin/dashboard/trash-management', label: 'Data Sampah', icon: <DeleteIcon fontSize="small" /> },
  ];

  const menus = isAdmin ? adminMenus : userMenus;

  return (
    <div className="flex flex-col justify-between rounded-r-2xl bg-green-900 p-6 min-h-full text-white">
      {/* Header */}
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-2">
          <img alt="Logo Greenprobo" src={Logo} className="h-10" />
          <h1 className="text-xl font-semibold">Greenprobolinggo</h1>
        </div>

        {/* Menu */}
        <div className="flex flex-col gap-4">
          <p>Menu</p>
          <div className="flex flex-col gap-2">
            {menus.map(({ path, label, icon }) => (
              <NavLink
                key={path}
                to={path}
                className={`flex items-center gap-2 rounded-full px-3 py-2 hover:bg-white hover:text-green-900 transition-all duration-200 ${
                  pathname === path ? 'bg-white text-green-900' : ''
                }`}
              >
                <div className="flex items-center justify-center w-[20px] h-[20px]">{icon}</div>
                <p className="font-semibold text-base">{label}</p>
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col bg-white rounded-md p-3 gap-5 text-green-900">
        <div>
          <p className="text-xl font-bold text-black">Artena Nagara</p>
          <p className="text-gray-700 font-medium">Individu</p>
        </div>
        <div className="flex gap-2 items-center text-red-500">
          <LogoutIcon />
          <NavLink to="/logout">Keluar</NavLink>
        </div>
      </div>
    </div>
  );
}
