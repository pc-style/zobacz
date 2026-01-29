import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import GifDisplay from "../components/GifDisplay";

interface PageViewProps {
  slug: string | null;
  onNavigate: (path: string) => void;
}

export default function PageView({ slug, onNavigate }: PageViewProps) {
  const pages = useQuery(api.pages.list);
  const page = useQuery(api.pages.getBySlug, slug ? { slug } : "skip");

  if (!slug) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="text-center mb-12 animate-float">
          <h1 className="font-display text-5xl md:text-7xl text-white text-glow font-light tracking-wide mb-4">
            Zobacz
          </h1>
          <p className="text-white/50 font-light text-lg">
            wybierz strone ponizej
          </p>
        </div>

        <div className="grid gap-4 w-full max-w-md">
          {pages?.map((p) => (
            <button
              key={p._id}
              onClick={() => onNavigate(`/${p.slug}`)}
              className="glass rounded-2xl p-6 text-left transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group"
            >
              <h2 className="font-display text-xl md:text-2xl text-white/90 group-hover:text-white transition-colors">
                {p.title}
              </h2>
              {p.description && (
                <p className="text-white/40 mt-2 text-sm">{p.description}</p>
              )}
            </button>
          ))}
        </div>

        <button
          onClick={() => onNavigate("/admin")}
          className="mt-12 text-white/20 hover:text-white/40 text-sm transition-colors"
        >
          admin
        </button>
      </div>
    );
  }

  if (page === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
      </div>
    );
  }

  if (!page) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <h1 className="font-display text-3xl text-white/60 mb-6">
          nie znaleziono strony
        </h1>
        <button
          onClick={() => onNavigate("/")}
          className="glass rounded-xl px-6 py-3 text-white/70 hover:text-white transition-colors"
        >
          wroc
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <button
        onClick={() => onNavigate("/")}
        className="fixed top-6 left-6 glass rounded-full w-10 h-10 flex items-center justify-center text-white/40 hover:text-white/70 transition-colors"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </button>

      <div className="text-center max-w-lg mx-auto">
        <h1 className="font-display text-4xl md:text-6xl text-white text-glow font-light tracking-wide mb-6 animate-pulse-soft">
          {page.title}
        </h1>

        {page.description && (
          <p className="text-white/60 text-lg mb-8 font-light">
            {page.description}
          </p>
        )}

        {(page.gifUrl || page.gifKeywords) && (
          <div className="mb-8 animate-float">
            <GifDisplay gifUrl={page.gifUrl} keywords={page.gifKeywords} />
          </div>
        )}

        {page.deeplink && (
          <a
            href={page.deeplink}
            className="inline-block glass rounded-2xl px-8 py-4 text-white/80 hover:text-white font-display text-xl transition-all duration-300 hover:scale-105 active:scale-95"
          >
            {page.deeplinkLabel || `Otworz`}
          </a>
        )}
      </div>
    </div>
  );
}
