// 지도 기반의 검색 페이지. 메인 페이지이자 진입 페이지.
// 도메인 상에서 "지도 도메인"

import { useState, useEffect } from "react"
import { SearchBar } from "@/components/domain/SearchBar"
import { Map, MapMarker } from "react-kakao-maps-sdk";

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
const positions = [
  {
    title: "카테부",
    latlng: { lat: 37.40014087574066, lng: 127.10677853166985 },
    imgSrc: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
  },
  {
    title: "유스페이스1",
    latlng: { lat: 37.40041106942548, lng: 127.10690314875184 },
    imgSrc: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",

  },
  {
    title: "스타벅스",
    latlng: { lat: 37.40150898203711, lng: 127.10836729941134 },
    imgSrc: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",

  },
]

const KTB={
  lat: 37.40014087574066,
  lng: 127.10677853166985,
}

export default function Main() {
  const [search, setSearch] = useState("")
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const script = document.createElement("script")
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAOMAP_KEY}&autoload=false&libraries=clusterer,drawing`
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
      {loaded && (
          <Map
            center={{ lat: KTB.lat, lng: KTB.lng }}
            className="w-[calc(100%+2rem)] h-full"
            level={3}
          >
        {positions.map((position) => (
        <MapMarker
          key={`${position.title}-${position.latlng}`}
          position={position.latlng}
          image={{
            src: position.imgSrc, 
            size: {
              width: 24,
              height: 35
            },
          }}
          title={position.title} 
        />
      ))}
          </Map>
        )}
        
    </>
  )
}