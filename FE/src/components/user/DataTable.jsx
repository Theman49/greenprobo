import {useState, useEffect} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
// import { dataset4 } from '../../data/Trash';
import { NavLink, useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../utils/Currency';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {format} from 'date-fns';

const baseUrl = 'http://localhost:3000/api';

export default function DataTable() {
  const getSession = useSelector((state) => state.session);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const handleSeeDetail = (id) => {
      console.log("Lihat Detail", id)
      const facturNo = (data?.filter((item) => item.id === id)[0].facturNo).replaceAll(/\//g, "-")
      navigate(`/dashboard/deposit-history/detail/${facturNo}`)
  }

  useEffect(() => {
    const fetchData = async() => {
      const res = await axios.post(`${baseUrl}/deposit-histories-index`, {
        isAdmin: getSession.isAdmin,
        code: getSession.code
      })

      if(res.status == 200){
        console.log("FETCH DATA", res.data)
        const temp = res.data.map((item) => {
          return {
            id: item._id,
            facturNo: item.transaction.noFactur,
            transactionDate: format(item.transaction.date, 'dd MMMM yyyy'),
            recipient: item.admin.name,
            trashAmount: item.transaction.totalTrash,
            income: formatCurrency(`${item.transaction.totalFee}`)
          }
        })
        setData(temp)
      }
    }
    fetchData();
  }, [])

  const columns = [
    { field: 'facturNo', headerName: 'No. Faktur', width: 200 },
    { field: 'transactionDate', headerName: 'Tanggal Transaksi', width: 200 },
    { field: 'recipient', headerName: 'Penerima', width: 200 },
    { field: 'trashAmount', headerName: 'Total Sampah', width: 200, align: 'center', headerAlign: 'center' },
    { field: 'income', headerName: 'Pendapatan', width: 200, align: 'center', headerAlign: 'center' },
    { field: 'actions', type:"actions", headerName: 'Aksi', width: 200, getActions: ({id}) => {
      return [
          <NavLink onClick={() => handleSeeDetail(id)} className="flex justify-center items-center px-2 py-1 rounded-full bg-gray-50 border-1 border-gray-300 hover:cursor-pointer">
              <p>Lihat Detail</p>
          </NavLink>,
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


  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <Paper sx={{ height: "inherit", width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
