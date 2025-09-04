import Marque from "./marque"
import ImageCard from "./imagecard"
import AddButton from "./add"
import AddSpotModal from "./form" // <-- import modal
import React, { useState, useEffect } from "react"

export default function App() {
  const [spots, setSpots] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/")
      .then((res) => res.json())
      .then((data) => setSpots(data))
      .catch((err) => console.error(err));
  }, []);

  const handleAddSpot = async (spotData) => {
    try {
      const res = await fetch("http://127.0.0.1:5000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(spotData),
      });
      if (res.ok) {
        alert("Spot added successfully!");
      } else {
        alert("Error adding spot.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px] z-0 min-h-screen w-full">
      <div className="flex justify-center items-center pt-8 mb-5">
        <h1 className="text-7xl font-[Ephesis]">
          Date <br />
          <span className="text-[#bb0a1e]">Kochi</span> Date
        </h1>
      </div>

      <Marque />

      <div className="flex justify-center pt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl">
          {spots.map((spot) => (
            <ImageCard key={spot.id} spot={spot} />
          ))}
        </div>
      </div>

      {/* Add button */}
      <AddButton onClick={() => setIsModalOpen(true)} />

      {/* Modal */}
      <AddSpotModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddSpot}
      />
    </section>
  )
}
