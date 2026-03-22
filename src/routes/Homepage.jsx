import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getFeaturedPosts, getRecentPosts } from "@/services/postService";
import Newsletter from "@/components/Newsletter";
import NewsletterPopup from "@/components/NewsletterPopup";
import PostCard from "@/components/PostCard";

const featuredPosts = getFeaturedPosts();
const recentPosts = getRecentPosts(6);

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function Homepage() {
  return (
    <div className="dark:bg-gray-950">
      {/* Newsletter Popup (Medium-style) */}
      <NewsletterPopup />

      {/* HERO SECTION with animated background */}
      <section className="relative h-[70vh] flex items-center justify-center text-white overflow-hidden">
        {/* Animated background - slow Ken Burns zoom + pan */}
        <div
          className="absolute inset-0 bg-cover bg-center animate-hero-bg"
          style={{ backgroundImage: "url('/backgrounds/football-legends-background-1.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/55" />

        {/* Watermark Logo */}
        <img
          src="/logo.png"
          alt=""
          className="absolute right-8 bottom-8 w-32 h-32 opacity-20 pointer-events-none select-none hidden md:block"
        />

        <motion.div
          className="relative z-10 text-center px-4 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Hero Logo */}
          <img src="/logo.png" alt="5s Arena" className="w-24 h-24 mx-auto mb-4 drop-shadow-lg" />
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
        </motion.div>
      </section>

      {/* FEATURED POSTS */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <motion.h2
          className="text-3xl font-bold text-green-900 dark:text-green-400 mb-8 flex items-center gap-3"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <img src="/logo.png" alt="" className="w-8 h-8" />
          Featured Posts
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <PostCard post={post} index={index} />
            </motion.div>
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
          <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
            <img src="/logo.png" alt="" className="w-8 h-8" />
            Watch the Action
          </h2>
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
          <motion.h2
            className="text-3xl font-bold text-green-900 dark:text-green-400 flex items-center gap-3"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <img src="/logo.png" alt="" className="w-8 h-8" />
            Recent Posts
          </motion.h2>
          <Link to="/posts" className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 font-semibold">
            View All &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentPosts.map((post, index) => (
            <motion.div
              key={post.id}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <PostCard post={post} index={index} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <Newsletter />
    </div>
  );
}
