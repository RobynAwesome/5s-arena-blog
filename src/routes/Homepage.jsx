import { Link } from "react-router-dom";

const featuredPosts = [
  { id: 1, title: "The Rise of 5-a-Side Football Culture", image: "/posts/Blog1.png", author: "Jackson Wayne", authorImg: "/authors/Jackson Wayne.png", category: "Culture" },
  { id: 2, title: "Top 10 Football Legends Who Changed the Game", image: "/posts/blog2.png", author: "Dent Prov", authorImg: "/authors/Dent Prov.png", category: "Legends" },
  { id: 3, title: "Mastering the Art of the Cross-Over Dribble", image: "/posts/blog3.png", author: "Halley Watikise", authorImg: "/authors/Halley Watikise.png", category: "Skills" },
];

const recentPosts = [
  { id: 4, title: "Goal Celebrations That Became Iconic", image: "/posts/blog4.png", category: "Culture" },
  { id: 5, title: "Women's Football: Breaking Barriers", image: "/posts/blog5.png", category: "Women's Game" },
  { id: 6, title: "The Science Behind the Perfect Free Kick", image: "/posts/blog6.png", category: "Tactics" },
  { id: 7, title: "Street Football Around the World", image: "/posts/blog7.png", category: "Culture" },
  { id: 8, title: "Building Team Chemistry on Small Pitches", image: "/posts/blog8.png", category: "5-a-Side" },
  { id: 9, title: "Youth Development: Nurturing Future Stars", image: "/posts/blog9.jpg", category: "Development" },
];

export default function Homepage() {
  return (
    <div>
      {/* HERO SECTION */}
      <section
        className="relative h-[70vh] flex items-center justify-center text-white bg-cover bg-center"
        style={{ backgroundImage: "url('/backgrounds/football-legends-background-1.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">5s Arena Blog</h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            Football culture, stories, legends, and the beautiful game.
          </p>
          <Link
            to="/posts"
            className="inline-block px-8 py-3 bg-green-600 hover:bg-green-500 rounded-full font-semibold transition-colors"
          >
            Explore Posts
          </Link>
        </div>
      </section>

      {/* FEATURED POSTS */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-green-900 mb-8">Featured Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredPosts.map((post) => (
            <Link
              to={`/${post.title.toLowerCase().replace(/\s+/g, "-")}`}
              key={post.id}
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="overflow-hidden h-48">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <span className="text-xs font-semibold text-green-600 uppercase">{post.category}</span>
                <h3 className="text-lg font-bold text-gray-900 mt-1 group-hover:text-green-700 transition-colors">
                  {post.title}
                </h3>
                <div className="flex items-center gap-2 mt-3">
                  <img src={post.authorImg} alt={post.author} className="w-8 h-8 rounded-full object-cover" />
                  <span className="text-sm text-gray-500">{post.author}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* VIDEO HIGHLIGHT */}
      <section
        className="py-16 bg-cover bg-center relative"
        style={{ backgroundImage: "url('/backgrounds/football-legends-background-3.jpg')" }}
      >
        <div className="absolute inset-0 bg-green-900/80" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Watch the Action</h2>
          <p className="text-green-200 mb-8">Highlights, skills, and the energy of the game.</p>
          <video
            controls
            className="w-full rounded-xl shadow-2xl"
            poster="/backgrounds/football-legends-background-5.jpg"
          >
            <source src="/video-posts/goooooal.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* RECENT POSTS */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-green-900">Recent Posts</h2>
          <Link to="/posts" className="text-green-600 hover:text-green-800 font-semibold">
            View All &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentPosts.map((post) => (
            <Link
              to={`/${post.title.toLowerCase().replace(/\s+/g, "-")}`}
              key={post.id}
              className="group bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow"
            >
              <div className="overflow-hidden h-40">
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
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
