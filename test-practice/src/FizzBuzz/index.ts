export type FizeBuzz = (num: number) => string | number;

export type FizeBuzzFactory = () => FizeBuzz;

export type FizeBuzzResult = "Fizz" | "Buzz" | "FizzBuzz" | number;

const fizeBuzz: FizeBuzz = (num) => {
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

const fizeBuzzFactory: FizeBuzzFactory = () => {
  return fizeBuzz;
};

export default fizeBuzzFactory;
