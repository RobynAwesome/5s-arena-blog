import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTrophy,
  FaCalendarAlt,
  FaUsers,
  FaListOl,
  FaQuestionCircle,
  FaWhatsapp,
  FaChevronDown,
  FaChevronUp,
  FaMedal,
} from "react-icons/fa";
import { leagues, standings, faqItems, accentStyles } from "@/data/leagueData";

const posIcon = (pos) => {
  if (pos <= 3)
    return (
      <FaMedal
        size={12}
        className={
          pos === 1
            ? "text-yellow-400"
            : pos === 2
              ? "text-gray-300"
              : "text-amber-600"
        }
      />
    );
  return (
    <span style={{ color: "#6b7280", fontSize: "0.7rem", fontWeight: 700 }}>
      {pos}
    </span>
  );
};

export default function LeaguePage() {
  const [tab, setTab] = useState("season");
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    document.title = "Leagues & Tournaments — 5s Arena Blog";
    window.scrollTo(0, 0);
  }, []);

  const tabs = [
    {
      key: "season",
      label: "Current Season",
      icon: <FaCalendarAlt size={12} />,
    },
    { key: "standings", label: "Standings", icon: <FaListOl size={12} /> },
    { key: "join", label: "How to Join", icon: <FaQuestionCircle size={12} /> },
  ];

  return (
    <div style={{ background: "var(--color-bg)", minHeight: "100vh" }}>
      {/* ── Hero Header ── */}
      <div
        className="relative py-16 overflow-hidden text-center"
        style={{
          background:
            "linear-gradient(135deg, #052e16 0%, #0d1117 50%, #111827 100%)",
          borderBottom: "1px solid rgba(34,197,94,0.15)",
        }}
      >
        {/* Pitch lines */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg,transparent,transparent 60px,rgba(34,197,94,0.3) 60px,rgba(34,197,94,0.3) 61px),repeating-linear-gradient(90deg,transparent,transparent 100px,rgba(34,197,94,0.15) 100px,rgba(34,197,94,0.15) 101px)`,
          }}
        />
        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(234,179,8,0.08) 0%, transparent 60%)",
          }}
        />

        <motion.div
          className="relative z-10 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <div
            className="inline-flex items-center justify-center w-16 h-16 mb-5 rounded-full"
            style={{
              background: "rgba(234,179,8,0.15)",
              border: "1px solid rgba(234,179,8,0.3)",
              boxShadow: "0 0 20px rgba(234,179,8,0.15)",
            }}
          >
            <FaTrophy className="text-2xl text-yellow-400" />
          </div>
          <h1
            className="mb-3 gradient-text"
            style={{
              fontFamily: "'Bebas Neue',Impact,sans-serif",
              fontSize: "clamp(2.5rem,8vw,5rem)",
              letterSpacing: "0.05em",
              lineHeight: 1,
            }}
          >
            Leagues & Tournaments
          </h1>
          <p
            style={{
              fontFamily: "'Inter',sans-serif",
              color: "#9ca3af",
              fontSize: "1rem",
            }}
          >
            Compete with the best. Weekly 5-a-side leagues for every skill
            level.
          </p>
        </motion.div>
      </div>

      <div className="max-w-5xl px-4 py-10 mx-auto">
        {/* ── Tabs ── */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabs.map((t) => (
            <motion.button
              key={t.key}
              onClick={() => setTab(t.key)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer"
              style={{
                fontFamily: "'Montserrat',sans-serif",
                background:
                  tab === t.key
                    ? "rgba(34,197,94,0.2)"
                    : "rgba(255,255,255,0.05)",
                border:
                  tab === t.key
                    ? "1px solid rgba(34,197,94,0.5)"
                    : "1px solid rgba(255,255,255,0.1)",
                color: tab === t.key ? "#22c55e" : "#9ca3af",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t.icon} {t.label}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* ── Season Tab ── */}
          {tab === "season" && (
            <motion.div
              key="season"
              className="grid gap-6 md:grid-cols-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
            >
              {leagues.map((league, i) => {
                const a = accentStyles[league.accent];
                const full = league.teamsRegistered >= league.totalSlots;
                return (
                  <motion.div
                    key={league.id}
                    className="p-6 glass-card rounded-2xl"
                    style={{
                      borderColor: a.border,
                      boxShadow: `0 4px 20px ${a.glow}`,
                    }}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: i * 0.1,
                      type: "spring",
                      stiffness: 200,
                      damping: 22,
                    }}
                    whileHover={{ y: -6, boxShadow: `0 12px 40px ${a.glow}` }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <motion.span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{
                          background: a.dot,
                          boxShadow: `0 0 8px ${a.dot}`,
                        }}
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <h3
                        style={{
                          fontFamily: "'Oswald',sans-serif",
                          color: "#f9fafb",
                          fontSize: "0.95rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {league.name}
                      </h3>
                    </div>
                    <div
                      className="mb-5 space-y-2"
                      style={{
                        fontFamily: "'Inter',sans-serif",
                        fontSize: "0.75rem",
                        color: "#9ca3af",
                      }}
                    >
                      <p className="flex items-center gap-2">
                        <FaCalendarAlt size={10} style={{ color: a.text }} />
                        {league.day} · {league.time}
                      </p>
                      <p className="flex items-center gap-2">
                        <FaTrophy size={10} style={{ color: a.text }} />
                        {league.level}
                      </p>
                      <p className="flex items-center gap-2">
                        <FaUsers size={10} style={{ color: a.text }} />
                        {league.teamsRegistered}/{league.totalSlots} teams
                        registered
                      </p>
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <p
                          style={{
                            fontFamily: "'Bebas Neue',Impact,sans-serif",
                            color: "#f9fafb",
                            fontSize: "1.5rem",
                            letterSpacing: "0.03em",
                          }}
                        >
                          {league.price}
                        </p>
                        <p
                          style={{
                            fontFamily: "'Montserrat',sans-serif",
                            color: "#6b7280",
                            fontSize: "0.6rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                          }}
                        >
                          per team / season
                        </p>
                      </div>
                      <div className="text-right">
                        <p
                          style={{
                            fontFamily: "'Montserrat',sans-serif",
                            color: "#6b7280",
                            fontSize: "0.6rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                          }}
                        >
                          Starts
                        </p>
                        <p
                          style={{
                            fontFamily: "'Inter',sans-serif",
                            color: a.text,
                            fontSize: "0.75rem",
                            fontWeight: 600,
                          }}
                        >
                          {league.startDate}
                        </p>
                      </div>
                    </div>
                    {full && (
                      <div
                        className="py-2 mt-4 text-center rounded-xl"
                        style={{
                          background: "rgba(239,68,68,0.1)",
                          border: "1px solid rgba(239,68,68,0.3)",
                          fontFamily: "'Montserrat',sans-serif",
                          color: "#ef4444",
                          fontSize: "0.65rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                        }}
                      >
                        League Full
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/* ── Standings Tab ── */}
          {tab === "standings" && (
            <motion.div
              key="standings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
            >
              <div className="overflow-hidden glass-card rounded-2xl">
                <div
                  className="flex items-center gap-3 px-6 py-4"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <FaTrophy size={14} className="text-yellow-400" />
                  <h2
                    style={{
                      fontFamily: "'Oswald',sans-serif",
                      color: "#f9fafb",
                      fontSize: "0.9rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    Monday Night League — Season 3
                  </h2>
                </div>
                {/* Desktop Table */}
                <div className="hidden overflow-x-auto sm:block">
                  <table
                    className="w-full"
                    style={{
                      fontFamily: "'Inter',sans-serif",
                      fontSize: "0.75rem",
                    }}
                  >
                    <thead>
                      <tr
                        style={{
                          borderBottom: "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        <th
                          className="w-10 px-4 py-3 text-left"
                          style={{
                            color: "#6b7280",
                            fontFamily: "'Montserrat',sans-serif",
                            fontSize: "0.65rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                          }}
                        >
                          #
                        </th>
                        <th
                          className="px-4 py-3 text-left"
                          style={{
                            color: "#6b7280",
                            fontFamily: "'Montserrat',sans-serif",
                            fontSize: "0.65rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                          }}
                        >
                          Team
                        </th>
                        {["P", "W", "D", "L", "GF", "GA", "GD", "Pts"].map(
                          (h) => (
                            <th
                              key={h}
                              className="px-3 py-3 text-center"
                              style={{
                                color: "#6b7280",
                                fontFamily: "'Montserrat',sans-serif",
                                fontSize: "0.65rem",
                                textTransform: "uppercase",
                                letterSpacing: "0.1em",
                              }}
                            >
                              {h}
                            </th>
                          ),
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {standings.map((row) => (
                        <motion.tr
                          key={row.pos}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: row.pos * 0.05,
                            type: "spring",
                            stiffness: 200,
                          }}
                          className="transition-colors"
                          style={{
                            borderBottom: "1px solid rgba(255,255,255,0.04)",
                            background:
                              row.pos === 1
                                ? "rgba(234,179,8,0.06)"
                                : row.pos === 2
                                  ? "rgba(156,163,175,0.04)"
                                  : row.pos === 3
                                    ? "rgba(217,119,6,0.04)"
                                    : "transparent",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.background =
                              "rgba(255,255,255,0.03)")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.background =
                              row.pos === 1
                                ? "rgba(234,179,8,0.06)"
                                : row.pos === 2
                                  ? "rgba(156,163,175,0.04)"
                                  : row.pos === 3
                                    ? "rgba(217,119,6,0.04)"
                                    : "transparent")
                          }
                        >
                          <td className="px-4 py-3">{posIcon(row.pos)}</td>
                          <td
                            className="px-4 py-3"
                            style={{
                              fontWeight: 600,
                              color: row.pos <= 3 ? "#f9fafb" : "#9ca3af",
                            }}
                          >
                            {row.team}
                          </td>
                          <td
                            className="px-3 py-3 text-center"
                            style={{ color: "#9ca3af" }}
                          >
                            {row.p}
                          </td>
                          <td
                            className="px-3 py-3 text-center"
                            style={{ color: "#9ca3af" }}
                          >
                            {row.w}
                          </td>
                          <td
                            className="px-3 py-3 text-center"
                            style={{ color: "#9ca3af" }}
                          >
                            {row.d}
                          </td>
                          <td
                            className="px-3 py-3 text-center"
                            style={{ color: "#9ca3af" }}
                          >
                            {row.l}
                          </td>
                          <td
                            className="px-3 py-3 text-center"
                            style={{ color: "#9ca3af" }}
                          >
                            {row.gf}
                          </td>
                          <td
                            className="px-3 py-3 text-center"
                            style={{ color: "#9ca3af" }}
                          >
                            {row.ga}
                          </td>
                          <td
                            className="px-3 py-3 text-center"
                            style={{ color: "#9ca3af" }}
                          >
                            {row.gf - row.ga > 0 ? "+" : ""}
                            {row.gf - row.ga}
                          </td>
                          <td
                            className="px-3 py-3 text-center"
                            style={{
                              fontWeight: 800,
                              color: row.pos <= 3 ? "#22c55e" : "#d1d5db",
                            }}
                          >
                            {row.w * 3 + row.d}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Mobile Cards */}
                <div className="sm:hidden">
                  {standings.map((row) => (
                    <div
                      key={row.pos}
                      className="flex items-center gap-3 px-4 py-3"
                      style={{
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                        background:
                          row.pos <= 3
                            ? "rgba(255,255,255,0.02)"
                            : "transparent",
                      }}
                    >
                      <div className="flex-shrink-0 text-center w-7">
                        {posIcon(row.pos)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          style={{
                            fontFamily: "'Inter',sans-serif",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            color: row.pos <= 3 ? "#f9fafb" : "#9ca3af",
                          }}
                          className="truncate"
                        >
                          {row.team}
                        </p>
                        <p
                          style={{
                            fontFamily: "'Inter',sans-serif",
                            fontSize: "0.6rem",
                            color: "#6b7280",
                          }}
                        >
                          {row.p}P · {row.w}W {row.d}D {row.l}L · GD{" "}
                          {row.gf - row.ga > 0 ? "+" : ""}
                          {row.gf - row.ga}
                        </p>
                      </div>
                      <div
                        style={{
                          fontFamily: "'Bebas Neue',Impact,sans-serif",
                          fontSize: "1.1rem",
                          color: row.pos <= 3 ? "#22c55e" : "#d1d5db",
                        }}
                      >
                        {row.w * 3 + row.d}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Join Tab ── */}
          {tab === "join" && (
            <motion.div
              key="join"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
              className="space-y-10"
            >
              {/* Steps */}
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    step: 1,
                    title: "Register Your Team",
                    desc: "Gather a squad of at least 7 players and pick a team name.",
                  },
                  {
                    step: 2,
                    title: "Choose Your League",
                    desc: "Pick the day and level that suits your team best.",
                  },
                  {
                    step: 3,
                    title: "Pay League Fee",
                    desc: "Secure your spot with a once-off season fee per team.",
                  },
                  {
                    step: 4,
                    title: "Show Up & Play",
                    desc: "Turn up on match day and compete for the title!",
                  },
                ].map((s, i) => (
                  <motion.div
                    key={s.step}
                    className="p-6 text-center glass-card rounded-2xl"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: i * 0.08,
                      type: "spring",
                      stiffness: 200,
                      damping: 22,
                    }}
                    whileHover={{
                      y: -4,
                      boxShadow: "0 12px 30px rgba(34,197,94,0.1)",
                    }}
                  >
                    <div
                      className="flex items-center justify-center w-10 h-10 mx-auto mb-3 rounded-full"
                      style={{
                        background: "rgba(34,197,94,0.15)",
                        border: "1px solid rgba(34,197,94,0.3)",
                        boxShadow: "0 0 12px rgba(34,197,94,0.1)",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Bebas Neue',Impact,sans-serif",
                          color: "#22c55e",
                          fontSize: "1rem",
                        }}
                      >
                        {s.step}
                      </span>
                    </div>
                    <h3
                      style={{
                        fontFamily: "'Oswald',sans-serif",
                        color: "#f9fafb",
                        fontSize: "0.85rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {s.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "'Inter',sans-serif",
                        color: "#9ca3af",
                        fontSize: "0.75rem",
                        lineHeight: 1.6,
                      }}
                    >
                      {s.desc}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <motion.div
                className="p-8 text-center glass-card rounded-2xl"
                style={{ borderColor: "rgba(34,197,94,0.2)" }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, type: "spring", stiffness: 200 }}
              >
                <h3
                  style={{
                    fontFamily: "'Bebas Neue',Impact,sans-serif",
                    color: "#f9fafb",
                    fontSize: "1.5rem",
                    letterSpacing: "0.05em",
                    marginBottom: "0.5rem",
                  }}
                >
                  Ready to Register?
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter',sans-serif",
                    color: "#9ca3af",
                    fontSize: "0.8rem",
                    marginBottom: "1.5rem",
                    maxWidth: "24rem",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  Send us a WhatsApp with your team name, captain contact
                  details, and preferred league.
                </p>
                <motion.a
                  href="https://wa.me/27637820245?text=Hi%2C%20we%27d%20like%20to%20register%20our%20team%20for%20the%20league"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3 text-sm font-bold tracking-widest uppercase transition-all rounded-xl"
                  style={{
                    fontFamily: "'Montserrat',sans-serif",
                    background:
                      "linear-gradient(135deg, #15803d 0%, #22c55e 100%)",
                    color: "#fff",
                    boxShadow: "0 0 24px rgba(34,197,94,0.35)",
                    letterSpacing: "0.08em",
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 40px rgba(34,197,94,0.5)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaWhatsapp size={16} /> Register via WhatsApp
                </motion.a>
              </motion.div>

              {/* FAQ */}
              <div>
                <div className="mb-6 section-heading">
                  <h3
                    style={{
                      fontFamily: "'Oswald',sans-serif",
                      color: "#f9fafb",
                      fontSize: "1.1rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    Frequently Asked Questions
                  </h3>
                </div>
                <div className="space-y-3">
                  {faqItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="overflow-hidden glass-card rounded-xl"
                    >
                      <button
                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                        className="flex items-center justify-between w-full px-5 py-4 text-left cursor-pointer"
                      >
                        <span
                          style={{
                            fontFamily: "'Inter',sans-serif",
                            color: "#d1d5db",
                            fontSize: "0.85rem",
                            fontWeight: 600,
                          }}
                        >
                          {item.q}
                        </span>
                        {openFaq === idx ? (
                          <FaChevronUp
                            size={12}
                            style={{ color: "#22c55e", flexShrink: 0 }}
                          />
                        ) : (
                          <FaChevronDown
                            size={12}
                            style={{ color: "#6b7280", flexShrink: 0 }}
                          />
                        )}
                      </button>
                      <AnimatePresence>
                        {openFaq === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <p
                              className="px-5 pb-4"
                              style={{
                                fontFamily: "'Inter',sans-serif",
                                color: "#9ca3af",
                                fontSize: "0.8rem",
                                lineHeight: 1.6,
                              }}
                            >
                              {item.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
