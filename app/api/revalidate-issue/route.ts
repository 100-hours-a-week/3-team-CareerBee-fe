import { revalidateTag } from 'next/cache';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const companyIds: number[] = Array.isArray(body.companyIds)
      ? body.companyIds
      : [body.companyId];

    if (!companyIds) {
      return new Response(JSON.stringify({ error: 'companyId is required' }), {
        status: 400,
      });
    }

    companyIds.forEach((id) => {
      revalidateTag(`company-issue-${id}`);
    });

    return new Response(JSON.stringify({ revalidated: true, companyIds, now: Date.now() }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}
