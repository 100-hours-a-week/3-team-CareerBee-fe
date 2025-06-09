import { safePost, safePatch } from '@/lib/request';
import { toast } from '@/hooks/useToast';

// import { handleProfileImageUpload } from '../components/profileImageUploader';

export async function handleProfileImageUpload(file: File | null, token: string) {
  console.log('🗄️ ~ handleProfileImageUpload ~ file:', file);
  if (!file) return null;

  const extension = file.name.split('.').pop()?.toLowerCase();
  if (!extension) return null;

  const presignedRes = await safePost(
    '/api/v1/s3/presigned-url?type=image',
    {
      fileName: file.name,
      extension: extension,
      uploadType: 'PROFILE_IMAGE',
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  console.log(presignedRes.data);
  const { uploadUrl, objectUrl } = presignedRes.data;

  await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type,
    },
    body: file,
  });

  return objectUrl;
}

export const submitProfileUpdate = async ({
  file,
  nickname,
  email,
  profileUrl,
  onSuccess,
  onError,
  setIsDirty,
  setHelperText,
  token,
}: {
  file: File | null;
  nickname: string;
  email: string;
  profileUrl: string;
  onSuccess?: () => void;
  onError?: () => void;
  setIsDirty: (_value: boolean) => void;
  setHelperText: (_value: string) => void;
  token: string | null;
}) => {
  if (!token) return;

  const newProfileUrl = await handleProfileImageUpload(file, token);
  // handleProfileImageUpload(file, token);
  try {
    const res = await safePatch(
      '/api/v1/members',
      {
        newProfileUrl: newProfileUrl ? newProfileUrl : profileUrl,
        newNickname: nickname,
        newEmail: email,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    if (res.httpStatusCode === 204) {
      toast({ title: '저장 완료', variant: 'success' });
      setIsDirty(false);
      onSuccess?.();
    }
  } catch (err: any) {
    //TODO: 아마 여기서는 안 잡힐거임.... request에서 잡기 때문에...
    //request에서 잡아도 위로 throw할 수는 없을까???
    //아니면... 409의 경우만 catch에서 빼기???
    if (err.response?.status === 409) {
      setHelperText('이미 존재하는 이메일입니다.');
    } else {
      setHelperText('');
      toast({ title: '정보 수정에 실패했습니다.', variant: 'destructive' });
    }
    onError?.();
  }
};
