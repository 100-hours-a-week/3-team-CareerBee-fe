import {Button}   from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {Toggle} from "@/components/ui/toggle";
import { PiBookmarkSimple, PiBookmarkSimpleFill } from "react-icons/pi";
import{useState, useEffect} from "react";

import {FilterGroup} from "@/components/ui/filter";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { data } from "react-router-dom";

import {Toaster} from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast"

import axios from "axios";
import { ToastAction } from "@/components/ui/toast";
// import { ToastAction } from "@/components/ui/toast";

import { Modal } from "@/components/ui/modal";

export default function Home() {


  const [data, setData] = useState<string | null>(null);
  const { toast } = useToast();

  // useEffect(() => {
  //   axios.get("https://api.careerbee.co.kr/")
  //     .then((res) => {
  //       const msg = typeof res.data === "string" ? res.data : res.data?.message ?? "응답 형식 알 수 없음";
  //       setData(msg);
  //       console.log("✅ 백엔드 응답 메시지:", msg);
  //     })
  //     .catch((err) => {
  //       const msg = err.response?.data?.message ?? "알 수 없는 에러";
  //       setData(msg);
  //       console.error("❌ 백엔드 응답 메시지:", msg);
  //     });
  // }, []);

  return (
    <>
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold text-center">Careerbee에 오신 걸 환영합니다!</h1>
      <p className="text-lg text-center">헬스 체크 상태: {data}</p>
    </div>

    <Toaster />
    <Button label="popup toast" onClick={()=>{
      toast({
        title: "데이터를 불러오는데 실패했어요.",
      });
    }}/>    
    <Button label="error toast" onClick={()=>{
      toast({
        title: "저장 성공",
        variant: "success",
      });
    }}/>

    <Modal
        trigger="모달 열기"
        title="모달입니다."
        description="이야 대박"
        cancelText="Cancel"
        actionText="Continue"
        cancelButton={true}
    />

    </>
  );
  }