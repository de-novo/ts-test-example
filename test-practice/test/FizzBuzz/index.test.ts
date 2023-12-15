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

  describe("play", () => {
    describe("output: Fizz - 3의 배수", () => {
      const expected = "Fizz";

      it("input:3", () => {
        // Arrange
        num = 3;

        // Act
        const actual = fizzBuzz(num);

        // Assert
        expect(actual).toEqual(expected);
      });

      it("input:6", () => {
        // Arrange
        num = 6;

        // Act
        const actual = fizzBuzz(num);

        // Assert
        expect(actual).toEqual(expected);
      });
    });

    describe("output: Buzz - 5의 배수", () => {
      const expected = "Buzz";
      it("input:5", () => {
        // Arrange
        num = 5;

        // Act
        const actual = fizzBuzz(num);

        // Assert
        expect(actual).toEqual(expected);
      });

      it("input:10", () => {
        // Arrange
        num = 10;

        // Act
        const actual = fizzBuzz(num);

        // Assert
        expect(actual).toEqual(expected);
      });
    });

    describe("output: FizzBuzz - 3과 5의 배수", () => {
      const expected = "FizzBuzz";

      it("input:15", () => {
        // Arrange
        num = 15;

        // Act
        const actual = fizzBuzz(num);

        // Assert
        expect(actual).toEqual(expected);
      });

      it("input:30", () => {
        // Arrange
        num = 30;

        // Act
        const actual = fizzBuzz(num);

        // Assert
        expect(actual).toEqual(expected);
      });
    });

    describe("output: number - 그외", () => {
      it("input:1", () => {
        // Arrange
        num = 1;

        // Act
        const actual = fizzBuzz(num);

        // Assert
        expect(actual).toEqual(num);
      });

      it("input:2", () => {
        // Arrange
        num = 2;

        // Act
        const actual = fizzBuzz(num);

        // Assert
        expect(actual).toEqual(num);
      });
      it("input:4", () => {
        // Arrange
        num = 4;

        // Act
        const actual = fizzBuzz(num);

        // Assert
        expect(actual).toEqual(num);
      });
    });
  });

  describe("play each", () => {
    const testCases = new Array(20).fill(0).map((_, index) => index);
    describe("output: Fizz - 3의 배수", () => {
      const expected = "Fizz";
      const fizzTestCases = testCases.filter(
        (num) => num !== 0 && num % 3 === 0 && num % 5 !== 0
      );

      test.each(fizzTestCases)("input:%i", (testCase) => {
        // Arrange
        num = testCase;

        // Act
        const actual = fizzBuzz(num);

        // Assert
        expect(actual).toEqual(expected);
      });
    });

    describe("output: Buzz - 5의 배수", () => {
      const expected = "Buzz";

      const buzzTestCases = testCases.filter(
        (num) => num !== 0 && num % 5 === 0 && num % 3 !== 0
      );

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

      const fizzBuzzTestCases = testCases.filter(
        (num) => num !== 0 && num % 5 === 0 && num % 3 === 0
      );
      test.each(fizzBuzzTestCases)("input:%i", (testCase) => {
        // Arrange
        num = testCase;

        // Act
        const actual = fizzBuzz(num);

        // Assert
        expect(actual).toEqual(expected);
      });
    });

    describe("output: number - 그외", () => {
      const otherTestCases = testCases.filter(
        (num) => num !== 0 && num % 5 !== 0 && num % 3 !== 0
      );

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
