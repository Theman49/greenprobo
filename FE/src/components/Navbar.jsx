import { NavLink } from "react-router-dom";
import Logo from '../assets/Logo.svg';

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

export default function Navbar() {
  return (
    <div>
      <nav className="flex justify-between items-center mb-6">
        <NavLink to="/">
          <div className="flex items-center gap-2">
            <img alt="Logo Greenprobo" className="h-10 inline" src={Logo}></img>
            <h1 className="text-green-900 text-xl">Greenprobolinggo</h1>
          </div>
        </NavLink>

        <div className="flex items-center gap-6 text-white">
          <ViewSection id='home' text='Beranda' />
          <ViewSection id='about-us' text='Tentang Kami' />
          <ViewSection id='how-we-work' text='Cara Kerja' />
          <ViewSection id='features' text='Fitur' />
          <ViewSection id='faqs' text='FAQs' />
          <ViewSection id='article' text='Artikel' />
          {
            /*
          <NavLink to="#home">
            <p>Beranda</p>
          </NavLink>
          <NavLink to="#about-us">
            <p>Tentang Kami</p>
          </NavLink>
          <NavLink to="#how-we-work">
            <p>Cara Kerja</p>
          </NavLink>
          <NavLink to="#features">
            <p>Fitur</p>
          </NavLink>
          <NavLink to="#faqs">
            <p>FAQs</p>
          </NavLink>
          <NavLink to="#article">
            <p>Artikel</p>
          </NavLink>
            */
          <NavLink to="/login">
            <p className="bg-green-900 rounded-full px-4 py-2 hover:cursor">Masuk</p>
          </NavLink>
          }
        </div>

      </nav>
    </div>
  );
}