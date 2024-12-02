import CardRecipe from "../_components/_cardRecipe";
import AddRecipe from "../_components/_form/addRecipe";
import Header from "../_components/header";

const RecipesPage = () => {
  console.log("RENDER");
  return (
    <>
      <Header />
      <section className=" mx-20 mt-20">
        <AddRecipe />

        <div className="flex justify-center gap-16 flex-wrap">
          <CardRecipe />
          <CardRecipe />
          <CardRecipe />
          <CardRecipe />
          <CardRecipe />
          <CardRecipe />
          <CardRecipe />
        </div>
      </section>
    </>
  );
};

export default RecipesPage;
