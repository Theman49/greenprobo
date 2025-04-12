import { useState } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";
import Card from "./Card";

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

import BgImage from "../assets/BgImage.svg";
import AboutUsImage from "../assets/about-us.svg";
import HowWeWorkImage from "../assets/how-we-work.svg";
import FeatureImage from "../assets/features.svg";
import FooterImage from "../assets/footer-image.svg";

import Article1 from "../assets/article1.svg";
import Article2 from "../assets/article2.svg";
import Article3 from "../assets/article3.svg";
import Article4 from "../assets/article4.svg";
import Article5 from "../assets/article5.svg";
import Article6 from "../assets/article6.svg";

import FacebookIcon from "../assets/facebook.svg";
import InstagramIcon from "../assets/instagram.svg";
import TwitterIcon from "../assets/twitter.svg";
import LinkedinIcon from "../assets/linkedin.svg";

const articles = [
	{
		time: 10,
		title: '',
		desc: '',
		date: '',
		imageSrc: Article1
	},
	{
		time: 10,
		title: '',
		desc: '',
		date: '',
		imageSrc: Article2
	},
	{
		time: 10,
		title: '',
		desc: '',
		date: '',
		imageSrc: Article3
	},
	{
		time: 10,
		title: '',
		desc: '',
		date: '',
		imageSrc: Article4
	},
	{
		time: 10,
		title: '',
		desc: '',
		date: '',
		imageSrc: Article5
	},
	{
		time: 10,
		title: '',
		desc: '',
		date: '',
		imageSrc: Article6
	},
]

const ControlledAccordion = ({summary, detail}) => {
	const [expanded, setExpanded] = useState(false);	

	const handleChange = (event, isExpanded) => {
		setExpanded(isExpanded);
	}

	return (
		<Accordion sx={{
				border: '1px solid #D0D4DA',
				borderRadius: '8px',
			}}
			expanded={expanded}
			onChange={handleChange}
			>
				<AccordionSummary
		          expandIcon={<ExpandMoreIcon />}
		          aria-controls="panel1-content"
		          id="panel1-header"
		          sx={{
					color: expanded ? '#14532D' : '#000000',

		          }}
		        >
		          <Typography component="span">{summary}</Typography>
		        </AccordionSummary>
		        <AccordionDetails
		          sx={{
					borderTop: '1px solid #D0D4DA',
					width: '95%'
		          }}
		        >
		        {detail}
		        </AccordionDetails>
		</Accordion>
	);
}

const handleClick = (event) => {
  const el = document.querySelector(`#${event.target.getAttribute('data-ref')}`);
  el.scrollIntoView();
}

const ViewSection = ({id, text}) => {

  return (
    <NavLink to={`#${id}`}>
      <p data-ref={id} onClick={(event) => handleClick(event)}>{text}</p>
    </NavLink>
  );        
}


export default function Home() {
	return(
		<div>
			<div className="absolute p-6 w-full">
				<Navbar/>
			</div>
			<div id="home" className="w-full">
				<div className="flex gap justify-between">
					<div id="hero-container" className="p-6 justify-center flex flex-col gap-8 w-3/5">
						<div className="flex flex-col gap-2">
							<h1 className="text-3xl">Bersama Membangun <div className="relative inline">Probolinggo<span className="absolute top-[80%] -z-10 left-0 bg-green-200 h-2 w-full"></span></div> yang Lebih Bersih dan <span className="text-green-900 italic">Hijau</span></h1>
							<p className="text-gray-500">Sampah Anda memiliki nilai yang bisa membantu lingkungan dan ekonomi lokal. Ayo simpan dan lihat bagaimana Anda bisa membuat perbedaan!</p>
						</div>
						<NavLink to="/login" className="bg-green-900 text-white w-fit px-4 py-2 rounded-full ">
							Masuk Sekarang
						</NavLink>
					</div>
					<div>
						<img src={BgImage} className="rounded-l-4xl"/>
					</div>
				</div>
			</div>
			<div id="about-us" className="flex p-6 gap-8 justify-center	pb-10">
				<img src={AboutUsImage} className="rounded-4xl	"/>
				<div className="flex flex-col gap-5">
					<div>
						<p className="text-green-900">About Us</p>
						<p className="text-3xl">Mengenal Lebih Dekat GreenProbolinggo</p>
					</div>
					<p className="text-gray-500">
						Di GreenProbo, kami percaya setiap tindakan kecil terhadap lingkungan berkontribusi pada perubahan besar. Didirikan di Kabupaten Probolinggo, kami adalah sebuah inisiatif yang bertujuan untuk mengedukasi dan memobilisasi masyarakat dalam upaya pelestarian lingkungan melalui pengelolaan sampah yang efektif dan berkelanjutan.
					</p>
				</div>
			</div>
			<div id="how-we-work" className="p-10 bg-gray-100">
				<div className="flex p-6 gap-8 justify-center rounded-xl bg-white">
					<div className="flex flex-col gap-6">
						<div className="flex flex-col gap-2">
							<div>
								<p className="text-green-900">How we work?</p>
								<p className="text-3xl">Cara Mudah Menuju Probolinggo Hijau</p>
							</div>
							<p className="text-gray-500">
								Ikuti langkah simpel ini untuk mulai berkontribusi pada lingkungan yang lebih baik.
							</p>
						</div>
						<div className="flex flex-col gap-8">
							<div className="flex flex-col gap-2">
								<p className="text-5xl font-thin">01</p>
								<div className="flex flex-col">
									<p>Datang ke Bank Sampah</p>
									<p className="text-gray-500">Kunjungi situs GreenProbolinggo, daftar, verifikasi akun Anda, dan pelajari teknik pemilahan sampah yang efektif melalui materi edukatif kami.</p>
								</div>
							</div>
							<div className="flex flex-col gap-2">
								<p className="text-5xl font-thin">02</p>
								<div className="flex flex-col">
									<p>Peneyetoran Sampah</p>
									<p className="text-gray-500">Atur jadwal penyetoran sampah melalui kalender online kami, lakukan penyetoran sesuai jadwal, dan konfirmasikan melalui sistem kami.</p>
								</div>
							</div>
							<div className="flex flex-col gap-2">
								<p className="text-5xl font-thin">03</p>
								<div className="flex flex-col">
									<p>Kumpulkan dan Tarik Uang</p>
									<p className="text-gray-500">Pantau berapa banyak sampah yang telah Anda setorkan melalui dashboard pengguna dan tukarkan sampah tersebut menjadi uang tunai sebagai bentuk penghargaan atas kontribusi Anda.</p>
								</div>
							</div>
						</div>
					</div>
					<img src={HowWeWorkImage} className="rounded-4xl	"/>
				</div>
			</div>
			<div id="features" className="flex flex-col gap-8 p-10">
				<div className="flex flex-col justify-center items-center">
					<p className="text-green-500">Features</p>
					<p className="text-3xl">Ubah Sampah Menjadi Keuntungan dengan GreenProbolinggo</p>
					<p className="text-gray-500">
						Temukan Bagaimana Teknologi dan Inisiatif Kami Memudahkan Anda Berkontribusi pada Lingkungan yang Lebih Baik
					</p>
				</div>
				<div className="flex gap-8">
					<img src={FeatureImage} className="rounded-4xl	"/>
					<div className="flex flex-col p-8 gap-8 rounded-xl bg-green-900 text-white">
						<div className="flex gap-8">
							<div className="flex flex-col gap-5">
								<div className="bg-green-100 rounded-full w-[48px] h-[48px]"></div>
								<div className="flex flex-col gap-2">
									<p className="text-lg font-bold">Edukasi Komprehensif</p>
									<p className="text-gray-100">Platform kami menyediakan berbagai sumber informasi seperti artikel, video, dan tutorial interaktif yang membantu Anda memahami dan menerapkan praktik pengelolaan sampah yang lebih baik.</p>
								</div>
							</div>
							<div className="flex flex-col gap-5">
								<div className="bg-green-100 rounded-full w-[48px] h-[48px]"></div>
								<div className="flex flex-col gap-2">
									<p className="text-lg font-bold">Pelacakan dan Analisis Sampah</p>
									<p className="text-gray-100">Gunakan dashboard kami untuk memantau dan menganalisis jumlah serta jenis sampah yang Anda kelola, membantu Anda melacak kemajuan Anda dalam pengelolaan sampah.</p>
								</div>
							</div>
						</div>
						<div className="flex gap-8">
							<div className="flex flex-col gap-5">
								<div className="bg-green-100 rounded-full w-[48px] h-[48px]"></div>
								<div className="flex flex-col gap-2">
									<p className="text-lg font-bold">Keamanan Data dan Privasi</p>
									<p className="text-gray-100">Keamanan data Anda terjamin dengan teknologi enkripsi canggih yang kami gunakan, memastikan bahwa semua informasi pribadi Anda aman dari akses tidak sah.</p>
								</div>
							</div>
							<div className="flex flex-col gap-5">
								<div className="bg-green-100 rounded-full w-[48px] h-[48px]"></div>
								<div className="flex flex-col gap-2">
									<p className="text-lg font-bold">Daur Ulang Untung</p>
									<p className="text-gray-100">Manfaatkan sistem tukar sampah menjadi uang yang kami sediakan untuk mendapatkan insentif finansial dari usaha daur ulang Anda.</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div id="article" className="flex flex-col gap-8 p-10 bg-gray-100">
				<div className="flex flex-col justify-center items-center">
					<p className="text-green-500">Artikel</p>
					<p className="text-3xl">Tambah Pengetahuanmu Tentang Bank Sampah!</p>
					<p className="text-gray-500">
						Banyak info menarik yang bisa Kamu eksplor tentang bank sampah
					</p>
				</div>

				<div className="grid grid-cols-3 gap-4">
				{articles.map((item, index) => {
					return <Card key={index} imageSrc={item.imageSrc} />
				})}
				</div>
			</div>
			<div id="faqs" className="flex flex-col gap-8 p-10">
				<div className="flex flex-col justify-center">
					<p className="text-green-500">FAQs</p>
					<p className="text-3xl">Pertanyaan yang Sering Ditanyakan</p>
					<p className="text-gray-500">
						Jawaban langsung untuk pertanyaan paling sering mengenai setoran sampah.
					</p>
				</div>
				<div className="flex flex-col gap-4">
					<ControlledAccordion 
						summary="Apa itu Greenproblinggo"
						detail="GreenProbolinggo adalah platform yang didedikasikan untuk meningkatkan keberlanjutan lingkungan melalui pengelolaan sampah yang efektif. Kami menyediakan layanan penyetoran sampah, edukasi lingkungan, dan penukaran saldo yang dihasilkan dari penyetoran sampah menjadi insentif finansial atau lainnya."
					/>
					<ControlledAccordion 
						summary="Bagaimana cara mendaftar  GreenProbolinggo?"
						detail="Untuk mendaftar, silakan kunjungi pusat GreenProbolinggo kami dengan membawa identitas yang valid. Tim kami akan membantu Anda dengan proses pendaftaran agar Anda dapat segera mulai menyetorkan sampah dan memanfaatkan layanan kami."
					/>
					<ControlledAccordion 
						summary="Bagaimana sistem penyetoran sampah bekerja?"
						detail="Sistem penyetoran sampah di GreenProbolinggo memungkinkan Anda untuk menyetorkan sampah di titik-titik kumpul yang telah ditentukan. Setiap kali Anda menyetorkan sampah, berat dan jenis sampah akan dicatat, dan Anda akan mendapatkan saldo sesuai dengan tarif pembelian sampah yang berlaku."
					/>
					<ControlledAccordion 
						summary="Di mana saya bisa melihat tarif sampah?"
						detail="Tarif sampah dapat Anda lihat di dashboard pengguna, khususnya di bagian simulasi penghasilan. Tarif ini akan membantu Anda menghitung potensi penghasilan dari setoran sampah Anda."
					/>
					<ControlledAccordion 
						summary="Bagaimana cara saya mengecek saldo saya?"
						detail="Anda dapat mengecek saldo yang Anda miliki melalui dashboard pengguna di website GreenProbolinggo. Setelah login, navigasikan ke bagian ‘Saldo Saya’ untuk melihat detail saldo terkini, termasuk total saldo, saldo yang telah digunakan, dan riwayat transaksi saldo."
					/>
				</div>
			</div>
			<div id="join-section" className="flex bg-green-900 rounded-t-3xl text-white pl-10 pt-10 pb-4 gap-8">
				<div className="flex flex-col justify-between">
					<div className="flex flex-col gap-8 w-4/5">
						<div className="flex flex-col gap-4">
							<p className="text-3xl">Ayo bergabung bersama Greenproblinggo 
	sekarang!</p>
							<p>Jadilah bagian dari perubahan positif! Daftar hari ini untuk memulai kontribusi Anda dalam menjaga lingkungan dengan GreenProbolinggo.</p>
						</div>
						<NavLink to="#" className="w-fit text-green-900 rounded-full px-6 py-3 bg-white">
							<p>Bergabung</p>
						</NavLink>
					</div>
			        <div className="flex items-center gap-4 text-white mb-3">
			          <ViewSection id='home' text='Beranda' />
			          <ViewSection id='about-us' text='Tentang Kami' />
			          <ViewSection id='how-we-work' text='Cara Kerja' />
			          <ViewSection id='features' text='Fitur' />
			          <ViewSection id='faqs' text='FAQs' />
			          <ViewSection id='article' text='Artikel' />
			        </div>

				</div>
				<img src={FooterImage} className="rounded-s-3xl overflow w-full" />
			</div>
			<div id="copyright" className="flex justify-between items-center px-10 py-4">
				<p className="text-gray-500">Copyright &copy; 2024 Cicle Studio All rights reserved</p>
				<div className="flex justify-between items-center gap-4">
					<NavLink to="#">
						<img src={InstagramIcon} />
					</NavLink>
					<NavLink to="#">
						<img src={InstagramIcon} />
					</NavLink>
					<NavLink to="#">
						<img src={TwitterIcon} />
					</NavLink>
					<NavLink to="#">
						<img src={LinkedinIcon} />
					</NavLink>
				</div>
			</div>
		</div>
	);
}