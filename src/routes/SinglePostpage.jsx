import { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { FaFacebookF, FaWhatsapp, FaLink } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiClock } from "react-icons/fi";
import { getPostBySlug, getRelatedPosts, getAdjacentPosts } from "@/services/postService";
import FloatingSocialBar from "@/components/FloatingSocialBar";
import ArticleFooter from "@/components/ArticleFooter";
import RelatedArticles from "@/components/RelatedArticles";

export default function SinglePostPage() {
  const { slug } = useParams();
  const [commentForm, setCommentForm] = useState({ name: "", email: "", content: "" });
  const [commentSuccess, setCommentSuccess] = useState(false);
  const [commentVersion, setCommentVersion] = useState(0);

  const post = useMemo(() => getPostBySlug(slug), [slug]);
  const related = useMemo(() => (post ? getRelatedPosts(slug, 4) : []), [slug, post]);
  const adjacent = useMemo(() => (post ? getAdjacentPosts(slug) : { prev: null, next: null }), [slug, post]);

  const comments = useMemo(() => {
    // commentVersion is a dependency to trigger re-read after posting
    void commentVersion;
    if (!post) return [];
    const stored = localStorage.getItem(`comments_${slug}`);
    return stored ? JSON.parse(stored) : [];
  }, [slug, post, commentVersion]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      id: Date.now(),
      name: commentForm.name,
      email: commentForm.email,
      content: commentForm.content,
      createdAt: new Date().toISOString(),
    };
    const updated = [...comments, newComment];
    localStorage.setItem(`comments_${slug}`, JSON.stringify(updated));
    setCommentVersion((v) => v + 1);
    setCommentForm({ name: "", email: "", content: "" });
    setCommentSuccess(true);
    setTimeout(() => setCommentSuccess(false), 3000);
  };

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center dark:bg-gray-950">
        <h1 className="text-5xl font-bold text-green-600 mb-4">Post Not Found</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Sorry, we couldn&apos;t find the post you&apos;re looking for.
        </p>
        <Link
          to="/posts"
          className="px-6 py-3 bg-green-700 text-white rounded-full hover:bg-green-600 transition-colors font-semibold"
        >
          Browse All Posts
        </Link>
      </div>
    );
  }

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="dark:bg-gray-950">
      {/* Floating Social Icons (left side) */}
      <FloatingSocialBar title={post.title} />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main Content */}
          <article className="lg:w-2/3">
            {/* Tags at top */}
            {post.tags && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.slice(0, 4).map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs font-semibold border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300 uppercase">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
              {post.title}
            </h1>

            {/* Category subtitle */}
            <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">{post.category}</p>

            {/* Author + Date + Share icons + Reading time */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <img
                  src={post.author?.image || "/authors/Jackson Wayne.png"}
                  alt={post.author?.name || "Author"}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">{post.author?.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Published {new Date(post.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {/* Inline share icons */}
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 transition-colors"><FaFacebookF size={16} /></a>
                <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-black dark:hover:text-white transition-colors"><FaXTwitter size={16} /></a>
                <a href={`https://wa.me/?text=${encodeURIComponent(post.title + " " + shareUrl)}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-green-500 transition-colors"><FaWhatsapp size={16} /></a>
                <a href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(shareUrl)}`} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"><FaLink size={16} /></a>
                <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 ml-2">
                  <FiClock size={14} /> {post.readingTime}min
                </span>
              </div>
            </div>

            {/* Video or Cover Image */}
            {post.video ? (
              <video controls className="w-full rounded-xl mb-8 shadow-lg" poster={post.image}>
                <source src={post.video} type="video/mp4" />
              </video>
            ) : (
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-72 md:h-[450px] object-cover rounded-xl mb-8 shadow-lg"
              />
            )}

            {/* Article Content */}
            <div
              className="prose prose-lg dark:prose-invert max-w-none mb-10 text-gray-800 dark:text-gray-300 prose-headings:text-green-800 dark:prose-headings:text-green-400 prose-a:text-green-600"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Article Footer (tags, prev/next, share buttons) */}
            <ArticleFooter post={post} prevPost={adjacent.prev} nextPost={adjacent.next} />

            {/* Comments Section */}
            <section className="border-t border-gray-200 dark:border-gray-700 pt-8 mt-10">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Comments ({comments.length})
              </h3>

              {comments.length > 0 ? (
                <div className="space-y-4 mb-8">
                  {comments.map((comment) => (
                    <div key={comment.id} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center text-white font-bold text-sm">
                          {comment.name?.charAt(0)?.toUpperCase() || "A"}
                        </div>
                        <span className="font-semibold text-gray-800 dark:text-white text-sm">{comment.name}</span>
                        <span className="text-xs text-gray-400">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm ml-10">{comment.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 dark:text-gray-500 mb-8">No comments yet. Be the first to share your thoughts!</p>
              )}

              <form onSubmit={handleCommentSubmit} className="space-y-4 bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Leave a Comment</h4>
                {commentSuccess && (
                  <p className="text-green-600 dark:text-green-400 text-sm font-medium">Comment posted successfully!</p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="text" placeholder="Your name" value={commentForm.name} onChange={(e) => setCommentForm({ ...commentForm, name: e.target.value })} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-green-500" required />
                  <input type="email" placeholder="Your email" value={commentForm.email} onChange={(e) => setCommentForm({ ...commentForm, email: e.target.value })} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-green-500" required />
                </div>
                <textarea placeholder="Write your comment..." value={commentForm.content} onChange={(e) => setCommentForm({ ...commentForm, content: e.target.value })} rows={4} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-green-500 resize-y" required />
                <button type="submit" className="px-6 py-2 bg-green-700 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors">
                  Post Comment
                </button>
              </form>
            </section>
          </article>

          {/* Sidebar - Related Articles */}
          <aside className="lg:w-1/3 space-y-8">
            <RelatedArticles posts={related} />

            {/* Author Bio Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow text-center">
              <h4 className="text-lg font-bold text-green-800 dark:text-green-400 mb-3">About the Author</h4>
              <img src={post.author?.image} alt={post.author?.name} className="w-20 h-20 rounded-full mx-auto mb-3 object-cover shadow-md" />
              <h5 className="font-semibold text-gray-900 dark:text-white">{post.author?.name}</h5>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{post.author?.bio}</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
