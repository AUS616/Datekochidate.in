import { useState, useEffect, useRef } from "react";

export default function AddSpotModal({ isOpen, onClose, onSubmit }) {
  const [query, setQuery] = useState("");
  const [selectedPlace, setSelectedPlace] = useState(null);
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);


  useEffect(() => {
    if (isOpen && window.google && inputRef.current) {
      autocompleteRef.current = new window.google.maps.places.Autocomplete(
        inputRef.current,
        { types: ["establishment"], componentRestrictions: { country: "in" } }
      );

      autocompleteRef.current.addListener("place_changed", () => {
        const place = autocompleteRef.current.getPlace();
        if (place) {
          setSelectedPlace({
            place_id: place.place_id,
            name: place.name,
          });
          setQuery(place.name);
        }
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPlace) {
      alert("Please select a place!");
      return;
    }

    
    await onSubmit(selectedPlace);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 ">
      <div className="bg-white border-black border-2 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 pixelify">Add a Spot</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for a place..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border border-2 p-2 rounded"
          />

          <button
            type="submit"
            className="pixelify border-black border-2 p-2.5 bg-[#A6FAFF] hover:bg-[#79F7FF] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF] rounded-md"
          >
            + Add Spot
          </button>
        </form>

        <button
          onClick={onClose}
          className="mt-3 text-sm text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
