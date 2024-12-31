import { useState } from 'react';
    import { isSameMonth, isSameYear, isBefore, addMonths } from 'date-fns';
    import { TrashIcon } from '@heroicons/react/24/solid';
    
    function TransactionList({ transactions, categories, deleteTransaction, fixedCosts }) {
      const [filterCategory, setFilterCategory] = useState('all');
      const [filterType, setFilterType] = useState('all');
      const [filterMonth, setFilterMonth] = useState('all');
      const [filterYear, setFilterYear] = useState('all');
    
      const filteredTransactions = transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        const transactionMonth = transactionDate.getMonth() + 1;
        const transactionYear = transactionDate.getFullYear();
    
        if (filterCategory !== 'all' && transaction.category !== filterCategory) return false;
        if (filterType !== 'all' && transaction.type !== filterType) return false;
        if (filterMonth !== 'all' && transactionMonth !== parseInt(filterMonth)) return false;
        if (filterYear !== 'all' && transactionYear !== parseInt(filterYear)) return false;
    
        return true;
      });
    
      const getCategoryName = (categoryId) => {
        for (const type in categories) {
          const category = categories[type].find((cat) => cat.id === categoryId);
          if (category) return category.name;
        }
        return 'Unbekannt';
      };
    
      const allMonths = [...new Set(transactions.map(t => new Date(t.date).getMonth() + 1))].sort((a, b) => a - b);
      const allYears = [...new Set(transactions.map(t => new Date(t.date).getFullYear()))].sort((a, b) => a - b);
    
      const calculateTotal = (type) => {
        let total = filteredTransactions
          .filter((t) => t.type === type)
          .reduce((sum, t) => sum + t.amount, 0);
    
        if (type === 'expense') {
          const currentMonth = filterMonth === 'all' ? new Date().getMonth() + 1 : parseInt(filterMonth);
          const currentYear = filterYear === 'all' ? new Date().getFullYear() : parseInt(filterYear);
    
          fixedCosts.forEach(cost => {
            if (cost.isRecurring) {
              let costDate = new Date(cost.startDate);
              while (isBefore(costDate, new Date(currentYear, currentMonth - 1, 1))) {
                costDate = addMonths(costDate, 1);
              }
              if (isSameMonth(costDate, new Date(currentYear, currentMonth - 1, 1)) && isSameYear(costDate, new Date(currentYear, currentMonth - 1, 1))) {
                total += cost.amount;
              }
            }
          });
        }
    
        return total;
      };
    
      const totalIncome = calculateTotal('income');
      const totalExpense = calculateTotal('expense');
      const balance = totalIncome - totalExpense;
    
      return (
        <div className="p-4 border rounded shadow">
          <h2 className="text-xl font-bold mb-4">Transaktionen</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="all">Alle Typen</option>
              <option value="income">Einnahmen</option>
              <option value="expense">Ausgaben</option>
            </select>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="all">Alle Kategorien</option>
              {Object.values(categories).flat().map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <select
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
              className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="all">Alle Monate</option>
              {allMonths.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="all">Alle Jahre</option>
              {allYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <p>
              <strong>Einnahmen:</strong> {totalIncome.toFixed(2)}
            </p>
            <p>
              <strong>Ausgaben:</strong> {totalExpense.toFixed(2)}
            </p>
            <p>
              <strong>Saldo:</strong> {balance.toFixed(2)}
            </p>
          </div>
          <ul className="mt-4">
            {filteredTransactions.map((transaction) => (
              <li key={transaction.id} className="flex items-center justify-between py-2 border-b">
                <div>
                  <span className="font-bold">{getCategoryName(transaction.category)}</span> -{' '}
                  {transaction.amount.toFixed(2)}€ ({new Date(transaction.date).toLocaleDateString()})
                </div>
                <button
                  onClick={() => deleteTransaction(transaction.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                >
                  <TrashIcon className="h-4 w-4 inline-block" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      );
    }
    
    export default TransactionList;
