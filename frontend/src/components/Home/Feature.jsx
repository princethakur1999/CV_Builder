function Feature() {
  const features = [
    {
      title: "Easy to Use",
      description:
        "Quickly create professional resumes with our intuitive and user-friendly interface.",
      icon: (
        <svg
          className="w-12 h-12 text-green-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          ></path>
        </svg>
      ),
    },
    {
      title: "Download in PDF Format",
      description:
        "Export your resume in PDF format to ensure compatibility and convenience.",
      icon: (
        <svg
          className="w-12 h-12 text-green-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8c-2.28 0-4 1.72-4 4s1.72 4 4 4 4-1.72 4-4-1.72-4-4-4zm0-6v2m0 16v2m-6-6H4m16 0h-2m-2-8h2M6 12h2m8 8h2m-2-16h2M6 4h2"
          ></path>
        </svg>
      ),
    },
    {
      title: "Free",
      description:
        "EAccess all features at no cost and completely free for everyone.",
      icon: (
        <svg
          className="w-12 h-12 text-green-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 12h14m-7-7v14"
          ></path>
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-gradient-to-br from-green-100 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-green-600">Features</h2>
          <p className="text-gray-600 mt-4">
            Powerful tools to help you create the perfect resume.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glassmorphic-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-green-600 mb-4 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-700 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Feature;
