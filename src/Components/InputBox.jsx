import React from "react";

function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectCurrency,
  amountDisable = false,
}) {
  return (
    <div className="bg-white p-4 rounded-lg flex items-center gap-3 shadow">
      
      {/* LEFT: Amount Input */}
      <div className="flex flex-col w-1/2">
        <label className="text-gray-600 text-sm mb-1">
          {label}
        </label>

        <input
          type="number"
          className="outline-none text-lg bg-transparent"
          placeholder="Enter amount"
          value={amount}
          disabled={amountDisable}
          onChange={(e) =>
            onAmountChange && onAmountChange(e.target.value)
          }
        />
      </div>

      {/* RIGHT: Currency Dropdown */}
      <div className="flex flex-col w-1/2 items-end">
        <label className="text-gray-600 text-sm mb-1">
          Currency
        </label>

        <select
          className="bg-gray-100 px-2 py-1 rounded-md outline-none cursor-pointer"
          value={selectCurrency}
          onChange={(e) =>
            onCurrencyChange && onCurrencyChange(e.target.value)
          }
        >
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>
              {currency.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default InputBox;