// 1. 비규칙적인 케이스를 방지하기 위해, 인자로 Date 객체를 받는다.
// 함수 내부에서 new Date()처리를 할 경우 테스트가 어려워진다.
export type AgeCalculator = (birthDate: Date, target: Date) => number;

export const ageCalculator: AgeCalculator = (birthDate: Date, target: Date) => {
  const targetYear = target.getFullYear();
  const targetMonth = target.getMonth();
  const targetDate = target.getDate();

  const birthYear = birthDate.getFullYear();
  const birthMonth = birthDate.getMonth();
  const birthDay = birthDate.getDate();

  const diffYear = targetYear - birthYear;
  // 윤년 처리
  if (
    targetMonth < birthMonth ||
    (targetMonth === birthMonth && targetDate < birthDay)
  ) {
    return diffYear - 1;
  }

  return diffYear;
};

export const createAgeCalculator = (): AgeCalculator => ageCalculator;
