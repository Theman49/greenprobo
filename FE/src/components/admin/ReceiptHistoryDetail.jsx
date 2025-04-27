import {useState, useEffect, useRef} from 'react';
import { dataset4, dataset5 } from "../../data/Trash"
import { useParams, NavLink, useNavigate } from "react-router-dom"
import NotFound from "../NotFound";
import { NumericFormat } from "react-number-format";
import { formatCurrency } from "../../utils/Currency";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Error from "../Error";
import EditSquareIcon from '@mui/icons-material/EditSquare';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';

const baseUrl = 'http://localhost:3000/api';

const Calculator = ({handler, prevData, dataset}) => {
    const parentEl = useRef(null);

    const RowItem = ({idx, calcGrandTotal, prevData}) => {
        console.log(prevData)
        const [trashType, setTrashType] = useState(prevData ? prevData.trashType : '--');
        const [listTrash, setListTrash] = useState([]);
        const [trashCode, setTrashCode] = useState(prevData ? prevData.trashCode : '--');
        const [trashAmount, setTrashAmount] = useState(prevData ? prevData.totalAmount : 0);
        const [result, setResult] = useState(prevData ? prevData.totalFee : 0);
        //const rTotal = useRef(null);

        useEffect(() => {
            console.log('CHANGED TRASH TYPE', trashType);
            setListTrash(dataset?.filter((item) => item.type === trashType)[0]?.data)
            if(trashType === '--'){
                setResult(0)
            }
        }, [trashType])


        const handleChange = (event) => {
            setTrashType(event.target.value)
        }
        const handleChangeTrashCode = (event) => {
            console.log("PILIH SAMPAH", event.target.value)
            setTrashCode(event.target.value)
        }

        const handleChangeTrashAmount = (event) => {
            setTrashAmount(event.target.value)
        }
        const calcResult = () => {
            const total = trashAmount 
            const trash = dataset?.filter((item) => item.type === trashType)[0]?.data.filter((item) => item.code === trashCode)[0]
            if(trash){
                console.log("TRASH", trash)
                console.log("total", total)
                const tempResult = parseFloat(trash?.fee) * parseFloat(total)
                console.log("RESULT", tempResult)
                setResult(tempResult)
            }else{
                setResult(0)
            }
            calcGrandTotal()
        }

        useEffect(() => {
            calcResult()
        }, [trashType, trashCode, listTrash, trashAmount ])



        return(
            <div id={`row${idx}`} className="flex gap-2 w-full">
                <select value={trashType} onChange={handleChange} className="w-full" id={`trashType${idx}`}>
                    <option value="--">--Jenis Sampah--</option>
                    {dataset?.map((item, key) => {
                        return(
                            <option id={key} value={item.type}>{item.type}</option>
                        )
                    })}
                </select>
                <select value={trashCode} onChange={handleChangeTrashCode} className="w-full" id={`trashCode${idx}`}>
                    <option value="--">--Pilih Sampah--</option>
                    {listTrash?.map((item, key) => {
                        return(
                            <option id={key} value={item.code}>{item.name}</option>
                        )
                    })}
                </select>
                <input value={trashAmount} type="text" id={`total${idx}`} className="pl-2 border-1 border-gray-500 rounded-md w-full" onChange={handleChangeTrashAmount}/>
                <div className="flex items-center rounded-lg border-1 border-gray-300 w-full">
                    <div className="bg-gray-300 p-2 rounded-md">
                        Rp
                    </div>
                    <div className="pl-1 w-full">
                        <NumericFormat id={`result${idx}`} value={`${result}`} thousandSeparator="," className="w-full readonly"/>
                    </div>
                </div>
            </div>
        )

    }

    const [grandTotal, setGrandTotal] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);

    const calculateGrandTotal = () => {
            setTimeout(() => {
                const wrapperEl = parentEl.current
                const totals = Array.from(wrapperEl.querySelectorAll('input[id^="total"]'))
                const incomes = Array.from(wrapperEl.querySelectorAll('input[id^="result"]'))

                console.log("INCOMES", incomes)

                const totalValues = [];
                totals.forEach((item) => {
                    console.log('item total', item.innerText)
                    const temp = parseFloat((item.value).replaceAll(/,/g,""));
                    totalValues.push(temp)
                })

                const incomeValues = [];
                incomes.forEach((item) => {
                    console.log('item income', item.value)
                    const temp = parseFloat((item.value).replaceAll(/,/g,""));
                    incomeValues.push(temp)
                })

                const tempTotals = totalValues.reduce((total, item) => total + item)
                const tempTotalIncome = incomeValues.reduce((total, item) => total + item)
                // setGrandTotal(tempTotals)
                // setTotalIncome(tempTotalIncome)
                console.log("ALKDJLK", {
                    trashTotal: tempTotals,
                    trashFee: tempTotalIncome,
                })
                handler.grandTotal({
                    trashTotal: tempTotals,
                    trashFee: tempTotalIncome,
                })

            }, 100)
    }


    const [wrapper, setWrapper] = useState(
        (prevData) ? [
            ...prevData.map((item) => {
                return({
                    id: Date.now(),
                    content: <RowItem idx={Date.now()} calcGrandTotal={calculateGrandTotal} prevData={item} />
                })
            })
        ] :
        [
            /*
        {
            id: Date.now(),
            content: <RowItem idx={Date.now()} calcGrandTotal={calculateGrandTotal}  />
        }
        */
        ]
    );



    const addRow = () => {
        setWrapper((prevData) => [...prevData, {id: Date.now(), content: <RowItem idx={Date.now()}  calcGrandTotal={calculateGrandTotal} />}])
    }

    const deleteRow = (id) => {
        const wrapperEl = parentEl.current
        const item = wrapperEl.querySelector(`div[id="${id}"]`)
        /*
        const idWrapper = ((wrapperEl.querySelector(`div[id="${id}"] > div`)).id).substr(3)
        console.log('IDWRAPPER', idWrapper)
        setWrapper(prevData => prevData.filter((item) => item.id !== idWrapper))
        */
        item.remove()
    }

    const reset = () => {
        const wrapperEl = parentEl.current
        const items = Array.from(wrapperEl.querySelectorAll(`div`))
        items.forEach((item) => {
            item.remove()
        })
        addRow();
        setTotalIncome(0);
        setGrandTotal(0);
    }


    return(
        <div className="flex flex-col justify-end items-end gap-4 w-full">
            <div className="flex flex-col gap-2 w-full">
                <div ref={parentEl} id="wrapper" className="flex flex-col gap-2 w-full">
                    {wrapper.map((item, key) => {
                        return(
                            <div id={key} className="flex gap-1">
                                {item.content}
                                <div onClick={() => deleteRow(key)} className="flex items-center text-bold text-xl hover:cursor-pointer">
                                    <p>X</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="flex gap-2">
                    <button onClick={addRow} className="flex justify-center gap-1 items-center px-4 py-2 rounded-full border-1 border-green-900 text-green-900 w-1/4 hover:cursor-pointer">
                        <p>+</p>
                        <p>Tambah</p>
                    </button>
                    <button onClick={reset} className="flex justify-center gap-1 items-center px-4 py-2 rounded-full border-1 border-red-500 text-red-500 w-1/4 hover:cursor-pointer">
                        <p>Reset</p>
                    </button>
                </div>
            </div>

            {/*
            <div className="bg-gray-200 h-[1px] w-full"></div>

            <div className="flex flex-col gap-2 w-1/2">
                <div className="flex justify-between text-right">
                    <p className="text-gray-500 w-full">Total:</p>
                    <p className="text-2xl font-bold w-2/3">{grandTotal}</p>
                </div>
                <div className="flex justify-between text-right">
                    <p className="text-gray-500 w-full">Total Pendapatan:</p>
                    <NumericFormat value={totalIncome} thousandSeparator="," prefix="Rp" className="text-right text-2xl font-bold w-2/3"/>
                </div>
            </div>
            */}
        </div>
    )
}


export default function ReceiptHistoryDetail() {
    const [isEdit, setIsEdit] = useState(false);
    const [data, setData] = useState([]);
    const getSession = useSelector((state) => state.session);
    const navigate = useNavigate();
    const url = useParams();
    const facturNo = (url.facturNo).replaceAll(/-/g, '/')

    const [editedTrash, setEditedTrash] = useState([]);
    const [transactionNoFactur, setTransactionNoFactur] = useState('');
    const [customers, setCustomers] = useState([])
    const [customer, setCustomer] = useState([])
    const [transactionDate, setTransactionDate] = useState(new Date());
    const [trashMaster, setTrashMaster] = useState([]);
    const [calcResult, setCalcResult] = useState({
        trashTotal: 0,
        trashFee: 0,
    })

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
                setCustomer(res.data[0].customer);
                setTransactionDate(res.data[0].transaction.date);
                setEditedTrash(res.data[0].trash);
                setTransactionNoFactur(res.data[0].transaction.noFactur);
            }
        }
        const fetchDataTrashMaster = async() => {
            const res = await axios.get(`${baseUrl}/trash-master`)
            if (res.data) {
            const temp = res.data.map((item) => {
                return {
                    id: item._id,
                    type: item.type,
                    data: item.data
                }
            })
            setTrashMaster(temp);  
            }
        }
        const fetchDataCustomers = async() => {
            const res = await axios.get(`${baseUrl}/customers`)
            if (res.data) {
            const temp = res.data.map((item) => {
                return {
                    id: item._id,
                    code: item.code,
                    name: item.name,
                    type: item.type,
                }
            })
            setCustomers(temp);  
            }
        }
        fetchDataTrashMaster();
        fetchDataCustomers();
        fetchData();
    }, [])

    const handleEditDetail = (facturNo) => {
        console.log("Edit Detail", facturNo)
        setIsEdit(true)
    }

    const handleDelete = async() => {
        const res = await axios.delete(`${baseUrl}/deposit-histories/${data._id}`);

        if(res.status === 200){
            console.log(res)
            navigate("/admin/dashboard/receipt-history")
        }    
    }

    const handleSave = async() => {
        const wrapperEl = document.getElementById('wrapper')
        const rows = Array.from(wrapperEl.querySelectorAll('div[id^="row"]'));
        console.log(rows)
        const tempData = rows.map((item) => {
            const trashType = item.querySelector('select[id^="trashType"]').value;
            const trashCode =  item.querySelector('select[id^="trashCode"]').value;
            const trashTotal =  item.querySelector('input[id^="total"]').value;
            const trashFee =  parseFloat((item.querySelector('input[id^="result"]').value).replaceAll(',', ''));
            const trashName = trashMaster?.filter((item) => item.type === trashType)[0]?.data.filter((item) => item.code === trashCode)[0].name; 


            console.log(trashType, trashCode, trashTotal, trashFee)
            console.log(
                {
                trashType: trashType,
                name: trashName,
                totalAmount: trashTotal,
                totalFee: trashFee,
                }
            )

            return {
                trashType: trashType,
                trashCode: trashCode,
                name: trashName,
                totalAmount: parseFloat(trashTotal),
                totalFee: trashFee,
            }
        })
        console.log("SAVE", customer, tempData, data._id)


        const transaction = {
            // date: format(transactionDate, 'dd MMMM yyyy'),
            date: transactionDate,
            noFactur: transactionNoFactur,
            type: transactionNoFactur.split('/')[0],
            month: transactionNoFactur.split('/')[1],
            year: transactionNoFactur.split('/')[2],
            totalTrash: calcResult.trashTotal, 
            totalFee: calcResult.trashFee, 
        }
        const body = ({
            trash: tempData,
            customer: customer,
            admin: {
                code: getSession.code,
                name: getSession.name
            },
            transaction: transaction 
        })
        console.log(body)

        const res = await axios.patch(`${baseUrl}/deposit-histories-edit/${data._id}`, {
            isAdmin: getSession.isAdmin,
            code: getSession.code,
            payload: body
        })

        if(res.status === 200){
            console.log(res)
            navigate("/admin/dashboard/receipt-history")
        }
    }

    const reset = () => {
        setCalcResult({
            trashTotal: 0,
            trashFee: 0,
        })
    }

    const handleChooseCustomer = (event) => {
        const code = event.target.value;
        const temp = customers?.filter((item) => item.code === code)[0]; 
        console.log(code, temp)
        setCustomer(temp)
    }

    
    try{

    if(data){
        if(!isEdit){
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
                                        <p>{data.customer.code}</p>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-xl">Nama Nasabah</p>
                                        <p>{data.customer.name}</p>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-xl">No. Faktur</p>
                                        <p>{data.transaction.noFactur}</p>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-xl">Tanggal Terima</p>
                                        <p>{format(data.transaction.date, 'dd MMMM yyyy')}</p>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-xl">Penerima</p>
                                        <p>{data.admin.name}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-6 w-full">
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
                                <div className="flex justify-end">
                                    <NavLink onClick={() => handleEditDetail(url.facturNo)} className="flex gap-1 items-center px-4 py-1 justify-center rounded-full border-1 text-green-900">
                                        <EditSquareIcon sx={{width: '20px', height: '20px'}}/> <p>Edit</p>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }else{
            return(
                <div className="flex flex-col px-6">
                    <div className="flex justify-between gap-4">
                        <div className="flex flex-col gap-6 p-4 rounded-xl border-1 border-gray-300 w-1/3 h-fit">
                            <p className="text-xl">Detail Terima</p>
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-col gap-1">
                                    <p className="text-xl">Kode Nasabah</p>
                                    <select onChange={handleChooseCustomer} className="p-3 rounded-lg border-1 border-gray-300 w-full" value={customer ? customer.code : "--"}>
                                        <option value="--">-- Pilih Kode Nasabah --</option>
                                        {customers?.map((item) => {
                                            return(
                                                <option value={item.code}>{item.code}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-xl">Nama Nasabah</p>
                                    <p className="p-3 rounded-lg border-1 bg-gray-100 border-gray-300 text-gray-500 w-full">{customer?.name}</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-xl">Jenis Nasabah</p>
                                    <p className="p-3 rounded-lg border-1 bg-gray-100 border-gray-300 text-gray-500 w-full">{customer?.type}</p>
                                </div>
                                {
                                    /*
                                <div className="flex flex-col gap-1">
                                    <p className="text-xl">No. Faktur</p>
                                    <input type="text" value={transactionNoFactur} className="p-3 rounded-lg border-1 border-gray-300 text-gray-500 w-full" readonly/>
                                </div>
                                    */
                                }
                                <div className="flex flex-col gap-1">
                                    <p className="text-xl">Tanggal Terima</p>
                                    <div className="p-3 rounded-lg border-1 border-gray-300 text-gray-500 w-full">
                                    <DatePicker
                                        dateFormat="dd MMMM yyyy"
                                        selected={transactionDate}
                                        onChange={(date) => setTransactionDate(date)}
                                    />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-6 w-full">
                            <div className="flex flex-col rounded-xl border-1 border-gray-300 w-full">
                                <div className="flex flex-col gap-6 p-4">
                                    <p className="text-xl">Daftar Terima Sampah</p>
                                    <div>
                                        <Calculator handler={{grandTotal: setCalcResult, reset: reset, updateTrashItem: setEditedTrash}} prevData={data.trash} dataset={trashMaster}/>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-6 p-4 border-t-1 border-gray-300">
                                    <p className="text-xl">Total Penerimaan</p>
                                    <div className="flex justify-between gap-4">
                                        <div className="flex flex-col gap-1 w-1/2">
                                            <p>Total Sampah</p>
                                            <p className="text-gray-500">{calcResult.trashTotal}</p>
                                        </div>
                                        <div className="flex flex-col gap-1 w-1/2">
                                            <p>Harga Dibayar</p>
                                            <p className="text-gray-500"><NumericFormat value={`${calcResult.trashFee}`} thousandSeparator={true} prefix="Rp" /></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end gap-2">
                                <div onClick={handleDelete} className="flex gap-1 items-center px-24 py-4 justify-center rounded-full border-1 bg-red-500 text-white hover:cursor-pointer">
                                    <p className='text-lg font-semibold'>Delete</p>
                                </div>
                                <div onClick={handleSave} className="flex gap-1 items-center px-24 py-4 justify-center rounded-full border-1 bg-green-900 text-white hover:cursor-pointer">
                                    <p className='text-lg font-semibold'>Save</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }else{
        return(<NotFound />)
    }
    }catch(e){
        return (<Error e={e} />)
    }
}