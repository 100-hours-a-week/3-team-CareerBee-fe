// 대회 시작 시간 (KST 기준)
const startHourKST = 9;
const startMinuteKST = 0;

// 대회 기간 (분 단위)
export const DURATION = 60 * 12;

// 대회 시작 시간 (UTC 기준)
export const COMPETITION_START_TIME =
  ((((startHourKST - 9) % 24) + 24) % 24) * 60 * 60 * 1000 + startMinuteKST * 60 * 1000;

// 대회 종료 시간
export const COMPETITION_END_TIME = COMPETITION_START_TIME + DURATION * 60 * 1000;
