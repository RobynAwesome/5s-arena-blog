import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";

export default function NewsletterPopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("newsletter_dismissed");
    if (dismissed) return;

    const timer = setTimeout(() => {
      setShow(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShow(false);
    sessionStorage.setItem("newsletter_dismissed", "true");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => {
        handleClose();
      }, 2500);
    }
  };

  if (!show) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-[9998] backdrop-blur-sm" onClick={handleClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-[fadeInUp_0.3s_ease-out]">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <FiX size={20} />
          </button>

          {/* Logo */}
          <div className="flex justify-center mb-4">
            <img src="/logo.png" alt="5s Arena" className="w-16 h-16 rounded-full object-cover shadow-md" />
          </div>

          {submitted ? (
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">You&apos;re on the team!</h3>
              <p className="text-gray-500 dark:text-gray-400">Check your inbox for the latest stories from 5s Arena Blog.</p>
            </div>
          ) : (
            <>
              <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">
                Be the first to hear new stories from 5s Arena Blog
              </h3>
              <p className="text-center text-green-600 dark:text-green-400 text-sm mb-6">
                Join for free to get the latest football culture, stories, and updates sent right to your inbox.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-green-700 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors"
                >
                  Subscribe
                </button>
              </form>

              <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-4">
                No spam, ever. Unsubscribe anytime.
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
}
