'use client';

import { Button } from '@/src/widgets/ui/button';

import Footer from '@/src/entities/member/ui/footer';
import CustomerService from '@/src/entities/member/ui/CustomerService';
import ProfileUpdate from '@/src/features/member/ui/ProfileUpdate';

import { DirtyProvider } from '@/src/features/member/model/isDirtyContext';

import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  return (
    <DirtyProvider>
      <div className="flex flex-col h-full">
        <div className="py-3 w-full mb-auto">
          <ProfileUpdate />
          <CustomerService />
          <div className="flex px-16 py-3 gap-2 border border-transparent border-b-border/30">
            <Button
              label="회원탈퇴"
              size="sm"
              variant="link"
              className="underline pl-3 py-2"
              onClick={() => {
                router.push('/my/account/quit');
              }}
            ></Button>
          </div>
        </div>
        <Footer />
      </div>
    </DirtyProvider>
  );
}
