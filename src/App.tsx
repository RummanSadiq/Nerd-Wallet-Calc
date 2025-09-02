import TaxCalculator from "./components/TaxCalculator";
import "./styles/app.scss";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="container">
          <h1>Federal Income Tax Calculator 2025</h1>
          <p className="subtitle">
            Estimate your 2025 federal refund or bill using our free income tax
            calculator. Enter your income, age and filing status to get started.
          </p>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          <TaxCalculator />
        </div>
      </main>
    </div>
  );
}

export default App;
