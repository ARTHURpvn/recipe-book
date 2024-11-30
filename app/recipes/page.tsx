import AddRecipe from "../_components/_form/addRecipe";
import Header from "../_components/header";

const RecipesPage = () => {
  console.log("RENDER");
  return (
    <>
      <Header />
      <section className=" mx-20 mt-20">
        <AddRecipe />
      </section>
    </>
  );
};

export default RecipesPage;
