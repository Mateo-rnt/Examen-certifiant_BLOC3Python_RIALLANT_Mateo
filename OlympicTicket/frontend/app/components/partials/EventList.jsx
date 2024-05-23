"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/events/");
      if (!response.ok) {
        throw new Error("Échec de la recherche d'événements");
      }
      const data = await response.json();
      const modifiedEvents = data.map((event) => ({
        ...event,
        description: event.description.substring(0, 100) + (event.description.length > 100 ? "..." : ""),
        date: new Date(event.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
      }));
      setEvents(modifiedEvents);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="mt-12 mx-auto px-4 max-w-screen-xl md:px-8">
      <div className="text-center">
        <h1 className="text-3xl text-gray-800 font-semibold">Acheter un Ticket</h1>
        <p className="mt-3 text-gray-500">Vous pouvez choisir un ticket selon l'événnement que vous souhaitez voir</p>
      </div>
      <div className="mt-12 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <article className="max-w-md mx-auto mt-4 shadow-lg border rounded-md duration-300 hover:shadow-sm" key={event.id}>
            <Link href={`/event/${event.id}`}>
              <img src={event.image} loading="lazy" alt={event.name} className="w-full h-48 rounded-t-md" />
              <div className="flex items-center mt-2 pt-3 ml-4 mr-2">
                <div className="ml-3">
                  <span className="block text-gray-900">{event.authorName}</span>
                  <span className="block text-gray-400 text-sm">{event.date}</span>
                </div>
              </div>
              <div className="pt-3 ml-4 mr-2 mb-3">
                <h3 className="text-xl text-gray-900">{event.name}</h3>
                <p className="text-gray-400 text-sm mt-1">{event.description}</p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export default EventList;
