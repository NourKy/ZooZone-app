import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";

import ConfirmationModal from "../../Components/ConfirmationModal";
interface AnimalDetailsProps {
  onDelete: (id: number) => void;
}
interface Animal {
  id: number;
  name: string;
  species: string;
  habitat: string;
  family: string;
  diet: string;
  place_of_found: string;
  weight_kg: number;
  height_cm: number;
  description: string;
  image: string;
}

function AnimalsDetails({ onDelete }: AnimalDetailsProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [animalDet, setAnimalDet] = useState<Animal | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getAnimal = async () => {
      try {
        const response = await fetch(
          `https://freetestapi.com/api/v1/animals/${id}`
        );
        const data = await response.json();
        setAnimalDet(data);
      } catch (error) {
        console.error("Error fetching animal:", error);
      }
    };
    getAnimal();
  }, [id]);
  const handleDelete = async () => {
    setIsModalOpen(true);
  };
  const confirmDelete = () => {
    if (animalDet) {
      onDelete(animalDet.id);
      navigate("/Animals");
    }
  };
  if (!animalDet) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-5 m-10 bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
      <div className="flex flex-col md:flex-row">
        <img
          className="w-full md:w-1/3 h-auto rounded-lg object-cover"
          src={animalDet.image}
          alt={animalDet.name}
        />
        <div className="mt-5 md:mt-0 md:ml-5 w-full md:w-2/3">
          <div className="flex flex-col md:flex-row justify-between items-center mb-2">
            <h1 className="text-2xl font-bold text-blue-500">
              {animalDet.name}
            </h1>
            <div className="mt-2 md:mt-0">
              <button
                className="bg-white hover:bg-gray-200 text-blue-500 py-1 px-3 rounded-lg mr-2 border-cyan-500 border-t flex-col items-center"
                onClick={handleDelete}
              >
                <MdOutlineCancel className="mr-1" /> Delete
              </button>
              <button
                className="bg-white hover:bg-gray-200 text-blue-500 py-1 px-3 rounded-lg border-cyan-500 border-t flex-col items-center"
                onClick={() => navigate(`/Animals/${animalDet.id}/update`)}
              >
                <MdModeEdit className="mr-1" /> Update
              </button>
            </div>
          </div>
          <p className="mb-4">{animalDet.description}</p>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p>
              <strong>Species:</strong> {animalDet.species}
            </p>
            <p>
              <strong>Habitat:</strong> {animalDet.habitat}
            </p>
            <p>
              <strong>Family:</strong> {animalDet.family}
            </p>
            <p>
              <strong>Diet:</strong> {animalDet.diet}
            </p>
            <p>
              <strong>Place of Found:</strong> {animalDet.place_of_found}
            </p>
            <p>
              <strong>Weight:</strong> {animalDet.weight_kg} kg
            </p>
            <p>
              <strong>Height:</strong> {animalDet.height_cm} cm
            </p>
          </div>
        </div>
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        message={
          <span>
            Are you sure you want to delete{" "}
            <span className="text-blue-500">{animalDet.name}</span>?
          </span>
        }
      />
    </div>
  );
}

export default AnimalsDetails;
