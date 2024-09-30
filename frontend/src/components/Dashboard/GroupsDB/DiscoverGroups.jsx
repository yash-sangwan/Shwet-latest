import { Groups } from "../../../assets/post";

const DiscoverGroups = () => {
  return (
    <div className="mt-8 px-4 md:px-6">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Discover Groups</h2>
      <p className="text-sm md:text-base text-white mb-6">Groups you might like</p>
      
      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Groups.map((space, index) => (
          <div
            key={index}
            className="bg-gray-800 text-white p-4 rounded-md shadow-md relative"
          >
            {/* Background Image Positioned at the Top Right */}
            <div className="absolute top-0 right-0 w-full h-16 overflow-hidden bg-gradient-to-t from-black">
              <img
                src={space.bg}
                alt="Background image"
                className="object-cover w-full h-full"
              />
            </div>

            {/* Icon */}
            <div className="relative flex justify-center items-center pt-6 mb-4 z-20">
              <img
                src={space.icon}
                alt={`${space.name} icon`}
                className="w-8 h-8 md:w-12 md:h-12"
              />
            </div>

            {/* Title and Description */}
            <div className="relative z-10">
              <h3 className="font-bold text-center text-sm md:text-lg">{space.name}</h3>
              <p className="mt-2 text-xs md:text-sm text-center">{space.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscoverGroups;
