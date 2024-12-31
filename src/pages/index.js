
    import { useState, useEffect } from 'react';
    import { v4 as uuidv4 } from 'uuid';
    import TransactionForm from '../components/TransactionForm';
    import CategoryManager from '../components/CategoryManager';
    import TransactionList from '../components/TransactionList';
    import ContractForm from '../components/ContractForm';
    import NotificationList from '../components/NotificationList';
    import ContractHistory from '../components/ContractHistory';
    import FixedCostForm from '../components/FixedCostForm';
    import { format, addMonths, differenceInDays } from 'date-fns';
    
    const categoriesInitialState = {
      income: [
        { id: uuidv4(), name: 'Gehalt' },
        { id: uuidv4(), name: 'Bonus' },
      ],
      expense: [
        { id: uuidv4(), name: 'Miete' },
        { id: uuidv4(), name: 'Lebensmittel' },
        { id: uuidv4(), name: 'Freizeit' },
      ],
    };
    
    const initialTransactions = [];
    const initialContracts = [];
    const initialNotifications = [];
    const initialFixedCosts = [];
    
    export default function Home() {
      const [transactions, setTransactions] = useState(initialTransactions);
      const [categories, setCategories] = useState(categoriesInitialState);
      const [contracts, setContracts] = useState(initialContracts);
      const [notifications, setNotifications] = useState(initialNotifications);
      const [fixedCosts, setFixedCosts] = useState(initialFixedCosts);
    
      useEffect(() => {
        const storedTransactions = localStorage.getItem('transactions');
        if (storedTransactions) {
          setTransactions(JSON.parse(storedTransactions));
        }
    
        const storedCategories = localStorage.getItem('categories');
        if (storedCategories) {
          setCategories(JSON.parse(storedCategories));
        }
    
        const storedContracts = localStorage.getItem('contracts');
        if (storedContracts) {
          setContracts(JSON.parse(storedContracts));
        }
    
        const storedNotifications = localStorage.getItem('notifications');
        if (storedNotifications) {
          setNotifications(JSON.parse(storedNotifications));
        }
    
        const storedFixedCosts = localStorage.getItem('fixedCosts');
        if (storedFixedCosts) {
          setFixedCosts(JSON.parse(storedFixedCosts));
        }
      }, []);
    
      useEffect(() => {
        localStorage.setItem('transactions', JSON.stringify(transactions));
        localStorage.setItem('categories', JSON.stringify(categories));
        localStorage.setItem('contracts', JSON.stringify(contracts));
        localStorage.setItem('notifications', JSON.stringify(notifications));
        localStorage.setItem('fixedCosts', JSON.stringify(fixedCosts));
      }, [transactions, categories, contracts, notifications, fixedCosts]);
    
      useEffect(() => {
        const checkCancellationPeriods = () => {
          contracts.forEach((contract) => {
            if (contract.status === 'active') {
              const startDate = new Date(contract.startDate);
              const endDate = addMonths(startDate, parseInt(contract.contractDuration));
              const cancellationDate = addMonths(startDate, parseInt(contract.contractDuration) - parseInt(contract.cancellationPeriod));
              const daysUntilCancellation = differenceInDays(cancellationDate, new Date());
              const daysUntilEnd = differenceInDays(endDate, new Date());
    
              if (daysUntilCancellation <= 30 && daysUntilCancellation >= 0) {
                const notificationId = uuidv4();
                setNotifications((prev) => [
                  ...prev,
                  {
                    id: notificationId,
                    title: `Kündigungsfrist für ${contract.title}`,
                    message: `Die Kündigungsfrist für ${contract.title} läuft in ${daysUntilCancellation} Tagen ab.`,
                  },
                ]);
              }
							 if (daysUntilEnd <= 0) {
                setContracts((prev) =>
                  prev.map((c) =>
                    c.id === contract.id ? { ...c, status: 'expired' } : c
                  )
                );
              }
            }
          });
        };
    
        checkCancellationPeriods();
        const intervalId = setInterval(checkCancellationPeriods, 24 * 60 * 60 * 1000);
        return () => clearInterval(intervalId);
      }, [contracts, setNotifications]);
    
      const addTransaction = (transaction) => {
        setTransactions((prev) => [...prev, transaction]);
      };
    
      const deleteTransaction = (id) => {
        setTransactions((prev) => prev.filter((t) => t.id !== id));
      };
    
      const addContract = (contract) => {
        setContracts((prev) => [...prev, contract]);
      };
    
      const markNotificationAsRead = (id) => {
        setNotifications((prev) => prev.filter((notification) => notification.id !== id));
      };
    
      const deleteContract = (id) => {
        setContracts((prev) => prev.filter((contract) => contract.id !== id));
      };
    
      const addFixedCost = (cost) => {
        setFixedCosts((prev) => [...prev, cost]);
      };
    
      return (
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6">Finanz- und Vertragsübersicht</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <TransactionForm addTransaction={addTransaction} categories={categories} />
              <CategoryManager categories={categories} setCategories={setCategories} />
              <FixedCostForm addFixedCost={addFixedCost} categories={categories} />
            </div>
            <div>
              <ContractForm addContract={addContract} />
              <NotificationList notifications={notifications} markNotificationAsRead={markNotificationAsRead} />
            </div>
          </div>
          <TransactionList
            transactions={transactions}
            categories={categories}
            deleteTransaction={deleteTransaction}
            fixedCosts={fixedCosts}
          />
          <ContractHistory contracts={contracts} deleteContract={deleteContract} />
        </div>
      );
    }