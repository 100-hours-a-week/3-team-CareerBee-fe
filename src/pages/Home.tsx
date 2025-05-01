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

import axios from "axios";
export default function Home() {
  // const [pressed, setPressed] =useState(false);
  // const FILTERS = [
  //   { id: "open", label: "✅ 채용 중" },
  //   { id: "bookmark", label: "📍 저장" },
  //   { id: "si", label: "SI" },
  //   { id: "game", label: "게임" },
  //   { id: "finance", label: "금융" },
  //   { id: "security", label: "보안" },
  //   { id: "service", label: "서비스" },
  // ];
  //   return (
  //   <>
  //   <div>홈 페이지</div>
  //   <Button label="hello"></Button>
  //   <Button label="hello" disabled={true}></Button>

  //   <Input placeholder="hello"/>
  //   <label htmlFor="email">이메일</label>
  //   <Input id="email" placeholder="hello" type="email" maxLength={2}/>

  //   <Tabs defaultValue="account" className="w-[400px]">
  //     <TabsList>
  //       <TabsTrigger value="account" variant={"company"}>Account</TabsTrigger>
  //       <TabsTrigger value="password" variant={"company"}>Password</TabsTrigger>
  //       <TabsTrigger value="no" variant={"company"}>기업 상세</TabsTrigger>
  //       <TabsTrigger value="yes" variant={"company"}>Password</TabsTrigger>
  //     </TabsList>
  //     <TabsContent value="account">Make changes to your account here.</TabsContent>
  //     <TabsContent value="password">Change your password here.</TabsContent>
  //   </Tabs>

  //   <Toggle
  //     variant="save"
  //     pressed={pressed}
  //     onPressedChange={setPressed}
  //   >
  //     {pressed ? <PiBookmarkSimpleFill className="text-primary" /> : <PiBookmarkSimple />}
  //   </Toggle>
  //   <Toggle
  //     variant="pill"
  //   >
  //     📍 저장
  //   </Toggle>

  //   <FilterGroup filters={FILTERS} />

  //   <Select>
  //     <SelectTrigger className="w-[180px]">
  //       <SelectValue placeholder="Theme" />
  //     </SelectTrigger>
  //     <SelectContent>
  //       <SelectItem value="light">Light</SelectItem>
  //       <SelectItem value="dark">Dark</SelectItem>
  //       <SelectItem value="system">System</SelectItem>
  //     </SelectContent>
  //   </Select>

  //   </>
  // );

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
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold text-center">Careerbee에 오신 걸 환영합니다!</h1>
      <p className="text-lg text-center">헬스 체크 상태: {data}</p>
    </div>
  );
  }