// 1. 비규칙적인 케이스를 방지하기 위해, 인자로 Date 객체를 받는다.
// 함수 내부에서 now처리를 할경우 테스트가 어려워진다.
export type AgeCalculator = (birthDate: Date, now: Date) => number;

export const ageCalculator: AgeCalculator = (birthDate: Date, now: Date) => {
  return 30;
};

export const createAgeCalculator = (): AgeCalculator => ageCalculator;
