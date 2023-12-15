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
  const isDividedBy3 = num % 3 === 0;
  const isDividedBy5 = num % 5 === 0;
  const isPrimeNumber = isPrime(num);

  if (isDividedBy3 && isDividedBy5) {
    return "FizzBuzz";
  }
  if (isDividedBy3 && isPrimeNumber) {
    return "FizzWhiz";
  }
  if (isDividedBy5 && isPrimeNumber) {
    return "BuzzWhiz";
  }
  if (isDividedBy3) {
    return "Fizz";
  }
  if (isDividedBy5) {
    return "Buzz";
  }
  if (isPrimeNumber) {
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
