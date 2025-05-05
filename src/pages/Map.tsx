// 지도 기반의 검색 페이지. 메인 페이지이자 진입 페이지.
// 도메인 상에서 "지도 도메인"

import { useState } from "react"
import { SearchBar } from "@/components/domain/SearchBar"

const mockData = [
  "카카오",
  "카카오엔터테인먼트",
  "카카오테크부트캠프 판교캠퍼스 교육장 유스페이스",
  "카리나",
  "카카오",
  "카리나",
  "카카오",
  "카카오",
]

export default function Map() {
  const [search, setSearch] = useState("")
  
  localStorage.setItem("accessToken", "1234")
  console.log("accessToken", localStorage.getItem("accessToken"));
  const isLoggedIn = !!localStorage.getItem("accessToken");
  console.log("isLoggedIn", isLoggedIn);
  return (
    <>
    <div className="pt-2 w-full">
      <SearchBar
        placeholder="검색어를 입력하세요."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        suggestions={mockData}
        onSuggestionSelect={(value: string) => setSearch(value)}
      />
      <div className="mt-4"></div>
      <h1 className="text-2xl font-bold">검색어: {search}</h1>
    </div>
    </>
  )
}