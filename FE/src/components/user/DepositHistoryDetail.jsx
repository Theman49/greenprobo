import { dataset4, dataset5 } from "../../data/Trash"
import { useParams } from "react-router-dom"
import NotFound from "../NotFound";
import { NumericFormat } from "react-number-format";
import { formatCurrency } from "../../utils/Currency";
import Error from "../Error";

export default function DepositHistoryDetail() {
    const url = useParams();
    const facturNo = (url.facturNo).replaceAll(/-/g, '/')
    const data = dataset4.filter((item) => item.facturNo === facturNo)[0];
    try{
        const detail = dataset5.filter((item) => item.facturNo === facturNo)[0].detail;

    if(data && detail){
        return(
            <div>
                <div className="flex flex-col px-6 py-8 gap-6">
                    <div className="flex flex-col gap-1">
                        <p className="text-xl font-bold">Catatan Setoran Anda</p>
                        <p className="text-gray-500">Detail lengkap riwayat penyetoran sampah Anda</p>
                    </div>
                    <div className="bg-gray-200 h-[1px]"></div>
                </div>
                <div className="flex flex-col px-6">
                    <div className="flex justify-between gap-4">
                        <div className="flex flex-col gap-6 p-4 rounded-xl border-1 border-gray-300 w-1/3 h-fit">
                            <p className="text-xl">Detail Terima</p>
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-col gap-1">
                                    <p className="text-xl">Kode Nasabah</p>
                                    <p>028</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-xl">Nama Nasabah</p>
                                    <p>Artena Nagara</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-xl">No. Faktur</p>
                                    <p>{data.facturNo}</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-xl">Tanggal Terima</p>
                                    <p>{data.transactionDate}</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-xl">Penerima</p>
                                    <p>{data.recipient}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col rounded-xl border-1 border-gray-300 w-full">
                            <div className="flex flex-col gap-6 p-4">
                                <p className="text-xl">Daftar Terima Sampah</p>
                                <table className="overflow-hidden rounded-t-lg w-full">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="text-left p-2">Jenis Sampah</th>
                                            <th className="text-left p-2">Nama Sampah</th>
                                            <th className="p-2 w-1/4">Total</th>
                                            <th className="p-2 w-1/4">Harga</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {detail.map((row, key) => {
                                            return(
                                                <tr id={key} className="border-gray-300">
                                                    <td className="p-2">{row.trashType}</td>
                                                    <td className="p-2">{row.name}</td>
                                                    <td className="p-2 text-center">{row.totalAmount}</td>
                                                    <td className="p-2 text-center">{formatCurrency(`${row.totalFee}`)}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex flex-col gap-6 p-4 border-t-1 border-gray-300">
                                <p className="text-xl">Total Penerimaan</p>
                                <div className="flex justify-between gap-4">
                                    <div className="flex flex-col gap-1 w-1/2">
                                        <p>Total Sampah</p>
                                        <p className="text-gray-500">{data.trashAmount}</p>
                                    </div>
                                    <div className="flex flex-col gap-1 w-1/2">
                                        <p>Harga Dibayar</p>
                                        <p className="text-gray-500"><NumericFormat value={data.income} thousandSeparator={true} prefix="Rp" /></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }else{
        return(<NotFound />)
    }
    }catch(e){
        return (<Error e={e} />)
    }
}