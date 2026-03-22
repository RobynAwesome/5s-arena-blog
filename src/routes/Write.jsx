import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useAuth } from "@/context/AuthContext";

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "code-block"],
    ["link", "image"],
    ["clean"],
  ],
};

export default function Write() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthor } = useAuth();

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500 dark:text-gray-400 mb-4">You need to be signed in to write posts.</p>
        <button onClick={() => navigate("/login")} className="px-6 py-2 bg-green-600 text-white rounded-xl font-semibold">
          Sign In
        </button>
      </div>
    );
  }

  if (!isAuthor) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500 dark:text-gray-400 mb-4">Only authors and admins can write posts.</p>
        <p className="text-gray-400 dark:text-gray-500 text-sm mb-6">Apply for the author program on your profile page.</p>
        <button onClick={() => navigate("/profile")} className="px-6 py-2 bg-green-600 text-white rounded-xl font-semibold">
          Go to Profile
        </button>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim() || !category || !content.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const newPost = {
      id: Date.now(),
      slug,
      title,
      category,
      content,
      image: coverImage || "/postImages/postImg.jpeg",
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      author: { name: user.name, image: user.image || "/authors/Jackson Wayne.png" },
      readingTime: `${Math.max(1, Math.ceil(content.replace(/<[^>]*>/g, "").split(/\s+/).length / 200))} min read`,
      createdAt: new Date().toISOString(),
      views: 0,
      featured: false,
    };

    // Save to localStorage user posts
    const stored = localStorage.getItem("5s_user_posts");
    const userPosts = stored ? JSON.parse(stored) : [];
    userPosts.unshift(newPost);
    localStorage.setItem("5s_user_posts", JSON.stringify(userPosts));

    // Also add to managed posts for admin
    const managed = localStorage.getItem("5s_managed_posts");
    if (managed) {
      const managedPosts = JSON.parse(managed);
      managedPosts.unshift({ id: newPost.id, slug, title, category, author: user.name, createdAt: newPost.createdAt, status: "published" });
      localStorage.setItem("5s_managed_posts", JSON.stringify(managedPosts));
    }

    setSuccess(true);
    setTimeout(() => navigate(`/${slug}`), 1500);
  };

  if (success) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="text-green-500 text-5xl mb-4">&#10003;</div>
        <h2 className="text-2xl font-bold text-green-900 dark:text-green-400 mb-2">Post Published!</h2>
        <p className="text-gray-500 dark:text-gray-400">Redirecting to your post...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 dark:bg-gray-950 min-h-screen">
      <h1 className="text-3xl font-bold text-green-900 dark:text-green-400 mb-8">Write a New Post</h1>

      {error && (
        <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-400 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Post Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholder="Enter your post title..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            required
          >
            <option value="">Select a category</option>
            <option value="Culture">Culture</option>
            <option value="Legends">Legends</option>
            <option value="Skills">Skills</option>
            <option value="Tactics">Tactics</option>
            <option value="5-a-Side">5-a-Side</option>
            <option value="Women's Game">Women&apos;s Game</option>
            <option value="Development">Development</option>
            <option value="Fitness">Fitness</option>
            <option value="Community">Community</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cover Image URL</label>
          <input
            type="url"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholder="https://example.com/image.jpg"
          />
          {coverImage && (
            <img src={coverImage} alt="Cover preview" className="mt-3 w-full h-48 object-cover rounded-lg" />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tags (comma-separated)</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholder="football, tactics, culture"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Content</label>
          <div className="bg-white dark:bg-gray-800 rounded-lg">
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              modules={quillModules}
              placeholder="Write your post content here..."
              className="dark:text-white"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-8 py-3 bg-green-700 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors"
        >
          Publish Post
        </button>
      </form>
    </div>
  );
}
