import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import Filter from "./filterContainer";

const Search = ({
  setSearch,
}: {
  setSearch: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="flex gap-6">
      <div className="relative">
        <Input
          placeholder="Pesquise..."
          className="w-96 rounded-full bg-white/5"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <Button variant={"ghost"} className="absolute right-0 top-0">
          <SearchIcon />
        </Button>
      </div>

      <Filter />
    </div>
  );
};

export default Search;
