"use client";
import Header from "../_components/header";
import InitialContainer from "./_components/initialContainer";

const Home = () => {
  // const handleAddRecipe = async () => {
  //   await createRecipe({
  //     title: "Bolo de Leitinho",
  //     description: "Um delicioso leitinho.",
  //     servings: 1,
  //     prepTime: 20,
  //     cookTime: 40,
  //     instructions: "Misture os ingredientes e leve ao forno por 40 minutos.",
  //     photo: "https://example.com/bolo.jpg",
  //     authorId: "user-123",
  //     ingredients: [
  //       { ingredient: "FLUOR", quantity: "100", quantity_type: "CUP" },
  //       { ingredient: "MILK", quantity: "1", quantity_type: "LITRE" },
  //     ],
  //     categories: [{ name: "LUNCH" }],
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
