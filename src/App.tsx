import { useState, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import PageView from "./pages/PageView";
import AdminPanel from "./pages/AdminPanel";

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const seed = useMutation(api.pages.seed);

  useEffect(() => {
    seed();
  }, [seed]);

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, "", path);
    setCurrentPath(path);
  };

  if (currentPath === "/admin") {
    return <AdminPanel onNavigate={navigate} />;
  }

  const slug = currentPath.replace("/", "") || null;

  return <PageView slug={slug} onNavigate={navigate} />;
}
