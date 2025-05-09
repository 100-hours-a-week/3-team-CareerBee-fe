import axios from "axios";
import { useAuthStore } from "@/store/auth";
import { Button } from "@/components/ui/button";

export default function Mypage() {
  return (
    <>
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">🎉 로그인 완료</h1>
      <p className="text-lg">마이페이지는 현재 준비 중이에요. 곧 만나요!</p>
    </div>
    <Button
      label="로그아웃"
      size="sm"
      variant="link"
      className="mx-16 mb-8"
      onClick={async () => {
        const token = useAuthStore.getState().token;
        if (!token) return;

        try {
          await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/auth/logout`, null, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          useAuthStore.getState().clearToken?.();
          window.location.href = "/";
        } catch (error) {
          console.error("로그아웃 실패:", error);
        }
      }}
    />
    </>
  );
}
