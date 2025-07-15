import { baekjoonTierItems } from '@/src/features/resume/form/model/baekjoonTierItems';

export const findTier = (tierValue: string): string => {
  for (const tier of baekjoonTierItems) {
    if (tier.value === tierValue) return tier.label;
    const child = tier.children?.find((c) => c.value === tierValue);
    if (child) return child.label;
  }
  return tierValue;
};
