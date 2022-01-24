import Header from "../../components/Header";
import api from "../../services/api";
import { Food } from "../../components/Food";
import ModalAddFood from "../../components/ModalAddFood";
import ModalEditFood from "../../components/ModalEditFood";
import { FoodsContainer } from "./styles";

import { useEffect, useState } from "react";

interface FoodProps {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image: string;
}

export default function Dashboard() {
  const [foods, setFoods] = useState<FoodProps[]>([]);
  const [editingFood, setEditingFood] = useState<FoodProps>();
  const [modalOpen, SetModalOpen] = useState(false);
  const [editModalOpen, SetEditModalOpen] = useState(false);

  useEffect(() => {
    async function foods() {
      const response = await api.get<FoodProps[]>("/foods");
      const data = response.data;

      setFoods(data);
    }

    foods();
  }, []);

  // Add new food from modal and setFood
  const handleAddFood = async (food: FoodProps) => {
    try {
      const response = await api.post("/foods", {
        ...food,
        available: true,
      });

      setFoods([...foods, response.data]);
    } catch (err) {
      console.log(err);
    }
  };

  // Add new food from modal and setFood
  const handleUpdateFood = async (food: FoodProps) => {
    try {
      const foodUpdated = await api.put(`/foods/${food.id}`, {
        ...editingFood,
        ...food,
      });

      const foodsUpdated = foods.map((f) =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data
      );

      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  };

  /* 
    Delete food from API and setFood 
  */
  const handleDeleteFood = async (id: number) => {
    await api.delete<FoodProps[]>(`/foods/${id}`);

    const foodsFiltered = foods.filter((food) => food.id !== id);
    setFoods([...foodsFiltered]);
  };

  const toggleModal = () => {
    SetModalOpen(!modalOpen);
  };

  const toggleEditModal = () => {
    SetEditModalOpen(!editModalOpen);
  };

  const handleEditFood = (food: FoodProps) => {
    setEditingFood(food);
    SetEditModalOpen(true);
  };

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map((food) => (
            <Food
              key={food.id}
              food={food}
              handleDelete={() => handleDeleteFood(food.id)}
              handleEditFood={() => handleEditFood(food)}
            />
          ))}
      </FoodsContainer>
    </>
  );
}
