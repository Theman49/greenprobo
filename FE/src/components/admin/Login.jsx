import { NavLink } from 'react-router-dom';
import { useState } from 'react';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import FooterImage from "../../assets/footer-image.svg";
import Logo from "../../assets/logo.svg";


export default function Login() {
	const [showPass,setShowPass] = useState(false);

	const togglePassword = () => {
		const elPass = document.getElementById('password');
		if(elPass.type === 'password'){
			setShowPass(true);
		}else{
			setShowPass(false);
		}
	}
	return(
		<div className="flex justify-between">
			<div id="form" className="flex flex-col">
				<div className="flex flex-col p-10">
			        <NavLink to="/">
			          <div className="flex items-center gap-2">
			            <img alt="Logo Greenprobo" className="h-10 inline" src={Logo}></img>
			            <h1 className="text-green-900 text-xl">Greenprobolinggo</h1>
			          </div>
			        </NavLink>

			        <div className="flex flex-col gap-12 mt-[100px]">
			        	<div className="flex flex-col gap-2">
				          <p className="text-4xl">Selamat Datang,<br/><span className="font-bold">Admin!</span></p>
				          <p className="text-gray-500 text-thin">Masuk untuk melanjutkan membuat perbedaan  bersama kami.</p>
			          	</div>
			          	<div className="flex flex-col gap-4">
			          		<div className="flex flex-col">
				          		<p>ID Pengguna</p>
				          		<input className="rounded p-2 border-1 border-gray-300 placeholder:text-gray-400" placeholder="Masukkan nomor id anda"/>
			          		</div>
			          		<div className="flex flex-col relative">
				          		<p>Kata Sandi</p>
				          		<input id="password" type={(showPass) ? 'text' : 'password'} className="w-full rounded p-2 border-1 border-gray-300 placeholder:text-gray-400" placeholder="Masukkan kata sandi"/>
				          		{
				          			(showPass === false) ? 
				          		<VisibilityIcon className="z-100 absolute top-[45%] right-[3%] w-[48px] h-[48px] text-gray-300" onClick={togglePassword}/>
				          			:
				          		<VisibilityOffIcon className="z-100 absolute top-[45%] right-[3%] w-[48px] h-[48px] text-gray-300" onClick={togglePassword}/>
					          	}
			          		</div>
			          		<button className="hover:cursor-pointer bg-green-900 text-white rounded-full w-full p-3">
							  <NavLink to="/admin/dashboard">Masuk</NavLink>
							</button>
							<a href="/login" className="text-green-900 underline text-center">Masuk sebagai Nasabah</a>
			          	</div>
			        </div>

		        </div>
			</div>
			<div id="right-section" className="p-6">
				<div className="flex flex-col pt-10 pl-8 rounded-3xl rounded-br-none bg-radial from-[#16A24A] to-[#14532D] gap-12">
					<div className="flex flex-col gap-2 text-white">
						<p className="text-xl">Jelajahi Perjalanan Lingkungan Anda dengan Greenporbolinggo</p>
						<p className="text-regular text-thin">Setiap setoran Anda berkontribusi nyata terhadap dampak lingkungan.</p>
					</div>
					<div className="overflow-hidden h-[800px]">
						<img src={FooterImage} className="w-[1000px]"/>
					</div>
				</div>
			</div>
		</div>
	);
}