import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PiUploadFill } from "react-icons/pi";
import { Animal } from "../Types/Animal";

interface AnimalFormProps {
  animals?: Animal[];
  onSave: (animal: Animal) => void;
}

function AnimalForm({ animals, onSave }: AnimalFormProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [animal, setAnimal] = useState<Animal>({
    name: "",
    species: "",
    habitat: "",
    family: "",
    diet: "",
    place_of_found: "",
    weight_kg: 0,
    height_cm: 0,
    description: "",
    image: "",
  });

  useEffect(() => {
    if (id) {
      const getAnimal = async () => {
        try {
          const response = await fetch(
            `https://freetestapi.com/api/v1/animals/${id}`
          );
          const data = await response.json();
          setAnimal(data);
        } catch (error) {
          console.error("Error fetching animal:", error);
        }
      };
      getAnimal();
    }
  }, [id]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave(animal);
    navigate("/Animals");
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setAnimal({ ...animal, [name]: value });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          setAnimal({ ...animal, image: e.target.result as string });
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  return (
    <div className="container mx-auto p-5 m-10 bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <h1 className="text-2xl font-bold mb-4">
          {id ? "Update Animal" : "Add Animal"}
        </h1>
        <hr className="mb-4 w-full" />

        <div className="w-full flex flex-col gap-4 mb-4">
          {/* Image Upload Section */}
          <div className="flex items-center">
            <label className="w-1/3 font-bold text-gray-700 mr-2">Image:</label>
            <div className="w-2/3">
              {animal.image ? (
                <div className="flex flex-col ">
                  <img
                    className="w-32 h-32 rounded-lg  object-cover mb-2"
                    src={animal.image}
                    alt={animal.name}
                  />
                  <label className="block w-full ">
                    <div className="flex items-center text-blue-500 cursor-pointer">
                      <PiUploadFill className="mr-2" />
                      <span>Change Image</span>
                    </div>
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/jpg"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              ) : (
                <label className="block cursor-pointer">
                  <div className="border border-dashed border-gray-400 rounded-lg p-2 w-32 h-32 flex flex-row items-center justify-center">
                    <PiUploadFill className="text-blue-500 mb-1" />
                    <span className="text-blue-500">Upload</span>
                  </div>
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg" //File Type Restriction
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
              <small className="text-gray-500 block mt-2">
                Allowed file types: png, jpg, jpeg
              </small>
            </div>
          </div>

          {/* Name Field */}
          <div className="flex items-center">
            <label className="w-1/3 font-bold text-gray-700 mr-2">
              Name <span className="text-red-500">*</span>:
            </label>
            <input
              type="text"
              name="name"
              value={animal.name}
              onChange={handleChange}
              required
              className="w-2/3 p-2 border rounded-lg"
            />
          </div>

          {/* Description Field */}
          <div className="flex items-center">
            <label className="w-1/3 font-bold text-gray-700 mr-2">
              Description <span className="text-red-500">*</span>:
            </label>
            <textarea
              name="description"
              value={animal.description}
              onChange={handleChange}
              required
              className="w-2/3 p-2 border rounded-lg"
            />
          </div>

          {/* Family Field */}
          <div className="flex items-center">
            <label className="w-1/3 font-bold text-gray-700 mr-2">
              Family <span className="text-red-500">*</span>:
            </label>
            <input
              type="text"
              name="family"
              value={animal.family}
              onChange={handleChange}
              required
              className="w-2/3 p-2 border rounded-lg"
            />
          </div>

          {/* Place of Found Field */}
          <div className="flex items-center">
            <label className="w-1/3 font-bold text-gray-700 mr-2">
              Place of Found <span className="text-red-500">*</span>:
            </label>
            <input
              type="text"
              name="place_of_found"
              value={animal.place_of_found}
              onChange={handleChange}
              required
              className="w-2/3 p-2 border rounded-lg"
            />
          </div>

          {/* Species Field */}
          <div className="flex items-center">
            <label className="w-1/3 font-bold text-gray-700 mr-2">
              Species <span className="text-red-500">*</span>:
            </label>
            <input
              type="text"
              name="species"
              value={animal.species}
              onChange={handleChange}
              required
              className="w-2/3 p-2 border rounded-lg"
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="w-full flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-2"
          >
            {id ? "Update" : "Add"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/Animals")}
            className="bg-gray-500 text-white py-2 px-4 rounded-lg"
          >
            Discard
          </button>
        </div>
      </form>
    </div>
  );
}

export default AnimalForm;
