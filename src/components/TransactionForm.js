import { useState } from 'react';
    import { v4 as uuidv4 } from 'uuid';
    
    function TransactionForm({ addTransaction, categories }) {
      const [type, setType] = useState('income');
      const [category, setCategory] = useState(categories.income[0]?.id);
      const [amount, setAmount] = useState('');
      const [date, setDate] = useState('');
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if (!amount || !date) return;
        addTransaction({
          id: uuidv4(),
          type,
          category,
          amount: parseFloat(amount),
          date,
        });
        setAmount('');
        setDate('');
      };
    
      return (
        <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded shadow">
          <h2 className="text-xl font-bold mb-4">Neue Transaktion</h2>
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">Typ:</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="income">Einnahme</option>
              <option value="expense">Ausgabe</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">Kategorie:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              {categories[type]?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">Betrag:</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">Datum:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Hinzufügen
          </button>
        </form>
      );
    }
    
    export default TransactionForm;
