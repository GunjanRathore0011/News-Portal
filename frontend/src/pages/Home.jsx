import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Advertise from "@/components/shared/Advertise";
import PostCard from "@/components/shared/PostCard";
import AOS from "aos";
import "aos/dist/aos.css"; // Don't forget to import AOS CSS!

const Home = () => {
  const [posts, setPosts] = useState([]);
  const API_BASE = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`${API_BASE}/post/getPosts?limit=8`, {
        credentials: 'include',
      });
      const data = await res.json();
      if (res.ok) {
        setPosts(data.posts);
      }
    };

    fetchPosts();
    AOS.init(); // Initialize AOS
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-6 p-28 max-w-6xl mx-auto">
        <h1
          className="text-4xl font-bold text-blue-800"
          data-aos="fade-up" // Add AOS animation
          data-aos-duration="1000" // Optional: Animation duration
        >
          Welcome to <span className="text-red-600"> Tech Trendz</span>
        </h1>

        <p
          className="text-gray-600 mt-3 text-lg"
          data-aos="fade-up"
          data-aos-duration="1200"
        >
          From AI breakthroughs to startup stories, Tech Trendz brings you handpicked headlines and expert insights—daily.
        </p>

        <p
          className="text-gray-500 mt-1 italic"
          data-aos="fade-up"
          data-aos-duration="1400"
        >
          Stay informed, stay ahead.
        </p>

        <Link to={"/search"}>
          <Button
            className="bg-yellow-400 hover:bg-yellow-600 text-black py-3 px-6 rounded-full font-semibold shadow-lg flex items-center gap-2 w-fit"
            data-aos="zoom-in"
            data-aos-duration="1000"
          >
            View all posts <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>
      </div>

      <section className="pb-16 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2
            className="text-4xl font-bold mb-8 text-gray-800"
            data-aos="fade-up"
            data-aos-duration="1500"
          >
            Why You'll Love Tech Trendz
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              title={"Tech-First Coverage"}
              description={
                "Stay ahead with news tailored to the latest in startups, innovation, gadgets, and emerging tech trends."
              }
              icon="🧠"
            />

            <FeatureCard
              title={"Built by the Community"}
              description={
                "Join a passionate network of tech enthusiasts, founders, and writers contributing real insights and curated stories."
              }
              icon="🤝"
            />

            <FeatureCard
              title={"Smart & Intuitive"}
              description={
                "From personalized recommendations to easy navigation, experience a platform designed for modern readers."
              }
              icon="⚡"
            />
          </div>
        </div>
      </section>

      <div className="p-3 bg-white w-[90%] mx-auto">
        <Advertise />
      </div>

      <div className="max-w-8xl mx-auto p-3 flex flex-col gap-8 py-7">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2
              className="text-3xl font-bold text-slate-700 ml-5 mb-7 mt-7"
              data-aos="fade-up"
              data-aos-duration="1600"
            >
              Recent Posts
            </h2>

            <div className="flex flex-wrap gap-4 mx-auto justify-center">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>

            <Link
              to={"/search"}
              className="text-lg hover:underline text-center font-semibold"
              data-aos="fade-up"
              data-aos-duration="1700"
            >
              View all news
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

const FeatureCard = ({ title, description, icon }) => {
  return (
    <div
      className="p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center " 
      data-aos="fade-up"
      data-aos-duration="1800"
    >
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Home;
