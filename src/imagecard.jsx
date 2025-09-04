export default function ImageCard({ spot }) {
  return (
    <div className="w-80 h-80 border-2 border-black rounded-md bg-white hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-x-1 hover:-translate-y-1">
      <a href="#" className="block w-full h-full cursor-pointer">
        <article className="w-full h-full flex flex-col">
          
          <figure className="w-full h-1/2 border-b-2 border-black">
            <img
              src={spot.image}
              alt={spot.name}
              className="w-full h-full object-cover"
            />
          </figure>

          
          <div className="px-4 py-3 flex-1 flex flex-col justify-between">
            <div>
              <p className="text-sm mb-1">⭐ {spot.rating}</p>
              <h1 className="text-lg font-bold mb-2 leading-tight">{spot.name}</h1>
              <p className="text-xs line-clamp-3">{spot.description}</p>
            </div>

            <strong className="text-sm mt-2 text-green-600">{spot.price}</strong>
          </div>
        </article>
      </a>
    </div>
  );
}