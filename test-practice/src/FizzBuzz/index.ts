export type FizzBuzz = (num: number) => string | number;

export type FizzBuzzFactory = () => FizzBuzz;

export type FizzBuzzResult = "Fizz" | "Buzz" | "FizzBuzz" | number;

const fizzBuzz: FizzBuzz = (num) => {
  if (num % 3 === 0 && num % 5 === 0) {
    return "FizzBuzz";
  }
  if (num % 3 === 0) {
    return "Fizz";
  }
  if (num % 5 === 0) {
    return "Buzz";
  }

  return num;
};

const fizzBuzzFactory: FizzBuzzFactory = () => {
  return fizzBuzz;
};

export default fizzBuzzFactory;

export function isPrime(num: number): boolean {
  if (num === 1) return false;
  if (num === 2) return true;

  for (let i = 2; i <= Math.floor(Math.sqrt(num)); i++) {
    if (num % i === 0) return false;
  }

  return true;
}
