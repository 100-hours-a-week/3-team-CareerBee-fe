import{useState, useEffect} from "react";

import axios from "axios";

export default function Home() {
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    axios.get("https://api.careerbee.co.kr/")
      .then((res) => {
        const msg = typeof res.data === "string" ? res.data : res.data?.message ?? "응답 형식 알 수 없음";
        setData(msg);
        console.log("✅ 백엔드 응답 메시지:", msg);
      })
      .catch((err) => {
        const msg = err.response?.data?.message ?? "알 수 없는 에러";
        setData(msg);
        console.error("❌ 백엔드 응답 메시지:", msg);
      });
  }, []);

  return (
    <>
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold text-center">Careerbee에 오신 걸 환영합니다!</h1>
      <p className="text-lg text-center">헬스 체크 상태: {data}</p>
    </div>

  
    </>
  );
  }