"use client";
import Header from "../_components/header";
import CategoriesContainer from "./_components/categoriesContainer";
import InitialContainer from "./_components/initialContainer";

const Home = () => {
  return (
    <>
      <Header />
      <div className="flex justify-center overflow-hidden mt-20">
        <InitialContainer />
      </div>
      <div className="flex flex-col items-center justify-center w-full mt-24">
        <section className="w-[80%] ">
          <h1 className="text-3xl font-bold">Categorias</h1>

          <div className="mt-12">
            <CategoriesContainer />
          </div>
        </section>

        <section className="h-96 bg-red-300">a</section>
      </div>
    </>
  );
};

export default Home;
