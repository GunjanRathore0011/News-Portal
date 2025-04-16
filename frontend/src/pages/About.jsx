import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';



const AboutUs = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);
  
  return (
    <div className="bg-black text-white px-6 py-16 md:px-20">
      {/* Header */}
      <section data-aos="fade-up" className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">
          About <span className="text-gray-400">TechTrendz</span>
        </h1>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
          Your daily destination for curated tech and startup stories — clear, sharp, and noise-free.
        </p>
      </section>

      {/* Our Mission */}
      <section data-aos="fade-up" className="mb-20">
        <h2 className="text-3xl font-semibold mb-4 border-l-4 border-gray-500 pl-4">Our Mission</h2>
        <p className="text-gray-400 max-w-4xl">
          In a world overwhelmed by information, <span className="text-white font-medium">TechTrendz</span> brings clarity. 
          We exist to deliver insightful, reliable, and focused coverage on the latest in tech, startups, and digital innovation. 
          Whether you're a developer, entrepreneur, or just a curious reader, our content is built to inform, inspire, and empower.
        </p>
      </section>

      {/* Why TechTrendz */}
      <section data-aos="fade-up" className="mb-20">
        <h2 className="text-3xl font-semibold mb-4 border-l-4 border-gray-500 pl-4">Why TechTrendz?</h2>
        <div className="grid md:grid-cols-3 gap-8 mt-6">
          {[
            {
              title: "Focused Content",
              desc: "We dive into the *why* behind the headlines — giving you insights, not noise.",
            },
            {
              title: "Design First",
              desc: "Clean, distraction-free design so you can enjoy reading anytime, anywhere.",
            },
            {
              title: "Community Driven",
              desc: "We believe in collaboration and want to grow with creators, readers, and changemakers.",
            },
          ].map((card, i) => (
            <div
              key={i}
              data-aos="zoom-in"
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-md hover:shadow-white/10 transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
              <p className="text-gray-400">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Vision */}
      <section data-aos="fade-up" className="mb-20">
        <h2 className="text-3xl font-semibold mb-4 border-l-4 border-gray-500 pl-4">Our Vision</h2>
        <p className="text-gray-400 max-w-4xl">
          We aim to become the go-to platform for all things tech — not just news, but deep dives, 
          explainers, interviews, and more. We’re here for the long run, building trust and community.
        </p>
      </section>

      {/* Call to Action */}
      <section data-aos="fade-up" className="text-center mt-20">
        <h3 className="text-2xl font-bold mb-4">Want to be a part of TechTrendz?</h3>
        <p className="text-gray-400 mb-6">
          Whether you're a writer, tech enthusiast, or startup founder with a story, we’d love to hear from you.
        </p>
        <a
          href="/contact"
          className="inline-block bg-white text-black font-semibold py-3 px-6 rounded-full hover:bg-gray-200 transition"
        >
          Contact Us
        </a>
      </section>
    </div>
  );
};

export default AboutUs;
