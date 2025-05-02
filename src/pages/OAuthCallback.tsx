
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "@/store/auth"

export default function OAuthCallback() {
  const navigate = useNavigate()
  const setToken = useAuthStore((state) => state.setToken)

  useEffect(() => {
    const url = new URL(window.location.href)
    const token = url.searchParams.get("code")

    if (token) {
      setToken(token) // ✅ Zustand + persist로 저장됨
      navigate("/my") // ✅ 로그인 후 이동할 페이지
    } else {
      navigate("/login") // ❌ 토큰 없으면 로그인 페이지로
    }
  }, [setToken, navigate])

  return (
    <div className="flex h-screen items-center justify-center text-lg font-semibold">
      로그인 처리 중입니다...
    </div>
  )
}