export type FizeBuzz = (num: number) => string | number;

export type FizeBuzzFactory = () => FizeBuzz;

export type FizeBuzzResult = "Fizz" | "Buzz" | "FizzBuzz" | number;

const fizeBuzz: FizeBuzz = (num) => {
  return num;
};

const fizeBuzzFactory: FizeBuzzFactory = () => {
  return fizeBuzz;
};

export default fizeBuzzFactory;
