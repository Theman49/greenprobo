import { useState, useEffect } from "react";
import { NumericFormat } from "react-number-format";
//import { dataset1 } from "../../data/Trash";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const baseUrl = `http://localhost:3000/api/trash-master`;

export default function TrashManagementAdd() {
    const navigate = useNavigate();
    const [payload, setPayload] = useState({
        trashCode: '',
        trashName: '',
        trashType: '--',
        trashFee: 0
    })

    const handleAdd = async() => {
        console.log('Add')
        console.log(payload)
        const req = await axios.post(`${baseUrl}`, {
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

    const handleChange = (key, e) => {
        setPayload((prevData) => ({...prevData, [key]: e.target.value}))
    }


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
                    <p className="text-xl font-bold">Tambah Data Sampah</p>
                    <p className="text-gray-500">Detail lengkap riwayat penyetoran sampah Anda</p>
                </div>
                <div className="bg-gray-200 h-[1px]"></div>
            </div>
            <div className="flex px-6">
                <div className="flex flex-col gap-6 p-4 rounded-xl border-1 border-gray-300 w-1/3 h-fit">
                    <div className="flex justify-between items-center">
                        <p className="text-xl">Detail Sampah</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-1">
                            <p className="text-xl">Kode Sampah</p>
                            <input value={payload.trashCode} type="text" id="trashCode" className="p-3 rounded-lg border-1 border-gray-300 text-gray-500 w-full" onChange={(e) => handleChange('trashCode', e)}/>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-xl">Nama Sampah</p>
                            <input value={payload.trashName} type="text" id="trashName" className="p-3 rounded-lg border-1 border-gray-300 text-gray-500 w-full" onChange={(e) => handleChange('trashName', e)}/>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-xl">Jenis Sampah</p>
                            <select value={payload.trashType} onChange={(e) => handleChange('trashType', e)} className="w-full">
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
                                    <NumericFormat value={`${payload.trashFee}`} thousandSeparator="," className="w-full" onChange={(e) => handleChange('trashFee', e)}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2 w-full">
                        <div onClick={() => history.go(-1)} className="flex gap-1 items-center px-4 py-2 justify-center rounded-full border-1 text-green-900 w-1/3  hover:cursor-pointer">
                            <p>Batal</p>
                        </div>
                        <div onClick={handleAdd} className="flex gap-1 justify-center items-center px-4 py-2 rounded-full border-1 bg-green-900 w-2/3 text-white hover:cursor-pointer">
                            <p>Selesai</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}