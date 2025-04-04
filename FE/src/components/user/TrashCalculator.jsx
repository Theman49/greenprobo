import {useState, useEffect, useRef} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { ColorsArr } from '../../utils/Colors';
import {dataset1, dataset3} from '../../data/Trash';
import { NumericFormat } from 'react-number-format';

const Calculator = () => {

    const RowItem = ({idx, handler}) => {
        const [trashType, setTrashType] = useState('--');
        const [listTrash, setListTrash] = useState([]);
        const [trashCode, setTrashCode] = useState('--');
        const [result, setResult] = useState('');
        const rTotal = useRef(null);

        useEffect(() => {
            console.log('CHANGED TRASH TYPE', trashType);
            setListTrash(dataset3[trashType])
            if(trashType === '--'){
                setResult('')
            }
        }, [trashType])


        const handleChange = (event) => {
            setTrashType(event.target.value)
        }
        const handleChangeTrashCode = (event) => {
            console.log("PILIH SAMPAH", event.target.value)
            setTrashCode(event.target.value)
        }
        const calcResult = () => {
            //const total = document.getElementById(`total${idx}`).value
            const total = rTotal.current.value
            const trash = dataset3[trashType]?.filter((item) => item.code === trashCode)[0]
            console.log("TRASH", trash)
            console.log("total", total)
            const tempResult = parseFloat(trash?.fee) * parseFloat(total)
            console.log("RESULT", tempResult)
            setResult(tempResult)
        }

        useEffect(() => {
            if(listTrash?.length){
                calcResult()
            }else{
                rTotal.current.value = 0
            }
        }, [trashType, trashCode, listTrash, rTotal])



        return(
            <div id={`row${idx}`} className="flex gap-2">
                <select value={trashType} onChange={handleChange} className="w-1/5">
                    <option value="--">--Jenis Sampah--</option>
                    {dataset1.detail.map((item, key) => {
                        return(
                            <option id={key} value={item.label}>{item.label}</option>
                        )
                    })}
                </select>
                <select value={trashCode} onChange={handleChangeTrashCode} className="w-2/5">
                    <option value="--">--Pilih Sampah--</option>
                    {listTrash?.map((item, key) => {
                        return(
                            <option id={key} value={item.code}>{item.name}</option>
                        )
                    })}
                </select>
                <input ref={rTotal} type="text" id={`total${idx}`} className="pl-2 border-1 border-gray-500 rounded-md w-[60px]" onChange={calcResult}/>
                <div className="flex items-center rounded-lg border-1 border-gray-300 w-[160px]">
                    <div className="bg-gray-300 p-2 rounded-md">
                        Rp
                    </div>
                    <div className="pl-1 w-full">
                        {result === '' && <p className="text-gray-300">Hasil</p>}
                        {result !== '' && <NumericFormat value={result} thousandSeparator="," className="w-full readonly"/>}
                    </div>
                </div>
                <div onClick={() => handler.delete(idx)} className="flex items-center text-bold text-xl hover:cursor-pointer">
                    <p>X</p>
                </div>
            </div>
        )

    }
    const addRow = () => {
        setWrapper((prevData) => [...prevData, {id: Date.now(), content: <RowItem idx={Date.now()} handler={{delete: deleteRow}} />}])
    }

    const deleteRow = (id) => {
        //console.log(wrapper)
        setWrapper((prevData) => prevData.filter((item) => item.id !== id))
    }
    const [wrapper, setWrapper] = useState([
        {
            id: Date.now(),
            content: <RowItem idx={Date.now()} handler={{delete: deleteRow}} />
        }
    ]);

    return(
        <div className="flex flex-col gap-2">
            <div id="wrapper" className="flex flex-col gap-2">
                {wrapper.map((item) => {
                    return item.content
                })}
            </div>
            <div className="flex justify-between gap-5">
                <button onClick={addRow} className="flex gap-1 items-center px-4 py-2 rounded-full border-1 border-green-900 text-green-900 w-1/4 hover:cursor-pointer">
                    <p>+</p>
                    <p>Tambah</p>
                </button>
                <button className="flex justify-center items-center px-4 py-2 rounded-full border-1 border-green-900 bg-green-900 text-white w-full hover:cursor-pointer">
                    <p>Hitung</p>
                </button>
            </div>

        </div>
    )
}

const ListTrashFee = () => {
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
        {dataset1.detail.map((item, key) => {
            return(
                <Tab id={key} value={item.label} label={item.label}/>
            );
        })}

        </Tabs>
            {dataset1.detail.map((item, key) => {
                const currData = dataset3[item.label];
                return(
                    <CustomTabPanel value={item.label} index={key} currValue={value}>
                        <table className="overflow-hidden rounded-t-xl w-full">
                            <thead>
                                <tr className="bg-gray-300">
                                    <th className="text-left p-2 w-2/3">Nama Sampah</th>
                                    <th className="p-2">Kode</th>
                                    <th className="p-2">Harga</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currData.map((row, key) => {
                                    return(
                                        <tr id={key}>
                                            <td className="p-2">{row.name}</td>
                                            <td className="p-2 text-center">{row.code}</td>
                                            <td className="flex p-2 text-center">Rp<NumericFormat value={row.fee} thousandSeparator="," className="w-full" /></td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </CustomTabPanel>
                );
            })}
        </div>
    );
}

export default function TrashCalculator(){
    return(
        <div>
			<div className="flex flex-col px-6 py-8 gap-6">
				<div className="flex flex-col gap-1">
					<p className="text-xl font-bold">Hitung Nilai Sampah Anda</p>
					<p className="text-gray-500">Estimasi nilai sampah Anda sebelum disetorkan.</p>
				</div>
				<div className="bg-gray-200 h-[1px]"></div>
			</div>

            <div className="flex gap-4 px-6 w-full">
                <div className="flex flex-col gap-6 p-4 rounded-xl border-1 border-gray-200 w-2/3">
                    <p className="text-xl font-bold">Kalkulator Sampah</p>

                    <div className="flex gap-2">
                        <Calculator />
                    </div>
                </div>
                <div className="flex flex-col gap-6 p-4 rounded-xl border-1 border-gray-200 w-1/3">
                    <p className="text-xl font-bold">Daftar Harga Sampah</p>
                    <ListTrashFee />
                </div>
            </div>
        </div>
    )
}