export type FizzBuzz = (num: number) => string | number;

export type FizzBuzzFactory = () => FizzBuzz;

export type FizzBuzzResult =
  | "Fizz"
  | "Buzz"
  | "FizzBuzz"
  | "Whiz"
  | "FizzWhiz"
  | "BuzzWhiz"
  | number;

const fizzBuzz: FizzBuzz = (num) => {
  if (num === 3 && isPrime(num)) {
    return "FizzWhiz";
  }
  if (num === 5 && isPrime(num)) {
    return "BuzzWhiz";
  }

  if (num % 3 === 0 && num % 5 === 0) {
    return "FizzBuzz";
  }
  if (num % 3 === 0 && !isPrime(num)) {
    return "Fizz";
  }
  if (num % 5 === 0 && !isPrime(num)) {
    return "Buzz";
  }
  if (isPrime(num)) {
    return "Whiz";
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
