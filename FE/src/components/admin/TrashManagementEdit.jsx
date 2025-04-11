import { useLocation } from "react-router-dom"
import { NumericFormat } from "react-number-format";

export default function TrashManagementEdit() {
    const location = useLocation();

    const handleEdit = () => {
        console.log('EDIT')
    }

    return( 
        <div>
            <div className="flex flex-col px-6 py-8 gap-6">
                <div className="flex flex-col gap-1">
                    <p className="text-xl font-bold">Edit Data Sampah</p>
                    <p className="text-gray-500">Detail lengkap riwayat penyetoran sampah Anda</p>
                </div>
                <div className="bg-gray-200 h-[1px]"></div>
            </div>
            <div className="flex px-6">
                <div className="flex flex-col gap-6 p-4 rounded-xl border-1 border-gray-300 w-1/3 h-fit">
                    <div className="flex justify-between items-center">
                        <p className="text-xl">Detail Sampah</p>
                        <p className="text text-red-500 hover:cursor-pointer">Hapus Data</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-1">
                            <p className="text-xl">Kode Sampah</p>
                            <p className="p-3 rounded-lg border-1 bg-gray-100 border-gray-300 text-gray-500 w-full">{location.state?.trashCode}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-xl">Nama Sampah</p>
                            <p className="p-3 rounded-lg border-1 bg-gray-100 border-gray-300 text-gray-500 w-full">{location.state?.trashName}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-xl">Jenis Sampah</p>
                            <p className="p-3 rounded-lg border-1 bg-gray-100 border-gray-300 text-gray-500 w-full">{location.state?.trashType}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-xl">Harga Sampah</p>
                            <div className="flex items-center rounded-lg border-1 bg-gray-100 text-gray-500 border-gray-300 w-full">
                                <div className="bg-gray-300 p-2 rounded-md">
                                    Rp
                                </div>
                                <div className="pl-1 w-full">
                                    <NumericFormat value={`${location.state?.trashFee}`} thousandSeparator="," className="w-full readonly"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <div onClick={handleEdit} className="flex gap-1 items-center px-4 py-2 justify-end rounded-full border-1 bg-green-900 w-fit text-white hover:cursor-pointer">
                            <p>Edit Data</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}