import React from "react";

function Steps() {
  const steps = [
    {
      number: "1",
      title: "Sign Up",
      description: "Create a free account to get started.",
    },
    {
      number: "2",
      title: "Log In",
      description: "Access your account securely.",
    },
    {
      number: "3",
      title: "Go to Account",
      description: "Navigate to your account dashboard.",
    },
    {
      number: "4",
      title: "Fill Your Details",
      description: "Provide your details.",
    },
    {
      number: "5",
      title: "Generate",
      description: "Click a button to generate your resume.",
    },
  ];

  return (
    <section className="w-full bg-gradient-to-br from-green-100 to-white py-12">
      <div className="container mx-auto px-6 md:px-12">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-green-600">Steps</h2>
          <p className="text-gray-600 mt-4 text-lg">
            Follow these steps to craft a professional profile with ease.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical Dotted Line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 top-0 h-full border-l-4 border-dotted border-green-300"></div>

          {/* Steps List */}
          <div className="flex flex-col items-center gap-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative flex items-center gap-6 w-full max-w-4xl"
              >
                {/* Step Number */}
                <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-r from-green-400 to-green-600 text-white text-2xl font-bold rounded-full shadow-lg">
                  {step.number}
                </div>

                {/* Step Content */}
                <div className="flex-1 bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 md:max-w-[80%]">
                  <h3 className="text-xl md:text-2xl font-semibold text-green-600 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-700 text-sm md:text-base">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Steps;
