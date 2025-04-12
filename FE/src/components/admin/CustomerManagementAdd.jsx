import { useState } from "react";
import { NumericFormat } from "react-number-format";
import { Types, Village } from "../../data/Customers";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function CustomerManagementAdd() {
  const [payload, setPayload] = useState({
    name: '',
    type: '--',
    address: '',
    village: '--',
    whatsapp: ''
  });

  const navigate = useNavigate();
  const baseUrl = `http://localhost:3000/api/customers`;

  const handleAdd = async() => {
    console.log("Add");
    console.log(payload);

    const req = await axios.post(`${baseUrl}`, {
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

    // Add logic to save the customer data
    // navigate('/admin/dashboard/customer-management'); // Navigate to customer management page
  };

  const handleChange = (key, e) => {
    setPayload((prevData) => ({ ...prevData, [key]: e.target.value }));
  };

  return (
    <div>
      <div className="flex flex-col px-6 py-8 gap-6">
        <div className="flex flex-col gap-1">
          <p className="text-xl font-bold">Tambah Nasabah Baru</p>
          <p className="text-gray-500">Lengkapi data nasabah baru di bawah ini.</p>
        </div>
        <div className="bg-gray-200 h-[1px]"></div>
      </div>
      <div className="flex px-6">
        <div className="flex flex-col gap-6 p-4 rounded-xl border-1 border-gray-300 w-1/3 h-fit">
          <div className="flex justify-between items-center">
            <p className="text-xl">Detail Nasabah</p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <p className="text-xl">Nama Nasabah</p>
              <input
                value={payload.name}
                type="text"
                id="name"
                className="p-3 rounded-lg border-1 border-gray-300 text-gray-500 w-full"
                onChange={(e) => handleChange("name", e)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xl">Jenis Nasabah</p>
              <select
                value={payload.type}
                onChange={(e) => handleChange("type", e)}
                className="w-full p-3 rounded-lg border-1 border-gray-300 text-gray-500"
              >
                <option value="--">--Jenis Nasabah--</option>
                {Types.map((item, key) => (
                  <option key={key} value={item.name} className="capitalize">
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
                onChange={(e) => handleChange("address", e)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xl">Kelurahan</p>
              <select
                value={payload.village}
                onChange={(e) => handleChange("village", e)}
                className="w-full p-3 rounded-lg border-1 border-gray-300 text-gray-500 capitalize"
              >
                <option value="--">--Pilih Kelurahan--</option>
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
                onChange={(e) => handleChange("whatsapp", e)}
              />
            </div>
          </div>
          <div className="flex gap-2 w-full">
            <div
              onClick={() => navigate("/admin/dashboard/customer-management")}
              className="flex gap-1 items-center px-4 py-2 justify-center rounded-full border-1 text-green-900 w-1/3 hover:cursor-pointer"
            >
              <p>Batal</p>
            </div>
            <div
              onClick={handleAdd}
              className="flex gap-1 justify-center items-center px-4 py-2 rounded-full border-1 bg-green-900 w-2/3 text-white hover:cursor-pointer"
            >
              <p>Selesai</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
