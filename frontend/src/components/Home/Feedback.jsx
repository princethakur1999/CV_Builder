import { FaStar } from "react-icons/fa";

const feedbacks = [
  {
    id: 1,
    username: "John Doe",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    description: "This product is amazing! It really helped me with my work.",
    rating: 5,
  },
  {
    id: 2,
    username: "Jane Smith",
    photo: "https://randomuser.me/api/portraits/women/45.jpg",
    description: "I loved the quality and customer service. Highly recommend!",
    rating: 4,
  },
  {
    id: 3,
    username: "Alice Johnson",
    photo: "https://randomuser.me/api/portraits/women/23.jpg",
    description: "Great value for the price. Will buy again.",
    rating: 4,
  },
];

function Feedback() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-green-100 to-white py-12">
      <h2 className="text-3xl font-bold text-green-600 mb-6">User Feedback</h2>

      <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {feedbacks.map((feedback) => (
          <div
            key={feedback.id}
            className="bg-white bg-opacity-40 backdrop-blur-xl p-6 rounded-lg shadow-lg transform transition-transform duration-500 ease-in-out hover:scale-105 hover:shadow-xl flex flex-col items-center justify-center gap-4"
          >
            {/* User Photo */}
            <img
              src={feedback.photo}
              alt={feedback.username}
              className="w-16 h-16 rounded-full object-cover"
            />

            {/* User Name */}
            <div className="text-lg font-semibold text-green-700">
              {feedback.username}
            </div>

            {/* Description */}
            <p className="text-gray-700 text-sm mb-4 text-center">
              {feedback.description}
            </p>

            {/* Star Rating */}
            <div className="flex gap-1 w-[50%] mx-auto justify-center">
              {Array.from({ length: 5 }, (_, index) => (
                <FaStar
                  key={index}
                  className={`text-yellow-500 ${
                    index < feedback.rating
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Feedback;
