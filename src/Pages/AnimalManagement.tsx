import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AnimalForm from "../Components/AnimalForm";
import Animals from "./Animals/Animals";
import AnimalsDetails from "./Animals/[id]";
import Aboutus from "./Aboutus/Aboutus";
import { Animal } from "../Types/Animal";

export default function AnimalManagement() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [searchTxt, setSearchTxt] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetchAnimals();
  }, []);

  const fetchAnimals = async () => {
    const response = await fetch("https://freetestapi.com/api/v1/animals");
    const data = await response.json();
    setAnimals(data);
  };

  const handleSearch = async (searchTxt: string) => {
    setSearchTxt(searchTxt);
    let apiUrl = `https://freetestapi.com/api/v1/animals?search=${searchTxt}`;
    if (sortOrder) {
      apiUrl += `&sort=name&order=${sortOrder}`;
    }
    const response = await fetch(apiUrl);
    const data = await response.json();
    setAnimals(data);
  };

  const handleSort = async (newSortOrder: string) => {
    setSortOrder(newSortOrder);
    let apiUrl = `https://freetestapi.com/api/v1/animals?sort=name&order=${newSortOrder}`;
    if (searchTxt) {
      apiUrl += `&search=${searchTxt}`;
    }
    const response = await fetch(apiUrl);
    const data = await response.json();
    setAnimals(data);
  };

  const addOrUpdateAnimal = (animal: Animal) => {
    setAnimals((prevAnimals) => {
      const existingAnimalIndex = prevAnimals.findIndex(
        (a) => a.id === animal.id
      );

      if (existingAnimalIndex !== -1) {
        // Animal exists, create a new array with the updated animal
        const updatedAnimals = [...prevAnimals];
        updatedAnimals[existingAnimalIndex] = animal;
        return updatedAnimals;
      } else {
        return [...prevAnimals, animal];
      }
    });
  };
  const deleteAnimal = (id: number) => {
    setAnimals((prevAnimals) =>
      prevAnimals.filter((animal) => animal.id !== id)
    );
  };
  return (
    <Routes>
      <Route
        index
        element={
          <Animals
            animals={animals}
            onSearch={handleSearch}
            onSort={handleSort}
            searchTxt={searchTxt}
            sortOrder={sortOrder}
          />
        }
      />
      <Route
        path="/Animals"
        element={
          <Animals
            animals={animals}
            onSearch={handleSearch}
            onSort={handleSort}
            searchTxt={searchTxt}
            sortOrder={sortOrder}
          />
        }
      />
      <Route
        path="/Animals/new"
        element={<AnimalForm onSave={addOrUpdateAnimal} />}
      />
      <Route
        path="/Animals/:id/update"
        element={<AnimalForm onSave={addOrUpdateAnimal} />}
      />

      <Route
        path="/Animals/:id"
        element={<AnimalsDetails onDelete={deleteAnimal} />}
      />
      <Route path="/aboutus" element={<Aboutus />} />
    </Routes>
  );
}
