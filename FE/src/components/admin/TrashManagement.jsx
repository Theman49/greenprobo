import {useState, useEffect} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {Tabs, Tab} from '@mui/material';
import { ColorsArr } from '../../utils/Colors';
//import { dataset1, dataset3, dataset4 } from '../../data/Trash';
import { NumericFormat } from 'react-number-format';
import { formatCurrency } from '../../utils/Currency';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import axios from 'axios';

const baseUrl = `http://localhost:3000/api/trash-master`;

const DataTable = ({data, type}) => {
    const navigate = useNavigate();

    const rows = data.map((item, key) => {
        return {
            id: key+1,
            trashCode: item.code,
            trashType: type,
            trashName: item.name,
            trashFee: formatCurrency(`${item.fee}`)
        }
    })
  
    const handleSeeDetail = (id) => {
        console.log("Lihat Detail", id)
        const trashData = (rows.filter((item) => item.id === id)[0])
        console.log(trashData)
        navigate(`/admin/dashboard/trash-management/edit`, {state: trashData})
    }
  
    const columns = [
      { field: 'trashCode', headerName: 'Kode Sampah', width: 200 },
      { field: 'trashType', headerName: 'Jenis Sampah', width: 200 },
      { field: 'trashName', headerName: 'Nama Sampah', width: 200 },
      { field: 'trashFee', headerName: 'Harga Sampah', width: 200,},
      { field: 'actions', type:"actions", headerName: 'Aksi', width: 200, getActions: ({id}) => {
        return [
            <div onClick={() => handleSeeDetail(id)} className="flex justify-center items-center px-2 py-1 rounded-full bg-gray-50 border-1 border-gray-300 hover:cursor-pointer">
                <p>Lihat Detail</p>
            </div>,
            <div className="flex justify-center items-center px-2 py-1 rounded-full bg-gray-50 border-1 border-gray-300 hover:cursor-pointer">
                <FileDownloadOutlinedIcon sx={{fontSize: '16px'}}/>
            </div>,
          ];
      } },
    ];
  
  
    const paginationModel = { page: 0, pageSize: 5 };
  
    return (
      <Paper sx={{ height: "inherit", width: '100%' }}>
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

const ListTrashFee = () => {
    const [dataset, setDataset] = useState();
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
            setDataset(temp);  
            }
        }
        fetchData();
    }, [])
    
    const [value, setValue] = useState('plastik');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const CustomTabPanel = ({ children, value, index, currValue }) => {
        return(
            <div
                role="tabpanel"
                hidden={value !== currValue}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
            >
                {value === currValue && <div>{children}</div>}
            </div>
        )
    }

    return(
        <div className="flex flex-col gap-2">

        <Tabs
            value={value}
            onChange={handleChange}
            aria-label="secondary tabs example"
            selectionFollowsFocus={false}
            sx={{
                '& .Mui-selected': {
                    backgroundColor: ColorsArr[0],
                    color: 'white !important',
                    borderRadius: '50px',
                    border: 'none',
                },
                '& .css-s2t35c-MuiTabs-scroller': {
                    position: 'unset'
                },
                '& .MuiTab-textColorPrimary': {
                    color: ColorsArr[0]
                },
                backgroundColor: ColorsArr[9],
                width: 'fit-content',
                borderRadius: '20px',
            }}
        >
        {dataset?.map((item, key) => {
            return(
                <Tab id={key} value={item.type} label={item.type}/>
            );
        })}

        </Tabs>
            {dataset?.map((item, key) => {
                return(
                    <CustomTabPanel value={item.type} index={key} currValue={value}>
                        <DataTable  data={item.data} type={item.type}/>
                    </CustomTabPanel>
                );
            })}
        </div>
    );
}

export default function ReceiptHistory() {


    return(
        <div>
            <div className="flex flex-col px-6 py-8 gap-6">
                <div className="flex flex-col gap-1">
                    <p className="text-xl font-bold">Daftar Harga Sampah</p>
                    <p className="text-gray-500">Detail lengkap daftar harga sampah.</p>
                </div>
                <div className="bg-gray-200 h-[1px]"></div>
            </div>
			<div className="flex flex-col px-6 gap-4">
                <div className="flex justify-end">
                    <NavLink to="/admin/dashboard/trash-management/add" className="bg-green-900 text-white rounded-full px-4 py-2">+ Tambah Data Sampah</NavLink>
                </div>
				<div className="flex flex-col gap-6 p-4 rounded-xl border-1 border-gray-200 min-h-screen">
					<div>
						<ListTrashFee />
					</div>
				</div>
			</div>
        </div>
    )
}