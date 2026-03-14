import { useState } from "react";

function TransactionForm({ addTransaction }) {

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description || !amount) {
      alert("Please enter description and amount");
      return;
    }

    addTransaction({
      description,
      amount: Number(amount)
    });

    setDescription("");
    setAmount("");
  };

  return (
  <div className="form-card">

    <div className="form-header">
      <h3>💸 Add Transaction</h3>
      <p>Track your income and expenses instantly</p>
    </div>

    <form onSubmit={handleSubmit} className="transaction-form">

      {/* Description */}
      <div className="input-group">
        <label>Description</label>

        <div className="input-wrapper">
          <span className="input-icon">📝</span>

          <input
            type="text"
            placeholder="Groceries, Salary, Coffee..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
      </div>

      {/* Amount */}
      <div className="input-group">
        <label>Amount</label>

        <div className="input-wrapper amount-field">
          <span className="currency">₹</span>

          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <small className="amount-help">
          Use + for income • - for expense
        </small>
      </div>

      {/* Button */}
      <button type="submit" className="submit-btn">
        ➕ Add Transaction
      </button>

    </form>

  </div>
);
}

export default TransactionForm;