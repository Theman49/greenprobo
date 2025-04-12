import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { Customers } from '../../data/Customers'; 
import { NavLink, useNavigate } from 'react-router-dom';

export default function CustomerManagementTable() {
  const navigate = useNavigate();

  const handleSeeDetail = (id) => {
      console.log("Lihat Detail", id)
      const customerData = (Customers.filter((item) => item.code === id)[0])
      navigate(`/admin/dashboard/customer-management/edit/${id}`, {state: customerData})
  }

  const columns = [
    { field: 'code', headerName: 'Kode Nasabah', width: 200 },
    { field: 'name', headerName: 'Nama Nasabah', width: 250 },
    { field: 'type', headerName: 'Jenis Nasabah', width: 200 },
    { field: 'address', headerName: 'Alamat', width: 300 },
    { field: 'village', headerName: 'Kelurahan', width: 200 },
    { field: 'actions', type:"actions", headerName: 'Aksi', width: 200, getActions: ({id}) => {
      return [
          <NavLink onClick={() => handleSeeDetail(id)} className="flex justify-center items-center px-2 py-1 rounded-full bg-gray-50 border-1 border-gray-300 hover:cursor-pointer">
              <p>Lihat Detail</p>
          </NavLink>,
          <div className="flex justify-center items-center px-2 py-1 rounded-full bg-gray-50 border-1 border-gray-300 hover:cursor-pointer">
              <FileDownloadOutlinedIcon sx={{fontSize: '16px'}}/>
          </div>,
        ];
    } },
  ];

  const rows = Customers.map((item) => {
    return {
      id: item.code,
      code: item.code,
      name: item.name,
      type: item.type,
      address: item.address,
      village: item.village,
    }
  });

  const paginationModel = { page: 0, pageSize: 10 };

  return (
    <Paper sx={{ height: "inherit", width: '100%' }}>
      <div className="flex flex-col px-6 py-8 gap-6">
        <div className="flex flex-col gap-1">
          <p className="text-xl font-bold">Manajemen Nasabah</p>
          <p className="text-gray-500">Detail lengkap data nasabah.</p>
        </div>
        <div className="bg-gray-200 h-[1px]"></div>
      </div>

      <div className="flex justify-end px-6">
        <NavLink to="/admin/dashboard/customer-management/add" className="bg-green-900 text-white rounded-full px-4 py-2">+ Tambah Data Nasabah</NavLink>
      </div>

      <div className="flex flex-col px-6 gap-4">
        <Paper sx={{ height: "auto", width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{ border: 0 }}
          />
        </Paper>
      </div>
    </Paper>
  );
}
