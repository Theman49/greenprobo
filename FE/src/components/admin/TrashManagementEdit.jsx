import {useState, useEffect} from 'react';
import { useLocation, useNavigate } from "react-router-dom"
import { NumericFormat } from "react-number-format";
import axios from 'axios';

const baseUrl = `http://localhost:3000/api/trash-master`;

export default function TrashManagementEdit() {
    const location = useLocation();
    const navigate = useNavigate();

    const [payload, setPayload] = useState({
        trashCode: location.state?.trashCode,
        trashName: location.state?.trashName,
        trashType: location.state?.trashType,
        trashFee: (location.state?.trashFee).replaceAll(/rp/gi, '')
    });

    const handleEdit = async() => {
        console.log('EDIT')
        console.log(payload)
        const req = await axios.patch(`${baseUrl}/${location.state?.trashType}/${location.state?.trashCode}`, {
            name: payload.trashName,
            code: payload.trashCode,
            type: payload.trashType,
            fee: payload.trashFee,
          });
          if(req){
            console.log('REQ', req)
            if(req.status == 200){
              navigate("/admin/dashboard/trash-management"); 
            }
          }
    }


    const handleDelete = async() => {
        console.log("Delete Trash");
        const req = await axios.delete(`${baseUrl}/${location.state?.trashType}/${location.state?.trashCode}`);
        if(req){
        console.log('REQ', req)
        if(req.status == 200){
            navigate("/admin/dashboard/trash-management"); 
        }
        }
        //navigate("/admin/dashboard/customer-management"); 
    };

    const [trashType, setTrashType] = useState();
    useEffect(() => {
        const fetchData = async() => {
            const res = await axios.get(`${baseUrl}`)
            if (res.data) {
            const temp = res.data.map((item) => {
                return {
                    id: item._id,
                    type: item.type,
                    data: item.data
                }
            })
            setTrashType(temp);  
            }
        }
        fetchData();
    }, [])

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
                        <p onClick={handleDelete} className="text text-red-500 hover:cursor-pointer">Hapus Data</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-1">
                            <p className="text-xl">Kode Sampah</p>
                            <input
                                value={payload.trashCode}
                                type="text"
                                id="name"
                                className="p-3 rounded-lg border-1 border-gray-300 text-gray-500 w-full"
                                onChange={(e) => setPayload({ ...payload, trashCode: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-xl">Nama Sampah</p>
                            <input
                                value={payload.trashName}
                                type="text"
                                id="name"
                                className="p-3 rounded-lg border-1 border-gray-300 text-gray-500 w-full"
                                onChange={(e) => setPayload({ ...payload, trashName: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-xl">Jenis Sampah</p>
                            <select value={payload.trashType} onChange={(e) => setPayload({ ...payload, trashType: e.target.value })} className="w-full">
                                <option value="--">--Jenis Sampah--</option>
                                {trashType?.map((item, key) => {
                                    return(
                                        <option id={key} value={item.type}>{item.type}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-xl">Harga Sampah</p>
                            <div className="flex items-center rounded-lg border-1 border-gray-300 w-full">
                                <div className="bg-gray-300 p-2 rounded-md">
                                    Rp
                                </div>
                                <div className="pl-1 w-full">
                                    <NumericFormat value={`${payload.trashFee}`} thousandSeparator="," className="w-full" onChange={(e) => setPayload({ ...payload, trashFee: e.target.value })}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between w-full gap-2">
                        <button
                        onClick={() => navigate('/admin/dashboard/trash-management')}
                        className="flex justify-center items-center px-4 py-2 rounded-full border-1 text-green-900 w-1/2 hover:cursor-pointer"
                        >
                        Batal
                        </button>
                        <button
                        onClick={handleEdit}
                        className="flex justify-center items-center px-4 py-2 rounded-full border-1 bg-green-900 w-1/2 text-white hover:cursor-pointer"
                        >
                        Simpan Data
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}