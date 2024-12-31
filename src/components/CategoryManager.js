import { useState } from 'react';
    import { v4 as uuidv4 } from 'uuid';
    import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
    
    function CategoryManager({ categories, setCategories }) {
      const [newCategoryName, setNewCategoryName] = useState('');
      const [selectedType, setSelectedType] = useState('income');
      const [editCategory, setEditCategory] = useState(null);
      const [editCategoryName, setEditCategoryName] = useState('');
    
      const handleAddCategory = () => {
        if (!newCategoryName) return;
        const newCategory = { id: uuidv4(), name: newCategoryName };
        setCategories((prev) => ({
          ...prev,
          [selectedType]: [...prev[selectedType], newCategory],
        }));
        setNewCategoryName('');
      };
    
      const handleEditCategory = (category) => {
        setEditCategory(category);
        setEditCategoryName(category.name);
      };
    
      const handleUpdateCategory = () => {
        if (!editCategoryName) return;
        setCategories((prev) => ({
          ...prev,
          [selectedType]: prev[selectedType].map((cat) =>
            cat.id === editCategory.id ? { ...cat, name: editCategoryName } : cat
          ),
        }));
        setEditCategory(null);
        setEditCategoryName('');
      };
    
      const handleDeleteCategory = (id) => {
        setCategories((prev) => ({
          ...prev,
          [selectedType]: prev[selectedType].filter((cat) => cat.id !== id),
        }));
      };
    
      return (
        <div className="mb-4 p-4 border rounded shadow">
          <h2 className="text-xl font-bold mb-4">Kategorien verwalten</h2>
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">Typ:</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="income">Einnahme</option>
              <option value="expense">Ausgabe</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">Neue Kategorie:</label>
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <button
              onClick={handleAddCategory}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2 focus:outline-none focus:shadow-outline"
            >
              <PlusIcon className="h-4 w-4 inline-block mr-1" />
              Hinzufügen
            </button>
          </div>
          <ul className="mt-4">
            {categories[selectedType]?.map((category) => (
              <li key={category.id} className="flex items-center justify-between py-2 border-b">
                {editCategory?.id === category.id ? (
                  <input
                    type="text"
                    value={editCategoryName}
                    onChange={(e) => setEditCategoryName(e.target.value)}
                    className="shadow border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                ) : (
                  <span>{category.name}</span>
                )}
                <div>
                  {editCategory?.id === category.id ? (
                    <button
                      onClick={handleUpdateCategory}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-1 focus:outline-none focus:shadow-outline"
                    >
                      Speichern
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditCategory(category)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-1 focus:outline-none focus:shadow-outline"
                    >
                      <PencilIcon className="h-4 w-4 inline-block" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  >
                    <TrashIcon className="h-4 w-4 inline-block" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      );
    }
    
    export default CategoryManager;
