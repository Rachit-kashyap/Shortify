import { useState } from "react";

export default function UrlShortener() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  async function getShortUrl() {
    try {
      let res = await fetch("http://localhost:3000/api/v1/short-url", {
        method: "POST",
        body: JSON.stringify({ url }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      let result = await res.json();
      if (result.shortenedUrl) {
        setShortUrl(`http://localhost:3000/api/v1/${result.shortenedUrl}`);
      } else {
        alert(`${result.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while fetching the shortened URL");
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", minHeight: "100vh", backgroundColor: "#121212", padding: "16px", color: "#fff" }}>
      <header style={{ textAlign: "center", padding: "20px" }}>
      <img src="/logo.webp" alt="Logo" style={{ width: "100px", marginBottom: "10px", borderRadius: "24px" }} />

        <h1 style={{ fontSize: "32px", fontWeight: "bold", color: "#e0e0e0" }}>Ultimate URL Shortener</h1>
      </header>
      
      <main style={{ backgroundColor: "#1e1e1e", padding: "24px", borderRadius: "16px", boxShadow: "0 4px 15px rgba(255, 255, 255, 0.2)", width: "100%", maxWidth: "450px", textAlign: "center" }}>
        <input
          type="text"
          placeholder="Enter your URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ width: "100%", padding: "12px", border: "2px solid #444", borderRadius: "8px", marginBottom: "16px", backgroundColor: "#2a2a2a", color: "#fff" }}
        />
        <button onClick={getShortUrl} style={{ width: "100%", backgroundColor: "#ff4081", color: "white", padding: "12px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "16px", fontWeight: "bold", transition: "0.3s" }}>Shorten URL</button>
        {shortUrl && (
          <div style={{ marginTop: "16px", padding: "10px", backgroundColor: "#333", borderRadius: "8px", wordBreak: "break-all" }}>
            <p style={{ color: "#ff4081" }}>Shortened URL:</p>
            <a href={shortUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#00e5ff", textDecoration: "none", fontWeight: "bold" }}>{shortUrl}</a>
          </div>
        )}
      </main>
      
      <footer style={{ textAlign: "center", padding: "20px", color: "#777" }}>
        <p>&copy; {new Date().getFullYear()} Ultimate URL Shortener. All rights reserved.</p>
      </footer>
    </div>
  );
}