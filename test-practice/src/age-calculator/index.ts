// 1. 비규칙적인 케이스를 방지하기 위해, 인자로 Date 객체를 받는다.
// 함수 내부에서 now처리를 할경우 테스트가 어려워진다.
export type AgeCalculator = (birthDate: Date, now: Date) => number;

export const ageCalculator: AgeCalculator = (birthDate: Date, now: Date) => {
  const nowYear = now.getFullYear();
  const nowMonth = now.getMonth();
  const nowDate = now.getDate();

  const birthYear = birthDate.getFullYear();
  const birthMonth = birthDate.getMonth();
  const birthDay = birthDate.getDate();

  const age = nowYear - birthYear;
  // 윤년 처리
  if (
    nowMonth < birthMonth ||
    (nowMonth === birthMonth && nowDate < birthDay)
  ) {
    return age - 1;
  }

  return age;
};

export const createAgeCalculator = (): AgeCalculator => ageCalculator;
