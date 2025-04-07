import { NavLink } from 'react-router-dom';
import TransactionHistory from './DataTable';

export default function ReceiptHistory() {
    return(
        <div>
            <div className="flex flex-col px-6 py-8 gap-6">
                <div className="flex flex-col gap-1">
                    <p className="text-xl font-bold">Riwayat Terima Sampah</p>
                    <p className="text-gray-500">Detail lengkap riwayat penyetoran sampah Anda.</p>
                </div>
                <div className="bg-gray-200 h-[1px]"></div>
            </div>
			<div className="flex flex-col px-6 gap-4">
                <div className="flex justify-end">
                    <NavLink to="/admin/dashboard/receipt-history/add" className="bg-green-900 text-white rounded-full px-4 py-2">+ Terima Sampah Baru</NavLink>
                </div>
				<div className="flex flex-col gap-6 p-4 rounded-xl border-1 border-gray-200 min-h-screen">
					<div>
						<TransactionHistory />
					</div>
				</div>
			</div>
        </div>
    )
}