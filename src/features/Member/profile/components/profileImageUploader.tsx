import noProfile from '/assets/no-profile.png';
import imageUpdate from '@/features/Member/profile/image/image-update.png';
import { useUserInfo } from '@/hooks/useUserInfo';
import { useDirty } from '../contexts/isDirtyContext';

import React, { useState } from 'react';

export default function ProfileImageUploader({
  onFileSelect,
}: {
  onFileSelect: (_file: File | null) => void;
}) {
  const { data: userInfo } = useUserInfo();
  const { isDirty, setIsDirty } = useDirty();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    onFileSelect(file);

    const localUrl = URL.createObjectURL(file);
    setPreviewUrl(localUrl);
    setIsDirty(true);
  };

  return (
    <div className="flex justify-center w-full ">
      <label htmlFor="profile-upload" className="cursor-pointer relative w-24 h-24">
        <img
          src={previewUrl || userInfo?.profileUrl || noProfile}
          alt="프로필 이미지"
          className="w-24 h-24 rounded-full object-cover p-1"
        />
        <input
          id="profile-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </label>
      <img
        src={imageUpdate}
        alt="이미지 업데이트"
        className="absolute bottom-1 right-1 w-[1.3125rem] h-[1.3125rem]"
      />
    </div>
  );
}
