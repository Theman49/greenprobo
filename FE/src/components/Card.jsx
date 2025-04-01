export default function Card({imageSrc}){
	return(
		<div className="flex flex-col rounded-2xl bg-white p-5">
			<img src={imageSrc} className="rounded-xl" />
			<div className="flex flex-col p-4">
				<p className="text-gray-500">10 Menit Baca</p>
				<p className="text-xl">Bank Sampah: Konsep dan Peran dalam Pengelolaan Lingkungan</p>
				<p className="text-gray-500">Bank Sampah merupakan inovasi dalam pengelolaan sampah yang menggabungkan prinsip lingkungan dan ekonomi.</p>
			</div>
			<p className="text-gray-500 text-right mt-5">24 Desember 2024</p>
		</div>
	);
}