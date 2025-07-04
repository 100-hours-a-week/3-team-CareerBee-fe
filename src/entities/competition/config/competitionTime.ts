const startHourKST = Number(process.env.NEXT_COMPETITION_START_HOUR) || 13;
const startMinuteKST = Number(process.env.NEXT_COMPETITION_START_MINUTE) || 0;

export const DURATION = Number(process.env.NEXT_COMPETITION_DURATION_MS) || 10 * 60 * 1000;
export const AGGREGATE_TIME =
  Number(process.env.NEXT_COMPETITION_AGGREGATE_MS) || 10 * 60 * 1000;

// 대회 시작 시간 (UTC 기준)
export const COMPETITION_START_TIME: number =
  ((startHourKST - 9 + 24) % 24) * 60 * 60 * 1000 + startMinuteKST * 60 * 1000;

// 대회 종료 시간
export const COMPETITION_END_TIME: number = COMPETITION_START_TIME + DURATION;
