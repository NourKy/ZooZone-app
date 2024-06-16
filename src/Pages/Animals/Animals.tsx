import React from "react";
import { Link } from "react-router-dom";
import { Animal } from "../../Types/Animal";

interface AnimalsProps {
  animals: Animal[];
  onSearch: (searchTxt: string) => void;
  onSort: (sortOrder: string) => void;
  searchTxt: string;
  sortOrder: string;
}

const Animals: React.FC<AnimalsProps> = ({
  animals,
  onSearch,
  onSort,
  searchTxt,
  sortOrder,
}) => {
  const handleSort = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    onSort(newSortOrder);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div className="container p-2 mt-8 mx-auto max-w-screen-2xl bg-white rounded-3xl shadow-transparent overflow-hidden border border-gray-200">
      <div className="flex flex-col md:flex-row justify-between items-center p-4 border-b border-gray-200 space-y-4 md:space-y-0">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
          <div className="relative flex items-center w-full md:w-auto">
            <input
              className="border-2 border-gray-300 bg-white h-10 w-full md:w-64 px-3 rounded-lg text-sm focus:outline-none"
              type="search"
              name="search"
              placeholder="Search"
              onChange={handleSearchChange}
              value={searchTxt}
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full md:w-auto"
            onClick={handleSort}
          >
            Sort {sortOrder === "asc" ? "Z-A" : "A-Z"}
          </button>
        </div>
        <Link
          to="/Animals/new"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg w-full md:w-auto text-center"
        >
          Add Animal
        </Link>
      </div>

      <div className="flex flex-col items-center pt-10 overflow-x-auto border-gray-100">
        <div className="w-full max-w-screen-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-20 gap-y-4">
          {animals.map((animal) => (
            <div
              key={animal.id}
              className="bg-white rounded-2xl border border-gray-200 w-full md:w-auto"
            >
              <Link to={`/Animals/${animal.id}`}>
                <img
                  className="w-full h-38 rounded-t-2xl object-cover"
                  src={animal.image}
                  alt={animal.name}
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold mt-2">{animal.name}</h2>
                  <p className="text-sm text-gray-600">{animal.species}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Animals;
