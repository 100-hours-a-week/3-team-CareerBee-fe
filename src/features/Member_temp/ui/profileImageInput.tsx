'use client';

import noProfile from '@/public/images/no-profile.png';
import imageUpdate from '@/src/features/member/assets/image-update.png';
import { useUserInfo } from '@/src/features/member/model/useUserInfo';
import { useDirty } from '@/src/features/member/model/isDirtyContext';

import React, { useState } from 'react';

export default function ProfileImageUploader({
  onFileSelect,
}: {
  onFileSelect: (_file: File | null) => void;
}) {
  const { data: userInfo } = useUserInfo();
  const { setIsProfileImageDirty } = useDirty();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [, setSelectedFile] = useState<File | null>(null);
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    onFileSelect(file);

    const localUrl = URL.createObjectURL(file);
    setPreviewUrl(localUrl);
    setIsProfileImageDirty(true);
  };

  return (
    <div className="flex relative justify-center w-full ">
      <label htmlFor="profile-upload" className="cursor-pointer relative w-24 h-24">
        <img
          src={previewUrl || userInfo?.profileUrl || noProfile}
          alt="프로필 이미지"
          className="w-24 h-24 rounded-full object-cover p-1"
        />
        <input
          id="profile-upload"
          type="file"
          accept="image/jpeg, image/png, image/webp, image/jpg"
          className="hidden"
          onChange={handleImageUpload}
        />
        <img
          src={imageUpdate.src}
          alt="이미지 업데이트"
          className="absolute inset-[70px] right-center w-[1.3125rem] h-[1.3125rem]"
        />
      </label>
    </div>
  );
}
