import axios from "axios";
import { useState } from "react";

function App() {
  const [transactionId, setTransactionId] = useState("");
  const [status, setStatus] = useState("");

  const createTransaction = async () => {
    try {
      const res = await axios.post(
        "https://9g2rlyxo3f.execute-api.us-east-1.amazonaws.com/create_transaction",
        {
          buyer_id: "123",
          seller_id: "456",
          amount: 500
        }
      );

      setTransactionId(res.data.transaction.transaction_id);
      setStatus("PENDING");
    } catch (err) {
      console.error(err);
    }
  };

  const simulatePayment = async () => {
    try {
      const res = await axios.post(
        "https://9g2rlyxo3f.execute-api.us-east-1.amazonaws.com/payment-received",
        {
          transaction_id: transactionId,
          amount_received: 500
        }
      );

      setStatus(res.data.status);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>⚡ CRYPTO ATM</h1>

      <div style={styles.card}>
        <h2>Start Transaction</h2>

        <button style={styles.button} onClick={createTransaction}>
          Create Transaction
        </button>

        {transactionId && (
          <>
            <p>ID: {transactionId}</p>

            <button style={styles.payButton} onClick={simulatePayment}>
              Insert Cash (Simulate)
            </button>

            <p>Status: {status}</p>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    background: "black",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: "40px",
    color: "#00f5ff",
    marginBottom: "30px"
  },
  card: {
    background: "#111",
    padding: "30px",
    borderRadius: "15px",
    textAlign: "center",
    boxShadow: "0 0 20px #00f5ff"
  },
  button: {
    background: "#00f5ff",
    border: "none",
    padding: "10px 20px",
    marginTop: "10px",
    cursor: "pointer"
  },
  payButton: {
    background: "#00ff88",
    border: "none",
    padding: "10px 20px",
    marginTop: "15px",
    cursor: "pointer"
  }
};

export default App;
