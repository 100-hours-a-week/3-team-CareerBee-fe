// 지도 기반의 검색 페이지. 메인 페이지이자 진입 페이지.
// 도메인 상에서 "지도 도메인"

import { useState, useEffect } from "react"
import { SearchBar } from "@/components/domain/SearchBar"
import { Map } from "react-kakao-maps-sdk";

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

export default function Main() {
  const [search, setSearch] = useState("")
  
  localStorage.setItem("accessToken", "1234")
  const isLoggedIn = !!localStorage.getItem("accessToken");

  // const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
  // const options = { //지도를 생성할 때 필요한 기본 옵션
  //   center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
  //   level: 3 //지도의 레벨(확대, 축소 정도)
  // };

  // const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const script = document.createElement("script")
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAOMAP_KEY}&autoload=false`
    script.async = true
    script.onload = () => {
      window.kakao.maps.load(() => {
        setLoaded(true)
      })
    }
    document.head.appendChild(script)
  }, [])
  return (
    <>
    <div className="py-2 w-full">
      <SearchBar
        placeholder="검색어를 입력하세요."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        suggestions={mockData}
        onSuggestionSelect={(value: string) => setSearch(value)}
      />
    </div>
    {/* <div className="flex-1 overflow-auto"> */}
      {loaded && (
          <Map
            center={{ lat: 37.40014087574066, lng: 127.10677853166985 }}
            className="w-[calc(100%+2rem)] h-full"
            level={4}
          />
        )}
    {/* </div> */}
    </>
  )
}