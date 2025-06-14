import { safePost } from '@/lib/request';

interface PresignedUploadOptions {
  file: File | null;
  token: string | null;
  type: 'image' | 'resume'; // Query param
  uploadType: 'PROFILE_IMAGE' | 'RESUME'; // Body param
}

export async function handlePresignedUrl({
  file,
  token,
  type,
  uploadType,
}: PresignedUploadOptions): Promise<string | null> {
  if (!file || !token) return null;

  const extension = file.name.split('.').pop()?.toLowerCase();
  if (!extension) return null;

  const presignedRes = await safePost(
    `/api/v1/s3/presigned-url?type=${type}`,
    {
      fileName: file.name,
      extension,
      uploadType,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const { uploadUrl, objectKey } = presignedRes.data;

  await fetch(uploadUrl, {
    method: 'PUT',
    body: file,
  });

  return objectKey;
}
