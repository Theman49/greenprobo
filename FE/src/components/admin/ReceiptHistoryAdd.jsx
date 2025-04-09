import {useState, useRef, useEffect} from 'react';
import { dataset1, dataset3, dataset4, dataset5 } from "../../data/Trash"
import { Customers, Types } from "../../data/Customers";
import { useParams, NavLink, useNavigate } from "react-router-dom"
import NotFound from "../NotFound";
import { NumericFormat } from "react-number-format";
import { formatCurrency } from "../../utils/Currency";
import Error from "../Error";
import ShareIcon from '@mui/icons-material/Share';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns'


const Calculator = ({handler, prevData}) => {
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
            setListTrash(dataset3[trashType])
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
            const trash = dataset3[trashType]?.filter((item) => item.code === trashCode)[0]
            if(trash){
                console.log("TRASH", trash)
                console.log("total", total)
                const tempResult = parseFloat(trash?.fee) * parseFloat(total)
                console.log("RESULT", tempResult)
                setResult(tempResult)
            }else{
                setResult(0)
            }
        }

        useEffect(() => {
            calcResult()
            calcGrandTotal()
        }, [trashType, trashCode, listTrash, trashAmount ])



        return(
            <div id={`row${idx}`} className="flex gap-2 w-full">
                <select value={trashType} onChange={handleChange} className="w-full" id={`trashType${idx}`}>
                    <option value="--">--Jenis Sampah--</option>
                    {dataset1.detail.map((item, key) => {
                        return(
                            <option id={key} value={item.label}>{item.label}</option>
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
            const wrapperEl = parentEl.current
            const totals = Array.from(wrapperEl.querySelectorAll('input[id^="total"]'))
            const incomes = Array.from(wrapperEl.querySelectorAll('input[id^="result"]'))

            const totalValues = [];
            totals.forEach((item) => {
                const temp = parseFloat((item.value).replaceAll(/,/g,""));
                totalValues.push(temp)
            })

            const incomeValues = [];
            incomes.forEach((item) => {
                const temp = parseFloat((item.value).replaceAll(/,/g,""));
                incomeValues.push(temp)
            })
            const tempTotals = totalValues.reduce((total, item) => total + item)
            const tempTotalIncome = incomeValues.reduce((total, item) => total + item)
            setGrandTotal(tempTotals)
            setTotalIncome(tempTotalIncome)
            handler.grandTotal({
                trashTotal: tempTotals,
                trashFee: tempTotalIncome,
            })
            console.log("ALKDJLK", {
                trashTotal: tempTotals,
                trashFee: tempTotalIncome,
            })
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
        {
            id: Date.now(),
            content: <RowItem idx={Date.now()} calcGrandTotal={calculateGrandTotal}  />
        }
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
        handler.reset()
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

    const [isPreview, setIsPreview] = useState(false);
    const [transactionDate, setTransactionDate] = useState(new Date());
    const [calcResult, setCalcResult] = useState({
        trashTotal: 0,
        trashFee: 0,
    })
    const [customer, setCustomer] = useState({});
    const [data, setData] = useState([
        {
            trashType: '--',
            trashCode: '--',
            totalAmount: 0,
            totalFee: 0,
        }
    ]);

    const handleChooseCustomer = (event) => {
        const code = event.target.value;
        const temp = Customers.filter((item) => item.code === code)[0]; 
        console.log(code, temp)
        setCustomer(temp)
    }

    const handlePreview = () => {
        const wrapperEl = document.getElementById('wrapper')
        const rows = Array.from(wrapperEl.querySelectorAll('div[id^="row"]'));
        console.log(rows)
        const tempData = rows.map((item) => {
            const trashType = item.querySelector('select[id^="trashType"]').value;
            const trashCode =  item.querySelector('select[id^="trashCode"]').value;
            const trashTotal =  item.querySelector('input[id^="total"]').value;
            const trashFee =  parseFloat((item.querySelector('input[id^="result"]').value).replaceAll(',', ''));
            const trashName = dataset3[trashType].filter((item) => item.code === trashCode)[0].name; 


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
                totalAmount: trashTotal,
                totalFee: trashFee,
            }
        })
        setData(tempData)
        setIsPreview(true)
    }
    
    const handleEdit = () => {
        setIsPreview(false)
    }

    const reset = () => {
        setCalcResult({
            trashTotal: 0,
            trashFee: 0,
        })
    }

    return(
        <div>
            <div className="flex flex-col px-6 py-8 gap-6">
                <div className="flex flex-col gap-1">
                    <p className="text-xl font-bold">Terima Sampah Baru</p>
                    <p className="text-gray-500">Detail lengkap riwayat penyetoran sampah Anda</p>
                </div>
                <div className="bg-gray-200 h-[1px]"></div>
            </div>
            <div className="flex flex-col px-6">
                <div className="flex justify-between gap-4">
                    {!isPreview ?
                    <div className="flex flex-col gap-6 p-4 rounded-xl border-1 border-gray-300 w-1/3 h-fit">
                        <p className="text-xl">Detail Terima</p>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col gap-1">
                                <p className="text-xl">Kode Nasabah</p>
                                <select onChange={handleChooseCustomer} className="p-3 rounded-lg border-1 border-gray-300 w-full">
                                    <option value="--">-- Pilih Kode Nasabah --</option>
                                    {Customers.map((item) => {
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
                            <div className="flex flex-col gap-1">
                                <p className="text-xl">No. Faktur</p>
                                <input type="text" value="003/A/12/2025"className="p-3 rounded-lg border-1 border-gray-300 text-gray-500 w-full" readonly/>
                            </div>
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
                    :
                    <div className="flex flex-col gap-6 p-4 rounded-xl border-1 border-gray-300 w-1/3 h-fit">
                            <p className="text-xl">Detail Terima</p>
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-col gap-1">
                                    <p className="text-xl">Kode Nasabah</p>
                                    <p className="text-gray-500">{customer?.code}</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-xl">Nama Nasabah</p>
                                    <p className="text-gray-500">{customer?.name}</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-xl">Jenis Nasabah</p>
                                    <p className="text-gray-500">{customer?.type}</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-xl">No. Faktur</p>
                                    <p className="text-gray-500">003/A/12/2025</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-xl">Tanggal Terima</p>
                                    <p className="text-gray-500">{format(transactionDate, 'dd MMMM yyyy')}</p>
                                </div>
                            </div>
                        </div>
                    }
                    <div className="flex flex-col gap-6 w-full">
                        <div className="flex flex-col rounded-xl border-1 border-gray-300 w-full">
                            <div className="flex flex-col gap-6 p-4">
                                <p className="text-xl">Daftar Terima Sampah</p>
                                {!isPreview ?
                                <div>
                                    <Calculator handler={{grandTotal: setCalcResult, reset: reset}} prevData={data}/>
                                </div>
                                :
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
                                        {data?.map((row, key) => {
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
                                }
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
                        {!isPreview &&
                        <div className="flex justify-end">
                            <div onClick={handlePreview} className="flex gap-1 items-center px-24 py-4 justify-center rounded-full border-1 bg-green-900 text-white hover:cursor-pointer">
                                <p className='text-lg font-semibold'>Selesai</p>
                            </div>
                        </div>
                        }
                        {isPreview &&
                        <div className="w-full flex flex-col gap-2">
                            <div onClick={handleEdit} className="flex gap-2 items-center px-8 py-4 justify-center rounded-full border-1 text-green-900  hover:cursor-pointer">
                                <EditSquareIcon sx={{width: '20px', height: '20px'}}/> <p className='text-base font-bold'>Edit</p>
                            </div>
                            <div onClick={handlePreview} className="flex gap-2 items-center px-4 py-4 justify-center rounded-full border-1 bg-green-900 text-white hover:cursor-pointer">
                               <ShareIcon  sx={{width: '24px', height: '24px'}}/> <p className='text-base font-semibold'>Kirim Nota</p>
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}