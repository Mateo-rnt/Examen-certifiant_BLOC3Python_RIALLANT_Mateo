import React from "react";

function Hero() {
  return (
    <section className="bg-gradient-to-b from-blue-500 to-blue-900 py-20 px-4 lg:px-0">
      <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center justify-between">
        <div className="text-center lg:text-left lg:w-1/2">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">Vivez les jeux Olympiques à la française</h1>
          <p className="text-lg lg:text-xl text-gray-200 mb-8">Rejoignez-nous pour célébrer le plus grand événement sportif du monde, où des athlètes du monde entier se rassemblent pour concourir et inspirer.</p>
        </div>
        <div className="lg:w-1/2 mt-10 lg:mt-0">
          <img src="/JOPARIS2024.webp" alt="Olympic Games" className="w-full rounded-lg shadow-xl" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
