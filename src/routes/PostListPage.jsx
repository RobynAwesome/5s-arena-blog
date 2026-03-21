import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const allPosts = [
  { id: 1, title: "The Rise of 5-a-Side Football Culture", image: "/posts/Blog1.png", category: "Culture", author: "Jackson Wayne" },
  { id: 2, title: "Top 10 Football Legends Who Changed the Game", image: "/posts/blog2.png", category: "Legends", author: "Dent Prov" },
  { id: 3, title: "Mastering the Art of the Cross-Over Dribble", image: "/posts/blog3.png", category: "Skills", author: "Halley Watikise" },
  { id: 4, title: "Goal Celebrations That Became Iconic", image: "/posts/blog4.png", category: "Culture", author: "Johannes Cobelt" },
  { id: 5, title: "Women's Football: Breaking Barriers", image: "/posts/blog5.png", category: "Women's Game", author: "Hell Mandat" },
  { id: 6, title: "The Science Behind the Perfect Free Kick", image: "/posts/blog6.png", category: "Tactics", author: "Jackson Wayne" },
  { id: 7, title: "Street Football Around the World", image: "/posts/blog7.png", category: "Culture", author: "John Stu" },
  { id: 8, title: "Building Team Chemistry on Small Pitches", image: "/posts/blog8.png", category: "5-a-Side", author: "Dent Prov" },
  { id: 9, title: "Youth Development: Nurturing Future Stars", image: "/posts/blog9.jpg", category: "Development", author: "Halley Watikise" },
  { id: 10, title: "The Psychology of Penalty Kicks", image: "/posts/blog10.jpg", category: "Tactics", author: "Johannes Cobelt" },
  { id: 11, title: "Football Fashion: From Pitch to Street", image: "/posts/blog11.jpg", category: "Culture", author: "Hell Mandat" },
  { id: 12, title: "How Small-Sided Games Improve Your Touch", image: "/posts/blog12.jpg", category: "5-a-Side", author: "Jackson Wayne" },
  { id: 13, title: "The Evolution of Football Tactics", image: "/posts/blog13.jpg", category: "Tactics", author: "Dent Prov" },
  { id: 14, title: "Community Football: Building Bonds", image: "/posts/blog14.jpg", category: "Community", author: "John Stu" },
  { id: 15, title: "Fitness Tips for Weekend Warriors", image: "/posts/blog15.jpg", category: "Fitness", author: "Halley Watikise" },
  { id: 16, title: "The Art of the Perfect Pass", image: "/posts/blog16.jpg", category: "Skills", author: "Jackson Wayne" },
  { id: 17, title: "Stadium Atmospheres That Give You Chills", image: "/posts/blog17.jpg", category: "Culture", author: "Johannes Cobelt" },
  { id: 18, title: "Coaching Youth: Lessons From the Pros", image: "/posts/blog18.jpg", category: "Development", author: "Dent Prov" },
  { id: 19, title: "5-a-Side Tournament Strategies", image: "/posts/blog19.jpg", category: "5-a-Side", author: "Hell Mandat" },
  { id: 20, title: "Football and Mental Health", image: "/posts/blog20.jpg", category: "Wellness", author: "John Stu" },
];

const categories = ["All", "Culture", "Legends", "Skills", "Tactics", "5-a-Side", "Women's Game", "Development", "Community", "Fitness", "Wellness"];

export default function PostListPage() {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const sort = searchParams.get("sort");

  const filtered = selectedCategory === "All"
    ? allPosts
    : allPosts.filter((p) => p.category === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-green-900 mb-2">
        {sort === "trending" ? "Trending Posts" : sort === "popular" ? "Most Popular" : "All Posts"}
      </h1>
      <p className="text-gray-500 mb-8">Explore stories from the world of football</p>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === cat
                ? "bg-green-700 text-white"
                : "bg-white text-gray-600 hover:bg-green-100 border border-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Post Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((post) => (
          <Link
            to={`/${post.title.toLowerCase().replace(/\s+/g, "-")}`}
            key={post.id}
            className="group bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow"
          >
            <div className="overflow-hidden h-44">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <span className="text-xs font-semibold text-green-600 uppercase">{post.category}</span>
              <h3 className="text-md font-bold text-gray-900 mt-1 group-hover:text-green-700 transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-gray-400 mt-2">By {post.author}</p>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-400 py-12">No posts found in this category.</p>
      )}
    </div>
  );
}
