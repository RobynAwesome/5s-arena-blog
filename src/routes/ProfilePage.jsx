import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiEdit3, FiShield, FiVideo, FiSend, FiChevronDown } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";

function Accordion({ title, icon: Icon, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-gray-900/80 border border-gray-800 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-800/50 transition-colors"
      >
        <span className="flex items-center gap-3 text-white font-semibold">
          <Icon className="text-green-500" size={20} />
          {title}
        </span>
        <FiChevronDown className={`text-gray-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="px-5 pb-5 border-t border-gray-800">{children}</div>}
    </div>
  );
}

export default function ProfilePage() {
  const { user, updateProfile, applyForAuthor, logout, isAuthor, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [editName, setEditName] = useState(user?.name || "");
  const [editUsername, setEditUsername] = useState(user?.username || "");
  const [autoPlay, setAutoPlay] = useState(user?.autoVideoPlay !== false);
  const [saved, setSaved] = useState(false);

  // Author application
  const [appReason, setAppReason] = useState("");
  const [appSample, setAppSample] = useState("");
  const [appSent, setAppSent] = useState(false);

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleSave = () => {
    updateProfile({ name: editName, username: editUsername, autoVideoPlay: autoPlay });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleApply = (e) => {
    e.preventDefault();
    applyForAuthor({ reason: appReason, sampleTopic: appSample });
    setAppSent(true);
  };

  const roleBadge = {
    admin: "bg-red-600 text-white",
    author: "bg-green-600 text-white",
    reader: "bg-gray-600 text-gray-300",
  };

  return (
    <div className="min-h-screen bg-gray-950 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="w-24 h-24 rounded-full bg-gray-800 border-2 border-green-500 mx-auto mb-4 flex items-center justify-center overflow-hidden">
            {user.image ? (
              <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <FiUser className="text-green-500" size={40} />
            )}
          </div>
          <h1 className="text-3xl font-bold text-white mb-1">{user.name}</h1>
          <p className="text-gray-400 text-sm mb-2">{user.email}</p>
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${roleBadge[user.role] || roleBadge.reader}`}>
            {user.role?.toUpperCase()}
          </span>
        </motion.div>

        <div className="space-y-4">
          {/* Profile Settings */}
          <Accordion title="Profile Settings" icon={FiEdit3} defaultOpen>
            <div className="space-y-4 pt-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Display Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Username</label>
                <input
                  type="text"
                  value={editUsername}
                  onChange={(e) => setEditUsername(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 outline-none"
                  placeholder="@username"
                />
              </div>
              <button
                onClick={handleSave}
                className="px-6 py-2.5 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-green-600/20"
              >
                {saved ? "Saved!" : "Save Changes"}
              </button>
            </div>
          </Accordion>

          {/* Preferences */}
          <Accordion title="Preferences" icon={FiVideo}>
            <div className="pt-4">
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-gray-300 group-hover:text-white transition-colors">
                  Auto-play videos on hover
                </span>
                <div
                  onClick={() => setAutoPlay(!autoPlay)}
                  className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${
                    autoPlay ? "bg-green-600" : "bg-gray-700"
                  }`}
                >
                  <div
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      autoPlay ? "translate-x-6" : ""
                    }`}
                  />
                </div>
              </label>
              <p className="text-xs text-gray-500 mt-2">When enabled, video posts will auto-play when you hover over them.</p>
              <button
                onClick={() => { updateProfile({ autoVideoPlay: autoPlay }); setSaved(true); setTimeout(() => setSaved(false), 2000); }}
                className="mt-3 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm rounded-lg transition-colors"
              >
                Save Preference
              </button>
            </div>
          </Accordion>

          {/* Account Info */}
          <Accordion title="Account Info" icon={FiShield}>
            <div className="pt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Email</span>
                <span className="text-gray-200">{user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Role</span>
                <span className="text-gray-200 capitalize">{user.role}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Member Since</span>
                <span className="text-gray-200">{new Date(user.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </Accordion>

          {/* Author Application (readers only) */}
          {!isAuthor && !isAdmin && (
            <Accordion title="Apply for Author Program" icon={FiSend}>
              <div className="pt-4">
                {appSent ? (
                  <div className="text-center py-6">
                    <div className="text-green-500 text-4xl mb-3">&#10003;</div>
                    <p className="text-white font-semibold">Application Submitted!</p>
                    <p className="text-gray-400 text-sm mt-1">We&apos;ll review your application and get back to you.</p>
                  </div>
                ) : (
                  <form onSubmit={handleApply} className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Why do you want to write for 5s Arena?</label>
                      <textarea
                        value={appReason}
                        onChange={(e) => setAppReason(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 outline-none resize-none h-24"
                        placeholder="Tell us about your passion for football writing..."
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Sample Article Topic</label>
                      <input
                        type="text"
                        value={appSample}
                        onChange={(e) => setAppSample(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 outline-none"
                        placeholder="e.g. The Evolution of Pressing in Modern Football"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-green-600/20"
                    >
                      Submit Application
                    </button>
                  </form>
                )}
              </div>
            </Accordion>
          )}

          {/* Admin link */}
          {isAdmin && (
            <button
              onClick={() => navigate("/admin")}
              className="w-full py-3 bg-gray-900/80 border border-gray-800 rounded-2xl text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors font-semibold flex items-center justify-center gap-2"
            >
              <FiShield className="text-red-500" /> Go to Admin Dashboard
            </button>
          )}

          {/* Logout */}
          <button
            onClick={() => { logout(); navigate("/"); }}
            className="w-full py-3 bg-red-900/30 border border-red-800 rounded-2xl text-red-400 hover:text-red-300 hover:bg-red-900/50 transition-colors font-semibold"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
