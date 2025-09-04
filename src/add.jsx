

export default function AddButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="pixelify fixed bottom-6 right-6 border-black border-2 p-2.5 bg-[#A6FAFF] hover:bg-[#79F7FF] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF] rounded-md"
      title="Add Spot"
    >
       + Add Spots
    </button>
  );
}