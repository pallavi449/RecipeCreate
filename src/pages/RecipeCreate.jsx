import { useState } from "react";
import Navbar from "../components/Navbar";

function RecipeCreate() {
  const [name, setName] =
    useState("");

  return (
    <>
      <Navbar />

      <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-xl shadow">

        <h2 className="text-2xl font-bold mb-4">
          Add Recipe
        </h2>

        <input
          className="border p-3 w-full rounded-lg"
          placeholder="Recipe Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <button className="mt-4 bg-orange-500 text-white px-5 py-2 rounded-lg">
          Add Recipe
        </button>
      </div>
    </>
  );
}

export default RecipeCreate;