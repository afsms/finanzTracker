import { useState } from 'react';
    import { v4 as uuidv4 } from 'uuid';
    
    function FixedCostForm({ addFixedCost, categories }) {
      const [name, setName] = useState('');
      const [amount, setAmount] = useState('');
      const [startDate, setStartDate] = useState('');
      const [isRecurring, setIsRecurring] = useState(false);
      const [endDate, setEndDate] = useState('');
      const [type, setType] = useState('expense');
      const [category, setCategory] = useState(categories.expense[0]?.id);
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !amount || !startDate || !category) return;
        addFixedCost({
          id: uuidv4(),
          name,
          amount: parseFloat(amount),
          startDate,
          isRecurring,
          endDate,
          type,
          category
        });
        setName('');
        setAmount('');
        setStartDate('');
        setIsRecurring(false);
        setEndDate('');
        setCategory(categories.expense[0]?.id);
      };
    
      return (
        <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded shadow">
          <h2 className="text-xl font-bold mb-4">Neue Fixkosten</h2>
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
            <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
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
            <label className="block text-gray-700 text-sm font-bold mb-2">Startdatum:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">Wiederkehrend:</label>
            <input
              type="checkbox"
              checked={isRecurring}
              onChange={(e) => setIsRecurring(e.target.checked)}
              className="mr-2 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {isRecurring && (
            <div className="mb-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">Enddatum:</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          )}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Speichern
          </button>
        </form>
      );
    }
    
    export default FixedCostForm;
