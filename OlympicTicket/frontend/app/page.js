import Image from "next/image";
import Hero from "./components/partials/Hero";
import EventList from "./components/partials/EventList";

export default function Home() {
  return (
    <>
      <Hero />
      <EventList />
    </>
  );
}
