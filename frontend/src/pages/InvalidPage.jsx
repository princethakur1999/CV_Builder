import { useNavigate } from "react-router-dom";

function InvalidPage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-6xl font-extrabold text-red-600 mb-6">404</h1>
      <p className="text-xl text-gray-700 mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <div className="text-center">
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 mt-4 text-white bg-green-600 hover:bg-green-700 rounded-md shadow-lg text-md font-bold"
        >
          Go to Home Page
        </button>
      </div>
      <p className="mt-6 text-sm text-gray-500">
        You can also check the URL for typos or go back.
      </p>
    </div>
  );
}

export default InvalidPage;
