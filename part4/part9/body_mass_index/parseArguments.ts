const parseArguments = (...args: string[]): number[] => {
  const parsedArgs = args.map((arg) => {
    const num = Number(arg);
    if (isNaN(num)) throw new Error("Provided values were not number!");
    return num;
  });

  return parsedArgs;
};
export default parseArguments;
