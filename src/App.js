import { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import sha256 from "crypto-js/sha256";
import "./App.css";

function App() {
  const [hash, setHash] = useState("");
  const SECRET = "secret";

  // Dirección de billetera y hash de transacción de NFT ficticios
  const userWalletAddress = "0x1234567890abcdef1234567890abcdef12345678";
  const nftTxHash =
    "0x9abcdef1234567890abcdef1234567890abcdef1234567890abcdef12345678";

  // Función para obtener el valor basado en la fecha y hora actual
  const getDynamicValue = () => {
    const now = new Date();
    const year = now.getUTCFullYear();
    const month = now.getUTCMonth() + 1; // Ajuste porque getMonth() devuelve 0-11
    const day = now.getUTCDate();
    const hour = now.getUTCHours();
    const second = now.getSeconds();

    return `${year}-${month}-${day}-${hour}-${second}`;
  };

  useEffect(() => {
    const updateQRCode = () => {
      const dynamicValue = getDynamicValue();
      const combinedValue = `${dynamicValue}-${userWalletAddress}-${nftTxHash}`;
      const hashDigest = sha256(combinedValue, SECRET);
      setHash(hashDigest.toString());
    };

    updateQRCode();

    const interval = setInterval(updateQRCode, 2000); // 2000 ms = 2 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ background: "white", padding: "16px" }}>
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
