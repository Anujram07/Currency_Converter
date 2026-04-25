import { useState, useEffect } from "react";
import InputBox from "./Components/InputBox";
import useCurrencyInfo from "./Hooks/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  // 🔁 Swap currencies
  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };

  // 🔄 Convert with precision
  const convert = () => {
    if (!amount || !currencyInfo[to]) {
      setConvertedAmount(0);
      return;
    }

    const result = amount * currencyInfo[to];

    // fix floating precision
    setConvertedAmount(Number(result.toFixed(4)));
  };

  // ⚡ Auto convert on change
  useEffect(() => {
    convert();
  }, [amount, from, to, currencyInfo]);

  return (
    <div
      className="w-full h-screen flex justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://plus.unsplash.com/premium_photo-1681487767138-ddf2d67b35c1?fm=jpg&q=60&w=3000')",
      }}
    >
      <div className="w-full max-w-md mx-auto border rounded-xl p-6 backdrop-blur-md bg-white/30 shadow-xl">
        <h1 className="text-2xl font-bold text-center mb-4">
          Currency Converter 💱
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
        >
          {/* FROM */}
          <InputBox
            label="From"
            amount={amount}
            currencyOptions={options}
            selectCurrency={from}
            onCurrencyChange={(currency) => setFrom(currency)}
            onAmountChange={(amt) => setAmount(Number(amt))}
          />

          {/* SWAP BUTTON */}
          <div className="relative w-full h-0.5 my-6">
            <button
              type="button"
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-4 py-1 hover:bg-blue-700"
              onClick={swap}
            >
              Swap
            </button>
          </div>

          {/* TO */}
          <InputBox
            label="To"
            amount={convertedAmount}
            currencyOptions={options}
            selectCurrency={to}
            onCurrencyChange={(currency) => setTo(currency)}
            amountDisable
          />

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full mt-4 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700"
          >
            Convert {from.toUpperCase()} → {to.toUpperCase()}
          </button>
        </form>

        {/* RESULT DISPLAY */}
        <div className="text-center mt-4 text-lg font-semibold">
          {amount} {from.toUpperCase()} ={" "}
          {convertedAmount} {to.toUpperCase()}
        </div>
      </div>
    </div>
  );
}

export default App;