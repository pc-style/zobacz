import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";

interface AdminPanelProps {
  isAuthenticated: boolean;
  onAuthenticate: () => void;
  onNavigate: (path: string) => void;
}

export default function AdminPanel({
  isAuthenticated,
  onAuthenticate,
  onNavigate,
}: AdminPanelProps) {
  const pages = useQuery(api.pages.list);
  const createPage = useMutation(api.pages.create);
  const updatePage = useMutation(api.pages.update);
  const removePage = useMutation(api.pages.remove);

  const [editingId, setEditingId] = useState<Id<"pages"> | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({
    slug: "",
    title: "",
    description: "",
    gifUrl: "",
    gifKeywords: "",
    deeplink: "",
    deeplinkLabel: "",
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="glass rounded-3xl p-8 max-w-md w-full text-center">
          <h1 className="font-display text-3xl text-white mb-6">Panel Admina</h1>
          <p className="text-white/50 mb-8 text-sm">
            (authentication mock - will be replaced with real auth)
          </p>
          <button
            onClick={onAuthenticate}
            className="w-full glass rounded-xl px-6 py-4 text-white hover:bg-white/10 transition-colors font-display text-lg"
          >
            Authenticate
          </button>
        </div>
      </div>
    );
  }

  const resetForm = () => {
    setForm({
      slug: "",
      title: "",
      description: "",
      gifUrl: "",
      gifKeywords: "",
      deeplink: "",
      deeplinkLabel: "",
    });
    setEditingId(null);
    setShowCreate(false);
  };

  const handleEdit = (page: NonNullable<typeof pages>[number]) => {
    setEditingId(page._id);
    setForm({
      slug: page.slug,
      title: page.title,
      description: page.description || "",
      gifUrl: page.gifUrl || "",
      gifKeywords: page.gifKeywords || "",
      deeplink: page.deeplink || "",
      deeplinkLabel: page.deeplinkLabel || "",
    });
    setShowCreate(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.slug) return;

    const data = {
      slug: form.slug,
      title: form.title,
      description: form.description || undefined,
      gifUrl: form.gifUrl || undefined,
      gifKeywords: form.gifKeywords || undefined,
      deeplink: form.deeplink || undefined,
      deeplinkLabel: form.deeplinkLabel || undefined,
    };

    if (editingId) {
      await updatePage({ id: editingId, ...data });
    } else {
      await createPage(data);
    }
    resetForm();
  };

  const handleDelete = async (id: Id<"pages">) => {
    if (confirm("Na pewno usunac?")) {
      await removePage({ id });
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-3xl text-white">Panel Admina</h1>
          <button
            onClick={() => onNavigate("/")}
            className="glass rounded-xl px-4 py-2 text-white/60 hover:text-white text-sm transition-colors"
          >
            Wroc do strony
          </button>
        </div>

        {!showCreate && (
          <button
            onClick={() => setShowCreate(true)}
            className="w-full glass rounded-2xl p-4 text-white/60 hover:text-white mb-6 transition-colors border-2 border-dashed border-white/10 hover:border-white/20"
          >
            + Dodaj nowa strone
          </button>
        )}

        {showCreate && (
          <form
            onSubmit={handleSubmit}
            className="glass rounded-2xl p-6 mb-6 space-y-4"
          >
            <h2 className="font-display text-xl text-white mb-4">
              {editingId ? "Edytuj strone" : "Nowa strona"}
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Slug (URL)"
                value={form.slug}
                onChange={(v) => setForm({ ...form, slug: v })}
                placeholder="nazwa-strony"
                disabled={!!editingId}
              />
              <Input
                label="Tytul *"
                value={form.title}
                onChange={(v) => setForm({ ...form, title: v })}
                placeholder="Tytul strony"
              />
            </div>

            <Input
              label="Opis (opcjonalny)"
              value={form.description}
              onChange={(v) => setForm({ ...form, description: v })}
              placeholder="Krotki opis..."
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="GIF URL (opcjonalny)"
                value={form.gifUrl}
                onChange={(v) => setForm({ ...form, gifUrl: v })}
                placeholder="https://..."
              />
              <Input
                label="GIF keywords (opcjonalny)"
                value={form.gifKeywords}
                onChange={(v) => setForm({ ...form, gifKeywords: v })}
                placeholder="love, hearts"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Deeplink (opcjonalny)"
                value={form.deeplink}
                onChange={(v) => setForm({ ...form, deeplink: v })}
                placeholder="fb-messenger://"
              />
              <Input
                label="Label deeplinku"
                value={form.deeplinkLabel}
                onChange={(v) => setForm({ ...form, deeplinkLabel: v })}
                placeholder="Otworz Messenger"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 glass rounded-xl px-4 py-3 text-white hover:bg-white/10 transition-colors"
              >
                {editingId ? "Zapisz zmiany" : "Utworz strone"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="glass rounded-xl px-4 py-3 text-white/50 hover:text-white transition-colors"
              >
                Anuluj
              </button>
            </div>
          </form>
        )}

        <div className="space-y-3">
          {pages?.map((page) => (
            <div
              key={page._id}
              className="glass rounded-2xl p-4 flex items-center justify-between"
            >
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-lg text-white truncate">
                  {page.title}
                </h3>
                <p className="text-white/40 text-sm">/{page.slug}</p>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => onNavigate(`/${page.slug}`)}
                  className="glass rounded-lg px-3 py-2 text-white/50 hover:text-white text-sm transition-colors"
                >
                  Zobacz
                </button>
                <button
                  onClick={() => handleEdit(page)}
                  className="glass rounded-lg px-3 py-2 text-white/50 hover:text-white text-sm transition-colors"
                >
                  Edytuj
                </button>
                <button
                  onClick={() => handleDelete(page._id)}
                  className="glass rounded-lg px-3 py-2 text-red-400/50 hover:text-red-400 text-sm transition-colors"
                >
                  Usun
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  disabled?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-white/50 text-sm mb-1 block">{label}</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      />
    </label>
  );
}
