import React from "react";

function UserDashboard({ user, transactions }) {
  const walletFunds = Number(localStorage.getItem("ss_wallet") || 0);
  const income = transactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = walletFunds + income + expenses;
  const savings = balance * 0.2;

  return (
    <div className="dashboard-wrapper">

      {/* Greeting */}
      <div className="dashboard-header">
        <h2>Welcome back, <span>{user}</span> 👋</h2>
        <p>Your financial snapshot today</p>
      </div>

      <div className="dashboard-grid">

        {/* Balance */}
        <div className="stat-card balance-card">
          <div className="stat-header">
            <span className="icon">💳</span>
            <h4>Current Balance</h4>
          </div>

          <p className="amounts">₹{balance.toLocaleString("en-IN")}</p>

          <div className="stat-foot">
            <span>Net position of your account</span>
          </div>
        </div>

        {/* Income */}
        <div className="stat-card income-card">
          <div className="stat-header">
            <span className="icon">📈</span>
            <h4>Total Income</h4>
          </div>

          <p className="amount positive">
            ₹{income.toLocaleString("en-IN")}
          </p>

          <div className="stat-foot">
            <span>All incoming funds</span>
          </div>
        </div>

        {/* Expense */}
        <div className="stat-card expense-card">
          <div className="stat-header">
            <span className="icon">📉</span>
            <h4>Total Expenses</h4>
          </div>

          <p className="amount negative">
            ₹{Math.abs(expenses).toLocaleString("en-IN")}
          </p>

          <div className="stat-foot">
            <span>Money spent so far</span>
          </div>
        </div>

        {/* Savings */}
        <div className="stat-card savings-card">
          <div className="stat-header">
            <span className="icon">💰</span>
            <h4>Suggested Savings</h4>
          </div>

          <p className="amount highlight">
            ₹{savings.toLocaleString("en-IN")}
          </p>

          <div className="stat-foot">
            <span>Recommended 20% saving rule</span>
          </div>
        </div>

      </div>

    </div>
  );
}

export default UserDashboard;
