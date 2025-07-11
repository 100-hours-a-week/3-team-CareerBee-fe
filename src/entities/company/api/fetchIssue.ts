export const fetchIssue = async ({ companyId }: { companyId: number }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/companies/${companyId}/recent-issue`,
    {
      next: {
        tags: [`company-issue-${companyId}`],
      },
    },
  );
  if (res.status == 200) {
    const json = await res.json();
    return json.data.recentIssue;
  }
  return null;
};
