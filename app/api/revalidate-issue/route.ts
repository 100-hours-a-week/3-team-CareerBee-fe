import { revalidateTag } from 'next/cache';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const companyId = body.companyId;

    if (!companyId) {
      return new Response(JSON.stringify({ error: 'companyId is required' }), {
        status: 400,
      });
    }

    revalidateTag(`company-issue-${companyId}`);

    return new Response(
      JSON.stringify({ revalidated: true, now: Date.now() }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}