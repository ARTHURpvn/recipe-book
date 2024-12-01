"use client";
import Header from "../_components/header";
import InitialContainer from "./_components/initialContainer";

const Home = () => {
  // const handleAddRecipe = async () => {
  //   await createRecipe({
  //     authorId: "user-123",
  //     categories: [{ name: "LUNCH" }],
  //     cookTime: 40,
  //     description: "Um delicioso leitinho.",
  //     ingredients: [
  //       { ingredient: "FLUOR", quantity: "100", quantity_type: "CUP" },
  //       { ingredient: "MILK", quantity: "1", quantity_type: "LITRE" },
  //     ],
  //     instructions: "Misture os ingredientes e leve ao forno por 40 minutos.",
  //     photo: "https://example.com/bolo.jpg",
  //     prepTime: 20,
  //     servings: 1,
  //     title: "Bolo de Leitinho",
  //   });
  // };

  return (
    <div className="">
      <Header />
      <InitialContainer />
      <div className="flex gap-12"></div>
    </div>
  );
};

export default Home;
