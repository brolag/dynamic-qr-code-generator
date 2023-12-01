import { useState } from "react";
import QRCode from "react-qr-code";
import sha256 from "crypto-js/sha256";
import "./App.css";

function App() {
  const [hash, setHash] = useState("");
  const SECRET = "secret";

  const updateHash = (e) => {
    const hashDigest = sha256(e.target.value, SECRET);
    const hash = hashDigest.toString();
    setHash(hash);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ background: "white", padding: "16px" }}>
          <input onChange={updateHash} type="text" />
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={hash}
            viewBox={`0 0 256 256`}
          />
        </div>
      </header>
    </div>
  );
}

export default App;
