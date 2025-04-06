import {useRef, useState, useEffect} from 'react';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import TollOutlinedIcon from '@mui/icons-material/TollOutlined';
import FolderDeleteOutlinedIcon from '@mui/icons-material/FolderDeleteOutlined';
import TransactionHistory from '../DataTable';
//import PieChart from '../PieChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { ColorsArr } from '../../utils/Colors';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import {dataset1, dataset2} from '../..//data/Trash';

const data = dataset1;

const ChartOne = () => {
	const parentRef = useRef(null);

	const [parentEl, setParentEl] = useState({
		width: 0,
		height: 0,
		paddingInline: 0,
	});

	const scaleSize = 1;
	const chartHeight = 220;

	useEffect(() => {
		if(parentRef.current){
			console.log('parent', parentRef.current.offsetWidth)
			const computePadInline = parseInt(window.getComputedStyle(parentRef.current).paddingInline);
			setParentEl({
				width: parentRef.current.offsetWidth,
				height: parentRef.current.offsetHeight,
				paddingInline: computePadInline
			})
		}
	}, [])

	const [month, setMonth] = useState(0);
	const handleChangeMonth = (event) => {
		setMonth(event.target.value);
	}

	return(
		<div ref={parentRef} className="flex flex-col gap-6 p-4 rounded-xl border-1 border-gray-200 w-1/3">
			<div className="flex justify-between items-center">
				<p>Jenis Sampah</p>
				<select
					id="select-month"
					value={month}
					label="Period"
					onChange={handleChangeMonth}
					className="rounded-full p-4 border-1 border-gray-500"
				>
					<option value={-1}>Bulan Sebelumnya</option>
					<option value={0}>Bulan Ini</option>
				</select>
			</div>
			<div className="flex flex-col gap-4">
				<div className="relative flex justify-center items-center">
					<PieChart
					series={[
						{
						data: data.detail,
						innerRadius: 60,
						outerRadius: 100,
						paddingAngle: 5,
						cornerRadius: 5,
						startAngle: 0,
						endAngle: 360,
						cx: (parentEl.width - parentEl.paddingInline) / 2,
						cy: chartHeight / 2,
						}
					]}
					colors={ColorsArr}
					width={parentEl.width * scaleSize}
					height={chartHeight * scaleSize}
					slotProps={{legend: {hidden: true}}}
					/>
					<div className="flex flex-col gap-1 justify-center items-center absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
						<p className="text-gray-500">Total Sampah</p>
						<p className="text-2xl font-bold">8.90</p>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-4">
					{data.detail.map((item,key) => {
						const percentage = (item.value / data.total * 100).toFixed(2);
						const bgClass = ColorsArr[key]
						return(
							<div key={key} className="flex gap-8 items-center">
								<div className="flex gap-2 items-center">
									<div className="rounded-full w-[16px] h-[16px]" style={{backgroundColor: bgClass}}></div>
									<p>{item.label}</p>
								</div>
								<p className="text-gray-500">{percentage}%</p>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}

const ChartTwo = () => {

	const dataset = dataset2;	
	  
	  const valueFormatter = (value) => {
		return `${value}`;
	  }


	const parentRef = useRef(null);

	const [parentEl, setParentEl] = useState({
		width: 0,
		height: 0,
		paddingInline: 0,
	});

	const chartHeight = 250;


	useEffect(() => {
		if(parentRef.current){
			console.log('parent', parentRef.current.offsetWidth)
			const computePadInline = parseInt(window.getComputedStyle(parentRef.current).paddingInline);
			setParentEl({
				width: parentRef.current.offsetWidth - computePadInline,
				height: parentRef.current.offsetHeight,
				paddingInline: computePadInline
			})
		}
	}, [])

	const chartSetting = {
		yAxis: [
		  {
			label: 'rainfall (mm)',
		  },
		],
		width: parentEl.width - (0.15 * parentEl.width),
		height: chartHeight,
		sx: {
		  [`.${axisClasses.left} .${axisClasses.label}`]: {
			transform: 'translate(-20px, 0)',
		  },
		},
	  };

	return(
		<div ref={parentRef} className="flex flex-col justify-center gap-6 p-10 rounded-xl border-1 border-gray-200 w-full">
			<div className="flex flex-col gap-2">
				<p>Rata Rata Setoran Sampah</p>
				<div className="flex justify-between items-end">
					<p><span className="text-5xl font-bold">8.75</span>/bulan</p>
					<div className="grid grid-cols-2 gap-4">
						{data.detail.map((item,key) => {
							const bgClass = ColorsArr[key]
							return(
								<div key={key} className="flex gap-8 items-center">
									<div className="flex gap-2 items-center">
										<div className="rounded-full w-[16px] h-[16px]" style={{backgroundColor: bgClass}}></div>
										<p>{item.label}</p>
									</div>
								</div>
							)
						})}
					</div>
				</div>
			</div>
			<div className="flex justify-end">			
				<BarChart
				colors={ColorsArr}
				dataset={dataset}
				xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
				series={[
					{ dataKey: 'plastik', label: 'plastik', valueFormatter },
					{ dataKey: 'kertas', label: 'kertas', valueFormatter },
					{ dataKey: 'logam', label: 'logam', valueFormatter },
					{ dataKey: 'beling', label: 'beling', valueFormatter },
				]}
				{...chartSetting}
				/>
			</div>
		</div>
	)

}

export default function Dashboard() {
	return(
		<div>
			<div className="flex flex-col px-6 py-8 gap-6">
				<div className="flex flex-col gap-1">
					<p className="text-xl font-bold">Dashboard Nasabah</p>
					<p className="text-gray-500">Halo Nasabah!</p>
				</div>
				<div className="bg-gray-200 h-[1px]"></div>
			</div>

			{/* Card Box */}
			<div className="flex flex-col px-6 pb-8 gap-4">
				<div className="flex justify-between gap-4">
					<div className="flex flex-col gap-8 text-white rounded-3xl p-4 w-full bg-green-900">
						<div className="flex justify-between items-center rounded-xl">
							<p className="text-xl">Total Tabungan</p>
							<div className="flex justify-center items-center p-2 rounded-full bg-white">
								<AccountBalanceWalletOutlinedIcon className="w-[20px] h-[20px] text-green-900"/>
							</div>
						</div>
						<div className="flex flex-col gap-2">
							<p className="text-3xl"><span className="text-sm">Rp</span>910.320</p>
							<div className="flex gap-1">
								<div className="flex justify-center items-center rounded bg-green-200 text-green-900 text-sm p-1">
									+5.42%
								</div>
								<p>dari bulan lalu</p>
							</div>
						</div>
					</div>
					<div className="flex flex-col gap-8 rounded-3xl p-4 w-full drop-shadow-sm border-1 border-gray-100">
						<div className="flex justify-between items-center rounded-xl">
							<p className="text-xl">Pendapatan Setoran</p>
							<div className="flex justify-center items-center p-2 rounded-full bg-green-200">
								<TollOutlinedIcon className="w-[20px] h-[20px] text-green-900"/>
							</div>
						</div>
						<div className="flex flex-col gap-2">
							<p className="text-3xl"><span className="text-sm">Rp</span>910.320</p>
							<div className="flex gap-1">
								<div className="flex justify-center items-center rounded bg-green-200 text-green-900 text-sm p-1">
									+5.42%
								</div>
								<p>dari bulan lalu</p>
							</div>
						</div>
					</div>
					<div className="flex flex-col gap-8 rounded-3xl p-4 w-full drop-shadow-sm border-1 border-gray-100">
						<div className="flex justify-between items-center rounded-xl">
							<p className="text-xl">Total Setoran Sampah</p>
							<div className="flex justify-center items-center p-2 rounded-full bg-red-100">
								<FolderDeleteOutlinedIcon className="w-[20px] h-[20px] text-red-500"/>
							</div>
						</div>
						<div className="flex flex-col gap-2">
							<p className="text-3xl"><span className="text-sm">Rp</span>910.320</p>
							<div className="flex gap-1">
								<div className="flex justify-center items-center rounded bg-red-100 text-red-500 text-sm p-1">
									-1.42%
								</div>
								<p>dari bulan lalu</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Charts */}
			<div className="flex gap-4 px-6 mb-8">
				<ChartOne />
				<ChartTwo />
			</div>

			{/* Data Table */}
			<div className="flex flex-col px-6">
				<div className="flex flex-col gap-6 p-4 rounded-xl border-1 border-gray-200">
					<div className="flex justify-between">
						<p className="text-lg">Riwayat Setoran</p>
						<p className="text-green-900">Lihat Semua</p>
					</div>
					<div>
						<TransactionHistory />
					</div>
				</div>
			</div>
		</div>
	)	
}