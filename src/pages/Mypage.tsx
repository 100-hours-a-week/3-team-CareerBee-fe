import axios from "axios";
import { useAuthStore } from "@/store/auth";
import { Button } from "@/components/ui/button";
import noProfile from '@/assets/no-profile.png'

export default function Mypage() {
  return (
    <>
    <div className="flex flex-col grow">
      <div className="flex h-fit px-8 py-4 gap-4 border border-transparent border-b-border/30">
        <img src={noProfile} className="bg-white rounded-full w-16 h-16 object-fill border border-border"></img>
        <div className="flex flex-col my-auto text-text-primary gap-1">
          <div className="text-xl my-auto font-bold">닉네임</div>
          <div className="text-sm">포인트 0</div>
        </div>
      </div>
      {/* <p className="px-8 py-4 text-sm leading-8">마이페이지는 업데이트 예정입니다.<br/> 커리어비의 여정을 지켜봐주세요!</p> */}
      <p className="w-full flex items-center justify-center text-xl font-black text-border pt-2">. . .</p>
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
