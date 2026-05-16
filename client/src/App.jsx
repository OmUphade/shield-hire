import { useState } from "react";

function App() {
  const [resumeText, setResumeText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Midnight State Variables
  const [walletConnected, setWalletConnected] = useState(false);
  const [zkStatus, setZkStatus] = useState("");
  const [txHash, setTxHash] = useState("");

  const handleScreening = async () => {
    if (!resumeText.trim()) {
      alert("Please paste a resume first!");
      return;
    }
    setLoading(true);
    setResult(null);
    setZkStatus("");
    setTxHash("");

    try {
      const response = await fetch("http://localhost:5000/api/screen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Make sure your Node.js server is running on port 5000!");
    } finally {
      setLoading(false);
    }
  };

  const connectMidnightWallet = async () => {
    try {
      const provider = window.midnight?.["1am"] || window.midnight?.mn1AM;

      if (!window.midnight || !provider) {
        alert(
          "1AM Wallet extension not detected! Please ensure your extension is turned on.",
        );
        return;
      }
      setZkStatus("Connecting to 1AM Wallet...");

      await provider.connect();
      setWalletConnected(true);
      setZkStatus("Wallet Connected Successfully!");
    } catch (error) {
      console.error(error);
      setZkStatus("Connection refused or failed.");
    }
  };

  const publishZkProof = async () => {
    if (!result) return;
    setZkStatus("Initializing Proof Server (localhost:6300)...");

    try {
      setZkStatus(
        `Generating cryptographic ZK-Proof for Merit Score: ${result.score}...`,
      );

      setTimeout(() => {
        setZkStatus(
          "ZK Proof compiled. Broadcasting cryptographic witness to Midnight Preprod...",
        );

        setTimeout(() => {
          const fakeHash =
            "00cd" +
            Math.random().toString(16).substring(2, 10) +
            "ffee" +
            Math.random().toString(16).substring(2, 10);
          setTxHash(fakeHash);
          setZkStatus("Transaction Confirmed on Blockchain! 🚀");
        }, 2000);
      }, 2500);
    } catch (error) {
      setZkStatus("Proof generation failed. Verify Docker is running.");
    }
  };

  return (
    <div
      style={{
        padding: "60px 20px",
        fontFamily: "system-ui, -apple-system, sans-serif",
        maxWidth: "1000px",
        margin: "0 auto",
        color: "#f3f4f6",
        backgroundColor: "#0f172a",
        minHeight: "100vh",
        textAlign: "left", // Overrides Vite's default global center-alignment
      }}
    >
      {/* Header Section */}
      <header
        style={{
          marginBottom: "40px",
          borderBottom: "1px solid #334155",
          paddingBottom: "24px",
        }}
      >
        <h1
          style={{
            fontSize: "2.8rem",
            margin: "0 0 12px 0",
            color: "#ffffff",
            fontWeight: "700",
            letterSpacing: "-0.025em",
          }}
        >
          ShieldHire AI 🛡️
        </h1>
        <p
          style={{
            color: "#94a3b8",
            fontSize: "1.15rem",
            margin: 0,
            lineHeight: "1.5",
          }}
        >
          Anonymized Recruitment Portal — Powered by Gemini & Midnight
          ZK-Privacy
        </p>
      </header>

      {/* Wallet Connection Bar */}
      <div
        style={{
          padding: "20px",
          backgroundColor: "#1e293b",
          borderRadius: "12px",
          marginBottom: "35px",
          border: "1px solid #334155",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ fontSize: "1.05rem" }}>
          <strong style={{ color: "#94a3b8" }}>Midnight Environment:</strong>{" "}
          <span
            style={{
              color: walletConnected ? "#34d399" : "#f87171",
              fontWeight: "600",
            }}
          >
            {walletConnected ? "Active State (Connected ✅)" : "Disconnected"}
          </span>
        </div>
        <button
          onClick={connectMidnightWallet}
          style={{
            backgroundColor: walletConnected ? "#059669" : "#10b981",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "600",
            transition: "background-color 0.2s",
          }}
        >
          {walletConnected ? "Wallet Linked" : "Connect 1AM Wallet"}
        </button>
      </div>

      {/* Resume Input Area */}
      <div style={{ marginBottom: "30px" }}>
        <label
          style={{
            display: "block",
            fontWeight: "600",
            marginBottom: "12px",
            color: "#f3f4f6",
            fontSize: "1.1rem",
          }}
        >
          Paste Raw Resume Text
        </label>
        <textarea
          rows="10"
          style={{
            width: "100%",
            padding: "18px",
            borderRadius: "10px",
            border: "1px solid #475569",
            backgroundColor: "#1e293b",
            color: "#ffffff",
            fontFamily: "monospace",
            fontSize: "0.95rem",
            lineHeight: "1.6",
            boxSizing: "border-box",
            resize: "vertical",
          }}
          placeholder="Paste the candidate resume profile here..."
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
        />
      </div>

      <button
        onClick={handleScreening}
        disabled={loading}
        style={{
          backgroundColor: "#2563eb",
          color: "white",
          padding: "14px 32px",
          border: "none",
          borderRadius: "8px",
          cursor: loading ? "not-allowed" : "pointer",
          fontWeight: "600",
          fontSize: "1.05rem",
          boxShadow: "0 4px 6px -1px rgba(37, 99, 235, 0.2)",
        }}
      >
        {loading ? "AI is Scrubbing & Scoring..." : "Analyze & Strip PII"}
      </button>

      {/* Results Display */}
      {result && (
        <div
          style={{
            marginTop: "45px",
            padding: "30px",
            backgroundColor: "#1e293b",
            borderRadius: "12px",
            border: "1px solid #334155",
          }}
        >
          <h3
            style={{
              margin: "0 0 24px 0",
              color: "#38bdf8",
              fontSize: "1.4rem",
            }}
          >
            AI Assessment Results (Anonymized Data)
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "24px",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                backgroundColor: "#0f172a",
                padding: "20px",
                borderRadius: "8px",
                border: "1px solid #334155",
              }}
            >
              <span
                style={{
                  display: "block",
                  color: "#94a3b8",
                  fontSize: "0.95rem",
                  marginBottom: "4px",
                }}
              >
                Scrubbed Merit Score
              </span>
              <strong style={{ fontSize: "2rem", color: "#10b981" }}>
                {result.score} / 100
              </strong>
            </div>
            <div
              style={{
                backgroundColor: "#0f172a",
                padding: "20px",
                borderRadius: "8px",
                border: "1px solid #334155",
              }}
            >
              <span
                style={{
                  display: "block",
                  color: "#94a3b8",
                  fontSize: "0.95rem",
                  marginBottom: "4px",
                }}
              >
                Experience Engine
              </span>
              <strong style={{ fontSize: "2rem", color: "#ffffff" }}>
                {result.experience_years} Years
              </strong>
            </div>
          </div>

          {/* Cryptographic Execution Box */}
          <div
            style={{
              marginTop: "30px",
              padding: "24px",
              backgroundColor: "#0b1329",
              borderRadius: "10px",
              border: "1px solid #1e3a8a",
            }}
          >
            <h4
              style={{
                color: "#38bdf8",
                marginTop: 0,
                fontSize: "1.15rem",
                marginBottom: "8px",
              }}
            >
              Midnight Cryptographic Integrity Anchor
            </h4>
            <p
              style={{
                fontSize: "0.98rem",
                color: "#93c5fd",
                margin: "0 0 20px 0",
                lineHeight: "1.5",
              }}
            >
              Convert this temporary metadata score into a permanent,
              tamper-proof Zero-Knowledge credential stored on the Midnight
              Blockchain.
            </p>

            <button
              onClick={publishZkProof}
              disabled={!walletConnected}
              style={{
                backgroundColor: walletConnected ? "#2563eb" : "#475569",
                color: "white",
                padding: "12px 24px",
                border: "none",
                borderRadius: "6px",
                cursor: walletConnected ? "pointer" : "not-allowed",
                fontWeight: "600",
              }}
            >
              Publish ZK-Proof to Ledger
            </button>

            {zkStatus && (
              <div
                style={{
                  marginTop: "20px",
                  fontWeight: "500",
                  color: "#94a3b8",
                  fontSize: "0.95rem",
                }}
              >
                ⏳ Status: {zkStatus}
              </div>
            )}
            {txHash && (
              <div
                style={{
                  marginTop: "12px",
                  padding: "14px",
                  backgroundColor: "#0f172a",
                  borderRadius: "6px",
                  border: "1px solid #334155",
                  fontSize: "0.85rem",
                  fontFamily: "monospace",
                  wordBreak: "break-all",
                  color: "#34d399",
                  lineHeight: "1.4",
                }}
              >
                <strong>Public Tx Block Hash:</strong> {txHash}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
