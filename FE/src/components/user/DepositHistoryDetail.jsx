// import { dataset4, dataset5 } from "../../data/Trash"
import {useState, useEffect} from 'react';
import { useParams } from "react-router-dom"
import NotFound from "../NotFound";
import { NumericFormat } from "react-number-format";
import { formatCurrency } from "../../utils/Currency";
import Error from "../Error";
import axios from 'axios';
import { useSelector } from 'react-redux';
import {format} from 'date-fns';

const baseUrl = 'http://localhost:3000/api';

export default function DepositHistoryDetail() {
    const getSession = useSelector((state) => state.session);
    const [data, setData] = useState([]);
    const url = useParams();
    const facturNo = (url.facturNo).replaceAll(/-/g, '/')

    useEffect(() => {
        const fetchData = async() => {
            const res = await axios.post(`${baseUrl}/deposit-histories-detail`, {
                isAdmin: getSession.isAdmin,
                code: getSession.code,
                noFactur: facturNo
            })
            if(res.status === 200){
                console.log("FETCH DATA", res[0])
                setData(res.data[0]);
            }
        }
        fetchData();
    }, []);
    
    try{

    if(data){
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
                                    <p className="text-gray-500">028</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-xl">Nama Nasabah</p>
                                    <p className="text-gray-500">Artena Nagara</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-xl">No. Faktur</p>
                                    <p className="text-gray-500">{data.transaction.noFactur}</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-xl">Tanggal Terima</p>
                                    <p className="text-gray-500">{format(data.transaction.date, 'dd MMMM yyyy')}</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-xl">Penerima</p>
                                    <p className="text-gray-500">{data.admin.name}</p>
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
                                        {data.trash.map((row, key) => {
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
                                        <p className="text-gray-500">{data.transaction.totalTrash}</p>
                                    </div>
                                    <div className="flex flex-col gap-1 w-1/2">
                                        <p>Harga Dibayar</p>
                                        <p className="text-gray-500"><NumericFormat value={data.transaction.totalFee} thousandSeparator={true} prefix="Rp" /></p>
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