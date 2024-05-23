"use client";
import React, { useState, useEffect } from "react";
import { useQRCode } from "next-qrcode";

function MyTicketsPage() {
  const [tickets, setTickets] = useState([]);
  const { Canvas } = useQRCode();

  const token = localStorage.getItem("accessToken"); 
  console.log("Token:", token);

  function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

  const userId = parseJwt(token).user_id;

  // Fonction pour récupérer les tickets depuis le backend
  const fetchTickets = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/tickets/user/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch tickets");
      }
      const data = await response.json();
      setTickets(data);
    } catch (error) {
      console.error("Erreur dans la récupération des tickets :", error);
    }
  };


  useEffect(() => {
    fetchTickets();
  }, []);

  const generateQRCodeForTicket = (key) => {
    return (
      <Canvas
        text={key}
        options={{
          errorCorrectionLevel: "M",
          margin: 3,
          scale: 4,
          width: 200,
          color: {
            dark: "#010599FF",
            light: "#FFBF60FF",
          },
        }}
      />
    );
  };

  return (
    <section className="py-16">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="max-w-md">
          <h1 className="text-gray-800 text-xl font-extrabold sm:text-2xl">Mes tickets</h1>
        </div>
        <ul className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {tickets.map((item, idx) => (
            <li key={idx} className="border rounded-lg">
              <div className="flex items-start justify-between p-4">
                <div className="space-y-2">
                  {generateQRCodeForTicket(item.key)}
                  <h4 className="text-gray-800 font-semibold">{item.event.name}</h4>
                  <p className="text-gray-600 text-sm">{new Date(item.event.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
                </div>
                <button className="text-gray-700 text-sm border rounded-lg px-3 py-2 duration-150 hover:bg-gray-100">{item.key}</button>
              </div>
              <div className="py-5 px-4 border-t flex gap-x-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
                </svg>
                {item.total_price}$ (x{item.quantity}) tickets
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default MyTicketsPage;
