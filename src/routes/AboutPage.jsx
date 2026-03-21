export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-green-900 mb-6">About 5s Arena</h1>
      <img
        src="/posts/about.png"
        alt="About 5s Arena"
        className="w-full rounded-xl mb-8 shadow-lg"
      />
      <div className="prose prose-lg text-gray-700 space-y-4">
        <p>
          Welcome to <strong>5s Arena Blog</strong> — your ultimate destination for football
          culture, stories, legends, and the beautiful game.
        </p>
        <p>
          We celebrate the sport from grassroots to glory. Whether it's the latest tactical
          breakdowns, legendary player profiles, or the culture surrounding 5-a-side football,
          we've got you covered.
        </p>
        <p>
          Our team of passionate writers and football enthusiasts bring you fresh content daily,
          covering everything from match analysis to the stories behind the game that don't
          make the headlines.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
        {["Dent Prov.png", "Halley Watikise.png", "Jackson Wayne.png", "Johannes-Cobelt.png"].map(
          (author) => (
            <div key={author} className="text-center">
              <img
                src={`/authors/${author}`}
                alt={author.replace(".png", "")}
                className="w-24 h-24 rounded-full mx-auto mb-2 object-cover shadow-md"
              />
              <p className="text-sm font-medium text-gray-700">
                {author.replace(".png", "").replace(/-/g, " ")}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
