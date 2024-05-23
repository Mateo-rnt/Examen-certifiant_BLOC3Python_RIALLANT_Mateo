"use client";
import React from "react";
import logo from "../../../public/logo.png";
import Image from "next/image";
function Footer() {
  const footerNavs = [
    
  ];

  return (
    <footer className="text-gray-500 bg-white px-4 py-5 max-w-screen-xl mx-auto md:px-8">
      <div className="max-w-lg sm:mx-auto sm:text-center">
        <Image src={logo} className="w-32 sm:mx-auto" height={132} width={232} />
        <p className="leading-relaxed mt-2 text-[15px]">Billeterie des jeux olympique STUDI 2024</p>
      </div>
      <ul className="items-center justify-center mt-8 space-y-5 sm:flex sm:space-x-4 sm:space-y-0">
        {footerNavs.map((item, idx) => (
          <li className=" hover:text-gray-800">
            <a key={idx} href={item.href}>
              {item.name}
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-8 items-center justify-between sm:flex">
        <div className="mt-4 sm:mt-0">&copy; Matéo RIALLANT All rights reserved.</div>
      </div>
      <style jsx>{`
        .svg-icon path,
        .svg-icon polygon,
        .svg-icon rect {
          fill: currentColor;
        }
      `}</style>
    </footer>
  );
}

export default Footer;
