import { TrashIcon } from '@heroicons/react/24/solid';
    
    function ContractHistory({ contracts, deleteContract }) {
      const archivedContracts = contracts.filter(
        (contract) => contract.status === 'cancelled' || contract.status === 'expired'
      );
    
      return (
        <div className="mb-4 p-4 border rounded shadow">
          <h2 className="text-xl font-bold mb-4">Vertragshistorie</h2>
          <ul>
            {archivedContracts.map((contract) => (
              <li key={contract.id} className="flex items-center justify-between py-2 border-b">
                <div>
                  <span className="font-bold">{contract.title}</span> - {contract.price}€ -{' '}
                  {contract.status}
                </div>
                <button
                  onClick={() => deleteContract(contract.id)}
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
    
    export default ContractHistory;
