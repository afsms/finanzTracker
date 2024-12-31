import { useState } from 'react';
    import { v4 as uuidv4 } from 'uuid';
    
    function ContractForm({ addContract }) {
      const [title, setTitle] = useState('');
      const [price, setPrice] = useState('');
      const [cancellationPeriod, setCancellationPeriod] = useState('');
      const [contractDuration, setContractDuration] = useState('');
      const [status, setStatus] = useState('active');
      const [startDate, setStartDate] = useState('');
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !price || !cancellationPeriod || !contractDuration || !startDate) return;
        addContract({
          id: uuidv4(),
          title,
          price: parseFloat(price),
          cancellationPeriod: parseInt(cancellationPeriod),
          contractDuration,
          status,
          startDate,
        });
        setTitle('');
        setPrice('');
        setCancellationPeriod('');
        setContractDuration('');
        setStatus('active');
        setStartDate('');
      };
    
      return (
        <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded shadow">
          <h2 className="text-xl font-bold mb-4">Neuer Vertrag</h2>
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">Titel:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">Preis:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">Kündigungsfrist (Monate):</label>
            <input
              type="number"
              value={cancellationPeriod}
              onChange={(e) => setCancellationPeriod(e.target.value)}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">Vertragsdauer:</label>
            <input
              type="text"
              value={contractDuration}
              onChange={(e) => setContractDuration(e.target.value)}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
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
            <label className="block text-gray-700 text-sm font-bold mb-2">Status:</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="active">Aktiv</option>
              <option value="cancelled">Gekündigt</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Speichern
          </button>
        </form>
      );
    }
    
    export default ContractForm;
