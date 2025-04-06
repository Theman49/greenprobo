import {useState} from 'react';
import { Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { ColorsArr } from '../../utils/Colors';

export default function Withdraw(){
    const [withdrawType, setWithdrawType] = useState('cash');

    const handleChange = (event) => {
        setWithdrawType(event.target.value)
    }

    return(
        <div>
			<div className="flex flex-col px-6 py-8 gap-6">
				<div className="flex flex-col gap-1">
					<p className="text-xl font-bold">Hasil Daur Ulang di Tanganmu</p>
					<p className="text-gray-500">Tarik saldo dan nikmati manfaatnya.</p>
				</div>
				<div className="bg-gray-200 h-[1px]"></div>
			</div>

            <div className="flex gap-4 px-6 w-full">
                <div className="flex flex-col gap-6 p-4 rounded-xl border-1 border-gray-200 w-1/3 h-fit">
                    <p className="text-xl font-bold">Formulir Penarikan Tabungan</p>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1 w-full">
                            <p>Jumlah</p>
                            <div className="flex items-center rounded-lg border-1 border-gray-300 w-full">
                                <div className="bg-gray-300 p-2 rounded">
                                    Rp
                                </div>
                                <div className="px-1 w-full">
                                    <input className="w-full text-gray-500" placeholder="Masukkan jumlah nominal penarikan"/>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <p>Keperluan</p>
                            <div className="flex items-center rounded-lg border-1 border-gray-300 w-full">
                                <div className="px-1 w-full">
                                    <textarea className="w-full text-gray-500" placeholder="Masukkan jumlah nominal penarikan"></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue={withdrawType}
                                name="radio-buttons-group"
                                onChange={handleChange}
                            >
                            <p>Metode Penarikan</p>
                            <div className="flex flex-col gap-2">

                                <div className="flex justify-between items-center pl-3 py-1 rounded-lg border-1 border-gray-300 w-full">
                                    <p className="text-gray-500">Tunai (Ambil di bank sampah)</p>
                                    <FormControlLabel 
                                        value="cash" 
                                        control={
                                            <Radio sx={{
                                                color: ColorsArr[0],
                                                '&.Mui-checked': {
                                                    color: ColorsArr[0],
                                                },
                                                }}
                                            />
                                        } 
                                        label="" 
                                        sx={{
                                            margin: "0px"
                                        }}
                                    />
                                </div>
                                <div className="flex justify-between items-center pl-3 py-1 rounded-lg border-1 border-gray-300 w-full">
                                    <p className="text-gray-500">Transfer Bank</p>
                                    <FormControlLabel 
                                        value="bank" 
                                        control={
                                            <Radio sx={{
                                                color: ColorsArr[0],
                                                '&.Mui-checked': {
                                                    color: ColorsArr[0],
                                                },
                                                }}
                                            />
                                        } 
                                        label="" 
                                        sx={{
                                            margin: "0px"
                                        }}
                                    />
                                </div>
                            </div>
                            </RadioGroup>
                        </div>
                        {withdrawType === 'bank' && 
                            <div className="flex flex-col gap-2">
                                <p className="text-xl">Detail Bank</p>
                                <div className="flex flex-col gap-1 w-full">
                                    <p>Nama Bank</p>
                                    <select className="rounded-lg border-1 border-gray-300 w-full">
                                        <option value="--">-- Pilih Bank --</option>
                                    </select>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}