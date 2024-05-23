"use client";
import React from "react";
import { useEffect, useState } from "react";
import logo from "../../../public/logo.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Navbar() {
  const router = useRouter();
  const [state, setState] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  function handleLogout() {
    try {
      localStorage.removeItem("accessToken");
      setIsAuthenticated(false);
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  }


  useEffect(() => {
    document.onclick = (e) => {
      const target = e.target;
      if (!target.closest(".menu-btn")) setState(false);
    };
  }, []);

  return (
    <nav className={`bg-white pb-5 md:text-sm ${state ? "shadow-lg rounded-xl border mx-2 mt-2 md:shadow-none md:border-none md:mx-2 md:mt-0" : ""}`}>
      <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8">
        <div className="flex items-center justify-between py-5 md:block">
          <Link href="/">
            <Image src={logo} width={120} height={50} alt="Logo" />
          </Link>
          
        </div>
        <div className={`flex-1 items-center mt-8 md:mt-0 md:flex ${state ? "block" : "hidden"} `}>
          {!isAuthenticated && (
            <div className="flex-1 gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0">
              <Link href="/auth/registration" className="block text-gray-700 hover:text-gray-900">
                Inscription
              </Link>
              <Link href="/auth/login" className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex">
                Connexion               
              </Link>
            </div>
          )}
          {isAuthenticated && (
            <div className="flex-1 gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0">
              <Link href="/tickets" className="block text-gray-700 hover:text-gray-900">
                Mes tickets
              </Link>
              <button onClick={handleLogout} className="block text-gray-700 hover:text-gray-900">
                Déconnexion
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
