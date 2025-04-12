import { useState, useEffect } from "react";
import { Types, Village } from "../../data/Customers"; 
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from 'axios';

import { Customers } from "../../data/Customers";

export default function CustomerManagementEdit() {
  const [payload, setPayload] = useState({
    name: '',
    type: '--',
    address: '',
    village: '--',
    whatsapp: ''
  });

  const { id } = useParams(); 
  const navigate = useNavigate();

  const baseUrl = `http://localhost:3000/api/customers`;

  useEffect(() => {
    const fetchData = async() => {
      // const customerData = Customers.find((customer) => customer.code === id);
      const res = await axios.get(`${baseUrl}/${id}`)
      if (res.data) {
        setPayload(res.data);  
      }
    }
    fetchData();
  }, [id]);

  const handleSave = async() => {
    console.log("Save Customer Data:", payload);

    const req = await axios.patch(`${baseUrl}/${payload._id}`, {
      name: payload.name,
      type: payload.type,
      address: payload.address,
      village: payload.village,
      whatsapp: payload.whatsapp,
    });
    if(req){
      console.log('REQ', req)
      if(req.status == 200){
        navigate("/admin/dashboard/customer-management"); 
      }
    }
  };

  const handleDelete = async() => {
    console.log("Delete Customer");
    const req = await axios.delete(`${baseUrl}/${id}`);
    if(req){
      console.log('REQ', req)
      if(req.status == 200){
        navigate("/admin/dashboard/customer-management"); 
      }
    }
    //navigate("/admin/dashboard/customer-management"); 
  };

  return (
    <div>
      <div className="flex flex-col px-6 py-8 gap-6">
        <div className="flex flex-col gap-1">
          <p className="text-xl font-bold">Edit Data Nasabah</p>
          <p className="text-gray-500">Update data nasabah yang ingin diubah.</p>
        </div>
        <div className="bg-gray-200 h-[1px]"></div>
      </div>

      <div className="flex px-6">
        <div className="flex flex-col gap-6 p-4 rounded-xl border-1 border-gray-300 w-1/3 h-fit">
          <div className="flex justify-between items-center">
            <p className="text-xl">Edit Nasabah</p>
            <button onClick={handleDelete} className="text-red-600 hover:cursor-pointer">Hapus Data</button>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <p className="text-xl">Nama Nasabah</p>
              <input
                value={payload.name}
                type="text"
                id="name"
                className="p-3 rounded-lg border-1 border-gray-300 text-gray-500 w-full"
                onChange={(e) => setPayload({ ...payload, name: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xl">Jenis Nasabah</p>
              <select
                value={payload.type}
                onChange={(e) => setPayload({ ...payload, type: e.target.value })}
                className="w-full p-3 rounded-lg border-1 border-gray-300 text-gray-500"
              >
                {Types.map((item, key) => (
                  <option key={key} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xl">Alamat Lengkap</p>
              <input
                value={payload.address}
                type="text"
                id="address"
                className="p-3 rounded-lg border-1 border-gray-300 text-gray-500 w-full"
                onChange={(e) => setPayload({ ...payload, address: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xl">Kelurahan</p>
              <select
                value={payload.village}
                onChange={(e) => setPayload({ ...payload, village: e.target.value })}
                className="w-full p-3 rounded-lg border-1 border-gray-300 text-gray-500"
              >
                {Village.map((village, key) => (
                  <option key={key} value={village.name}>
                    {village.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xl">No. Whatsapp</p>
              <input
                value={payload.whatsapp}
                type="text"
                id="whatsapp"
                className="p-3 rounded-lg border-1 border-gray-300 text-gray-500 w-full"
                onChange={(e) => setPayload({ ...payload, whatsapp: e.target.value })}
              />
            </div>
          </div>

          <div className="flex justify-between w-full gap-2">
            <button
              onClick={() => navigate('/admin/dashboard/customer-management')}
              className="flex justify-center items-center px-4 py-2 rounded-full border-1 text-green-900 w-1/2 hover:cursor-pointer"
            >
              Batal
            </button>
            <button
              onClick={handleSave}
              className="flex justify-center items-center px-4 py-2 rounded-full border-1 bg-green-900 w-1/2 text-white hover:cursor-pointer"
            >
              Simpan Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
