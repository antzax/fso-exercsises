export type Operation = "multiply" | "add" | "divide";

export const calculator = (a: number, b: number, op: Operation): number => {
  switch (op) {
    case "multiply":
      return a * b;
    case "add":
      return a + b;
    case "divide":
      if (b === 0) throw new Error("Cant divide by 0!");
      return a / b;
    default:
      throw new Error("Operation is not multiply, add or divide");
  }
};

if (require.main === module) {
  try {
    console.log(calculator(1, 5, "divide"));
  } catch (error: unknown) {
    const errorMessage = "Something went wrong: ";
    if (error instanceof Error) {
      errorMessage + error.message;
    }
    console.log(errorMessage);
  }
}
