export interface chartProps {
  rank: number;
  nickname: string;
  profileImgUrl: string;
  badgeImgUrl: string;
  elapsedTime: string;
  solvedCount: number;
  value: number;
}

export const mockChart: chartProps[] = [
  {
    rank: 1,
    nickname: '김춘식1',
    profileImgUrl: 'https://test1.jpeg',
    badgeImgUrl: 'https://test1.jpeg',
    elapsedTime: '03.24.123',
    solvedCount: 5,
    value: 100,
  },
  {
    rank: 2,
    nickname: '김춘식2',
    profileImgUrl: 'https://test1.jpeg',
    badgeImgUrl: 'https://test1.jpeg',
    elapsedTime: '04.24.123',
    solvedCount: 5,
    value: 95,

  },
    {
    rank: 3,
    nickname: '김춘식3',
    profileImgUrl: 'https://test1.jpeg',
    badgeImgUrl: 'https://test1.jpeg',
    elapsedTime: '04.24.123',
    solvedCount: 5,
    value: 50,
  },
      {
    rank: 4,
    nickname: '김춘식4',
    profileImgUrl: 'https://test1.jpeg',
    badgeImgUrl: 'https://test1.jpeg',
    elapsedTime: '04.24.123',
    solvedCount: 5,
    value: 40,
  },
];