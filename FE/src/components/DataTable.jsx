import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

const handleSeeDetail = (id) => {
    console.log("Lihat Detail", id)
}

const columns = [
  { field: 'facturNo', headerName: 'No. Faktur', width: 200 },
  { field: 'transactionDate', headerName: 'Tanggal Transaksi', width: 200 },
  { field: 'recipient', headerName: 'Penerima', width: 200 },
  { field: 'trashAmount', headerName: 'Total Sampah', width: 200, align: 'center', headerAlign: 'center' },
  { field: 'income', headerName: 'Pendapatan', width: 200, align: 'center', headerAlign: 'center' },
  { field: 'actions', type:"actions", headerName: 'Actions', width: 200, getActions: ({id}) => {
    return [
        <div onClick={handleSeeDetail(id)} className="flex justify-center items-center px-2 py-1 rounded-full bg-gray-50 border-1 border-gray-300 hover:cursor-pointer">
            <p>Lihat Detail</p>
        </div>,
        <div className="flex justify-center items-center px-2 py-1 rounded-full bg-gray-50 border-1 border-gray-300 hover:cursor-pointer">
            <FileDownloadOutlinedIcon sx={{fontSize: '16px'}}/>
        </div>,
      ];
      /*
      return [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          className="textPrimary"
          onClick={handleEditClick(id)}
          color="inherit"
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={handleDeleteClick(id)}
          color="inherit"
        />,
      ];
      */
  } },
  /*
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
  */
];

const rows = [
  { id:1, facturNo: '174/A/12/2024', transactionDate: '20 Desember 2024', recipient: 'Agus Mulyono', trashAmount: 8.12, income: 48210 },
  { id:2, facturNo: '082/A/12/2024', transactionDate: '3 Desember 2024', recipient: 'Agus Mulyono', trashAmount: 8.12, income: 48210 },
  { id:3, facturNo: '041/A/11/2024', transactionDate: '29 November 2024', recipient: 'Andi Setiawan', trashAmount: 8.12, income: 48210 },
  { id:4,  facturNo: '010/A/11/2024', transactionDate: '12 November 2024', recipient: 'Agus Mulyono', trashAmount: 8.12, income: 48210 },
  { id:5, facturNo: '026/A/09/2024', transactionDate: '1 September 2024', recipient: 'Tugiman', trashAmount: 8.12, income: 48210 },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {
  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
