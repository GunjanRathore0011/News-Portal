import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Intro Section */}
      <div className="w-full max-w-6xl px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left */}
          <div data-aos="fade-right">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              About TechTrendz
            </h2>
            <p className="text-gray-600 leading-relaxed">
              TechTrendz is your go-to portal for all things tech and startups.
              From AI innovations to product launches, we cover the latest with
              a commitment to clarity and credibility. Our mission is to keep
              curious minds informed, inspired, and ahead of the curve.
            </p>
          </div>

          {/* Right Image */}
          <div data-aos="fade-left">
            <img
              src="https://images.pexels.com/photos/723072/pexels-photo-723072.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Team Working"
              className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>

      {/* Behind TechTrendz Section */}
      <div className="w-full bg-white py-16 px-6" data-aos="fade-up">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Behind TechTrendz
          </h2>
          <p className="text-gray-600 text-lg mb-6 leading-relaxed">
            Hello! I'm <span className="font-semibold text-blue-600">Gunjan Rathore</span>,
            the creator of TechTrendz. As a tech enthusiast and aspiring full-stack
            developer, I built this platform to simplify tech and startup news for
            everyone. Whether it's the latest AI breakthrough or a budding startup’s
            journey, I aim to bring you stories that matter — curated, concise, and credible.
          </p>
          <img
            src="https://cdn-icons-png.flaticon.com/128/6997/6997662.png"
            alt="Creator Avatar"
            className="w-28 h-28 rounded-full mx-auto shadow-md"
          />
          <p className="text-gray-500 mt-4">Built with ❤️ using the MERN stack</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
