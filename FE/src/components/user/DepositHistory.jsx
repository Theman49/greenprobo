import TransactionHistory from '../DataTable';

export default function DepositHistory() {
    return(
        <div>
            <div className="flex flex-col px-6 py-8 gap-6">
                <div className="flex flex-col gap-1">
                    <p className="text-xl font-bold">Dashboard Nasabah</p>
                    <p className="text-gray-500">Halo Nasabah!</p>
                </div>
                <div className="bg-gray-200 h-[1px]"></div>
            </div>
			<div className="flex flex-col px-6">
				<div className="flex flex-col gap-6 p-4 rounded-xl border-1 border-gray-200 min-h-screen">
                    {
                    /*
					<div className="flex justify-between">
						<p className="text-lg">Riwayat Setoran</p>
						<p className="text-green-900">Lihat Semua</p>
					</div>
                    */}
					<div>
						<TransactionHistory />
					</div>
				</div>
			</div>
        </div>
    )
}