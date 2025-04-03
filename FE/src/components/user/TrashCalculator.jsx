export default function TrashCalculator(){
    return(
        <div>
			<div className="flex flex-col px-6 py-8 gap-6">
				<div className="flex flex-col gap-1">
					<p className="text-xl font-bold">Hitung Nilai Sampah Anda</p>
					<p className="text-gray-500">Estimasi nilai sampah Anda sebelum disetorkan.</p>
				</div>
				<div className="bg-gray-200 h-[1px]"></div>
			</div>

            <div className="flex flex-col gap-6 p-4 rounded-xl border-1 border-gray-200 w-1/3">
                <h1>
                    calculator
                </h1>
            </div>
        </div>
    )
}