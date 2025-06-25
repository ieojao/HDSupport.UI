"use client"
import { useState, useEffect } from "react";
import { House } from "lucide-react";
import { useRouter } from "next/navigation";

const CardChamados: React.FC <{title: string; dados: number;}> = ({title, dados}) => {

    const [darkMode, setDarkMode] = useState(false);
    const toggleDarkMode = () => { 
      setDarkMode(!darkMode); 
  
      const newMode = !darkMode;
  
      setDarkMode(newMode);
  
      localStorage.setItem('darkMode', newMode ? 'enabled' : 'disabled')
  } 
  
  useEffect(() => {
  
    const storedMode = localStorage.getItem('darkMode');
    if (storedMode === 'enabled'){
      setDarkMode(true);
    }
  },
  
  []);
    return(
        <div className="w-full flex items-center justify-center">
             <div className="w-full h-30 px-5 py-5 bg-neutral-900 rounded-xl border-t-3 border-purple-500 space-y-3">
                <h1 className="text-slate-50">Chamados <b className="bg-gradient-to-r from-blue-600 to-cyan-500 font-bold inline-block text-transparent bg-clip-text">{title}</b></h1>
                <h1 className="text-slate-50 font-bold text-2xl">{dados}</h1>
            </div>
    </div>
    );
}

export default CardChamados