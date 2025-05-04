import { useState } from "react";
import { SearchBar } from "@/components/domain/SearchBar";

export default function Home() {
  const [search, setSearch] = useState("");

  return (
    <>
      <SearchBar
        placeholder="검색어를 입력하세요."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {/* <div className="mt-4">🔍 검색어: {search}</div>  */}
    </>
  );
}