"use client";
import { useState } from "react";

// for all the css stuff i searched it up lol

export default function Home() {
    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [error, setError] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleSubmit() {
        setError("");
        setShortUrl("");
        setCopied(false);
        setLoading(true);

        const res = await fetch("/api/shorten", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url, alias }),
        });

        setLoading(false);
        const data = await res.json();

        if (!res.ok) {
            setError(data.error);
            return;
        }

        setShortUrl(`${window.location.origin}/${data.alias}`);
    }

    function handleCopy() {
        navigator.clipboard.writeText(shortUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-1">URL Shortener</h1>
                <p className="text-sm text-gray-500 mb-6">Paste a long URL and get a short link.</p>

                <div className="space-y-3">
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Long URL</label>
                        <input
                            type="text"
                            placeholder="https://example.com/very/long/url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                            Custom alias <span className="text-gray-400 font-normal">(optional) (NO SPACES)</span>
                        </label>
                        <input
                            type="text"
                            placeholder="my-alias"
                            value={alias}
                            onChange={(e) => setAlias(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={loading || !url}
                    className="mt-4 w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white text-sm font-medium py-2 rounded-lg transition-colors"
                >
                    {loading ? "Shortening..." : "Shorten"}
                </button>

                {error && (
                    <p className="mt-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                        {error}
                    </p>
                )}

                {shortUrl && (
                    <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg px-3 py-3">
                        <p className="text-xs text-gray-500 mb-1">Your short URL</p>
                        <div className="flex items-center gap-2">
                            <a
                                href={shortUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 hover:underline truncate flex-1"
                            >
                                {shortUrl}
                            </a>
                            <button
                                onClick={handleCopy}
                                className="text-xs bg-black hover:bg-gray-800 text-white px-2 py-1 rounded-md transition-colors shrink-0"
                            >
                                {copied ? "Copied!" : "Copy"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
