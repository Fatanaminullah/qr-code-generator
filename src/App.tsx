import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import QRCode from "qrcode";

function normalizeUrl(input: string) {
  const trimmed = input.trim();
  if (!trimmed) return "";
  // If user enters "example.com", treat it like "https://example.com"
  if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(trimmed)) return `https://${trimmed}`;
  return trimmed;
}

export function App() {
  const [input, setInput] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const normalized = useMemo(() => normalizeUrl(input), [input]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setQrDataUrl(null);

    const value = normalized;
    if (!value) {
      setError("Enter a URL first.");
      return;
    }

    setIsGenerating(true);
    try {
      const dataUrl = await QRCode.toDataURL(value, {
        width: 320,
        margin: 2,
        errorCorrectionLevel: "M",
      });
      setQrDataUrl(dataUrl);
    } catch {
      setError("Could not generate QR code. Please try a different URL.");
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="page">
      <main className="card">
        <header className="header">
          <h1 className="title">QR Code Generator</h1>
          <p className="subtitle">Paste a URL, generate, then click the QR to download.</p>
        </header>

        <form className="form" onSubmit={onSubmit}>
          <label className="label" htmlFor="url">
            URL
          </label>
          <div className="row">
            <input
              id="url"
              className="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="https://example.com"
              inputMode="url"
              autoComplete="url"
              autoCorrect="off"
              spellCheck={false}
              aria-describedby="hint"
            />
            <button className="button" type="submit" disabled={isGenerating}>
              {isGenerating ? "Generating…" : "Generate"}
            </button>
          </div>
          <div id="hint" className="hint">
            We’ll auto-add <code>https://</code> if you omit it.
          </div>
        </form>

        {error ? (
          <div className="alert" role="alert">
            {error}
          </div>
        ) : null}

        {qrDataUrl ? (
          <section className="result" aria-label="QR code result">
            <a className="qrLink" href={qrDataUrl} download="qr-code.png" title="Click to download">
              <img className="qrImage" src={qrDataUrl} alt="Generated QR code" />
            </a>
            <div className="resultMeta">
              <div className="generatedFor">
                Generated for: <span className="mono">{normalized}</span>
              </div>
              <a className="downloadBtn" href={qrDataUrl} download="qr-code.png">
                Download PNG
              </a>
            </div>
          </section>
        ) : (
          <section className="empty" aria-label="No QR generated yet">
            <div className="emptyBox">Your QR code will appear here.</div>
          </section>
        )}
      </main>
      <footer className="footer">
        <span>No ads. No expiry. QR generated locally in your browser.</span>
      </footer>
    </div>
  );
}


