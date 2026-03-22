import { FaFacebookF, FaPinterestP, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function FloatingSocialBar({ title = "" }) {
  const url = typeof window !== "undefined" ? window.location.href : "";
  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    { href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}`, icon: <FaFacebookF />, bg: "bg-blue-600 hover:bg-blue-700", label: "Facebook" },
    { href: `https://twitter.com/intent/tweet?url=${encoded}&text=${encodedTitle}`, icon: <FaXTwitter />, bg: "bg-black hover:bg-gray-800", label: "X" },
    { href: `https://pinterest.com/pin/create/button/?url=${encoded}&description=${encodedTitle}`, icon: <FaPinterestP />, bg: "bg-red-600 hover:bg-red-700", label: "Pinterest" },
    { href: `https://www.linkedin.com/shareArticle?mini=true&url=${encoded}&title=${encodedTitle}`, icon: <FaLinkedinIn />, bg: "bg-blue-700 hover:bg-blue-800", label: "LinkedIn" },
    { href: `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`, icon: <FaWhatsapp />, bg: "bg-green-500 hover:bg-green-600", label: "WhatsApp" },
  ];

  return (
    <div className="hidden lg:flex fixed left-4 top-1/2 -translate-y-1/2 z-40 flex-col gap-3">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${link.label}`}
          className={`w-11 h-11 flex items-center justify-center rounded-full text-white shadow-lg transition-all duration-200 ${link.bg}`}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
}
