import fizzBuzzFactory, { FizzBuzz, isPrime } from "./../../src/FizzBuzz/index";
describe("FizzBuzz", () => {
  let fizzBuzz: FizzBuzz;
  let num: number | null;

  // Arrange
  beforeEach(() => {
    fizzBuzz = fizzBuzzFactory();
  });

  afterEach(() => {
    num = null;
  });

  describe("play each", () => {
    describe("output: Fizz - 3의 배수 이며 5의 배수, 소수가 아닌것", () => {
      const expected = "Fizz";
      const fizzTestCases = [6, 9, 12, 18, 21, 24, 27, 33, 36, 39, 42, 48];

      test.each(fizzTestCases)("input:%i", (testCase) => {
        // Arrange
        num = testCase;

        // Act
        const actual = fizzBuzz(num);

        // Assert
        expect(actual).toEqual(expected);
      });
    });

    describe("output: Buzz - 5의 배수이며 3의 배수, 소수가 아닌것", () => {
      const expected = "Buzz";

      const buzzTestCases = [10, 20, 25, 35, 40, 50, 55, 65, 70, 80, 85, 95];
      test.each(buzzTestCases)("input:%i", (testCase) => {
        // Arrange
        num = testCase;

        // Act
        const actual = fizzBuzz(num);

        // Assert
        expect(actual).toEqual(expected);
      });
    });

    describe("output: FizzBuzz - 3과 5의 배수", () => {
      const expected = "FizzBuzz";

      const fizzBuzzTestCases = [
        15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195,
      ];

      test.each(fizzBuzzTestCases)("input:%i", (testCase) => {
        // Arrange
        num = testCase;

        // Act
        const actual = fizzBuzz(num);

        // Assert
        expect(actual).toEqual(expected);
      });
    });

    describe("output: Whiz - 소수 이며 3과 5의 배수가 아닌것", () => {
      const expected = "Whiz";
      const whizTestCases = [2, 7, 11, 13, 17, 19];
      test.each(whizTestCases)("input:%i", (testCase) => {
        // Arrange
        num = testCase;

        // Act
        const actual = fizzBuzz(num);

        // Assert
        expect(actual).toEqual(expected);
      });
    });

    describe("output: FizzWhiz - 3의 배수 이며 소수", () => {
      const expected = "FizzWhiz";
      const FizzWhiz = [3];
      test.each(FizzWhiz)("input:%i", (testCase) => {
        // Arrange
        num = testCase;

        // Act
        const actual = fizzBuzz(num);

        // Assert
        expect(actual).toEqual(expected);
      });
    });

    describe("output: BuzzWhiz - 5의 배수 이며 소수", () => {
      const expected = "BuzzWhiz";
      const BuzzWhiz = [5];
      test.each(BuzzWhiz)("input:%i", (testCase) => {
        // Arrange
        num = testCase;

        // Act
        const actual = fizzBuzz(num);

        // Assert
        expect(actual).toEqual(expected);
      });
    });

    describe("output: number - 그외", () => {
      const otherTestCases = [1, 4, 8, 14, 16];

      test.each(otherTestCases)("input:%i", (testCase) => {
        // Arrange
        num = testCase;

        // Act
        const actual = fizzBuzz(num);

        // Assert
        expect(actual).toEqual(num);
      });
    });
  });

  describe("util fn test - isPrime", () => {
    describe("output: false", () => {
      const testCase = [1, 4, 6, 8, 9, 10, 12, 14, 15];

      test.each(testCase)("input:%i", (testCase) => {
        // Act
        const actual = isPrime(testCase);

        // Assert
        expect(actual).toEqual(false);
      });
    });

    describe("output: true", () => {
      const testCase = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];

      test.each(testCase)("input:%i", (testCase) => {
        // Act
        const actual = isPrime(testCase);

        // Assert
        expect(actual).toEqual(true);
      });
    });
  });
});
