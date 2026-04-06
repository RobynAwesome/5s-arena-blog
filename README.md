<div align="center">
  <img src="public/logo.png" alt="5s Arena Blog Logo" width="200"/>
  <h1>5's Arena Blog | Football Media Platform</h1>
  <p><strong>A professional-grade football content platform focused on 5-a-side culture, tactical content, fixtures, community stories, and creator-led publishing.</strong></p>
</div>

---

## Tech Stack

<div align="center">

### Frontend
![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![React Router](https://img.shields.io/badge/React_Router-6.30-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![TypeScript Ready](https://img.shields.io/badge/TypeScript_Ready-Configured-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.38-0055FF?style=for-the-badge&logo=framer&logoColor=white)

### Backend & Services
![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.2-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-8.x-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-9.3-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![JWT Auth](https://img.shields.io/badge/Auth-JWT-000000?style=for-the-badge)
![ImageKit](https://img.shields.io/badge/ImageKit-CDN-2F80ED?style=for-the-badge)

</div>

---

## Pro-Level Features

### Football Content and Publishing
* **Modern content hub:** homepage, post feeds, author profiles, and category-driven football storytelling.
* **Editor workflow:** write and publish capabilities for creators and admins.
* **Rich media support:** image and video-heavy pages optimized for fan engagement.
* **Tactical and league pages:** dedicated routes for fixtures, tactics, league updates, and community content.

### Platform and Admin Capabilities
* **Secure authentication layer:** register/login flow with JWT-based backend auth routes.
* **Comment system:** full post comments flow with backend persistence.
* **API-first backend:** modular Express routes for posts, auth, and comments.
* **Mongo-backed content model:** scalable persistence for users, posts, and discussions.

### User Experience and Performance
* **Mobile-first responsive UI:** optimized reading and browsing on phones and tablets.
* **Smooth motion interactions:** Framer Motion transitions for a premium UX feel.
* **PWA assets included:** manifest and service worker support for progressive enhancement.
* **SEO and social sharing assets:** robots, RSS feed, and rich media-ready structure.

---

## Installation & Setup

**1. Clone the Repository:**
```bash
git clone https://github.com/RobynAwesome/5s-Arena-Blog-v2.git
cd 5s-Arena-Blog
```

**2. Install Dependencies:**
```bash
npm install
```

**3. Configure Environment Variables:**
Create/update `.env` with your own values:
```env
# Frontend
VITE_IK_URL_ENDPOINT=your_imagekit_url_endpoint
VITE_IK_PUBLIC_KEY=your_imagekit_public_key
VITE_GOOGLE_CLIENT_ID=your_google_client_id

# Backend
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
PORT=5000
NODE_ENV=development
```

**4. Run the App:**
```bash
# Frontend
npm run dev

# Backend API (separate terminal)
npm run server
```

Visit `http://localhost:5173` to view the app.

---

## Project Structure

```text
src/                # Frontend app (routes, components, contexts, services)
server/             # Express API (routes, models, middleware, seed)
public/             # Static assets (logos, posts, backgrounds, videos, manifest)
```

---

## Contributing

We welcome contributions from the community.
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m "Add some AmazingFeature"`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## Support The Creator

Built with love by **Kholofelo Robyn Rababalela**.

* [Buy me a coffee on Ko-fi](https://ko-fi.com/robynawesome)
* [Support via PayPal](https://www.paypal.me/osheenviews)

---

## Stars

If you found this useful, please star the repo:

⭐⭐⭐ **Don't forget to star this repository!** ⭐⭐⭐
