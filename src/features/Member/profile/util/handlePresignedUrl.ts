import { safePost } from '@/lib/request';

export async function handleProfileImageUpload(file: File | null, token: string | null) {
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

  const { uploadUrl, objectUrl } = presignedRes.data;

  await fetch(uploadUrl, {
    method: 'PUT',
    body: file,
  });

  return objectUrl;
}
