import { useState } from "react";

export default function Write() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Connect to backend API
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-green-900 mb-8">Write a New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Post Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-lg"
            placeholder="Enter your post title..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            required
          >
            <option value="">Select a category</option>
            <option value="Culture">Culture</option>
            <option value="Legends">Legends</option>
            <option value="Skills">Skills</option>
            <option value="Tactics">Tactics</option>
            <option value="5-a-Side">5-a-Side</option>
            <option value="Women's Game">Women's Game</option>
            <option value="Development">Development</option>
            <option value="Fitness">Fitness</option>
            <option value="Community">Community</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
          <div className="w-full border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-green-500 transition-colors">
            <p className="text-gray-400">Click to upload or drag and drop</p>
            <p className="text-sm text-gray-300 mt-1">PNG, JPG up to 5MB</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={12}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-y"
            placeholder="Write your post content here..."
            required
          />
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
