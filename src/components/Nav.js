import Link from "next/link";
import { auth } from "../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";

export default function Nav(){
  const [user, loading] = useAuthState(auth);
  const [menu, setMenu] = useState(0);
  return(
    <div className="w-full  bg-white shadow-md fixed top-0">
      <nav className="flex  justify-between items-center sm:py-2 px-5 max-w-7xl mx-auto">
        <ul className="flex items-center gap-1 ">
          <Link href={"/"}>
            <button className="font-bold font-poppins text-xl"
              onClick={() => setMenu(0)}>Mimpikan.id</button>
          </Link>
          <div className="items-center gap-2 hidden sm:flex">
            <Link href={"/about"}>
            <button className={`font-inter py-2 px-3 rounded-md hover:bg-gray-100 ml-8 ${menu === 1 ? "bg-gray-100" : ""}`}
              onClick={() => setMenu(1)}>About us</button>
            </Link>
            <Link href={"/discover"}>
              <button className={`font-inter py-2 px-3 rounded-md hover:bg-gray-100  ${menu === 2 ? "bg-gray-100" : ""}`}onClick={() => setMenu(2)}>Discover</button>
            </Link>
            <Link href={"/community"}>
              <button className={`font-inter py-2 px-3 rounded-md hover:bg-gray-100  ${menu === 3 ? "bg-gray-100" : ""}`}onClick={() => setMenu(3)}>Community</button>
            </Link>
            
          </div>
          
        </ul>
        <ul className="flex items-center gap-5">
          {!user && (
            <Link href={"/auth/login"}>
              <button className="px-3 py-2 rounded-lg text-sm font-semibold bg-gray-100 text-slate-900 hover:bg-cyan-500 hover:text-white" onClick={() => setMenu(null)}>Join Now</button>
            </Link>
          )}
          {user && (
            <Link href={'/dashboard'} onClick={() => setMenu(0)} className="gap-2 items-center hover:bg-gray-100 py-2 px-3 rounded-md flex">
              <p className="font-semibold">{user.displayName.split(' ')[0]}</p>
              <img src={user.photoURL} className="w-8 h-8 rounded-full"/>
            </Link>
            
          )}
        </ul>
      </nav>
      <ul className="flex sm:hidden border-t-[1px]  border-t-slate-300 sm:text-base text-sm  px-3">
        <Link href={"/"}>
          <button className={ `font-inter py-2 px-3 ${menu === 0 ? "bg-gray-100" : ""}`} onClick={() => setMenu(0)}>Home</button>
        </Link>
        <Link href={"/about"}>
          <button className={ `font-inter py-2 px-3 ${menu === 1 ? "bg-gray-100" : ""}`} onClick={() => setMenu(1)}>About us</button>
        </Link>
        <Link href={"/discover"}>
          <button className={ `font-inter py-2 px-3 ${menu === 2 ? "bg-gray-100" : ""}`} onClick={() => setMenu(2)}>Discover</button>
        </Link>
        <Link href={"/community"}>
          <button className={ `font-inter py-2 px-3 ${menu === 3 ? "bg-gray-100" : ""}`} onClick={() => setMenu(3)}>Community</button>
        </Link>
      </ul>
    </div>
    
  )
}