import {Button} from "@/components/ui/button";

export default function Login(){
    return (
      // <div></div>
        <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-center text-2xl font-bold ">
          No.1 AI기반 커리어 길찾기 서비스<br />
          커리어비에 오신 것을<br />
          환영합니다! 
        </h1>  
        <p className="text-center text-lg">
          지금 바로 로그인하고 <br />
          맞춤형 서비스를 경험해보세요
        </p>
        <Button label="카카오톡으로 시작하기" size="lg" fullWidth={true} className="mx-16 mb-8"></Button>
      </div>
    );
}