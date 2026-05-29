import axios from "axios";

const API =
  "http://localhost:5000/api/recipes";

export const getRecipes =
  async () => {
    const res =
      await axios.get(API);

    return res.data;
  };

export const getRecipeById =
  async (id) => {
    const res =
      await axios.get(
        `${API}/${id}`
      );

    return res.data;
  };

export const addRecipe =
  async (recipe) => {
    await axios.post(
      API,
      recipe
    );
  };

export const updateRecipe =
  async (id, recipe) => {
    await axios.put(
      `${API}/${id}`,
      recipe
    );
  };

export const deleteRecipe =
  async (id) => {
    await axios.delete(
      `${API}/${id}`
    );
  };