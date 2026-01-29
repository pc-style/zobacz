import { useState, useEffect } from "react";

interface GifDisplayProps {
  gifUrl?: string;
  keywords?: string;
}

export default function GifDisplay({ gifUrl, keywords }: GifDisplayProps) {
  const [randomGif, setRandomGif] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (gifUrl) {
      setRandomGif(null);
      return;
    }

    if (keywords) {
      setLoading(true);
      setError(false);
      
      const fetchGif = async () => {
        try {
          const response = await fetch(
            `https://g.tenor.com/v1/random?q=${encodeURIComponent(keywords)}&key=LIVDSRZULELA&limit=1&media_filter=minimal`
          );
          const data = await response.json();
          if (data.results?.[0]?.media?.[0]?.gif?.url) {
            setRandomGif(data.results[0].media[0].gif.url);
          } else {
            setError(true);
          }
        } catch {
          setError(true);
        } finally {
          setLoading(false);
        }
      };

      fetchGif();
    }
  }, [gifUrl, keywords]);

  const displayUrl = gifUrl || randomGif;

  if (loading) {
    return (
      <div className="glass rounded-3xl p-8 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !displayUrl) {
    return null;
  }

  return (
    <div className="glass rounded-3xl p-2 overflow-hidden">
      <img
        src={displayUrl}
        alt=""
        className="w-full max-w-sm mx-auto rounded-2xl"
        loading="lazy"
      />
    </div>
  );
}
