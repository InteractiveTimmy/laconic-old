export default {
  camel: (input: string, capFirstChar: boolean): string => input
    .split('-')
    .map((word, i): string => (
      !capFirstChar && i === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    ))
    .join(''),
  dash: (input: string): string => input
    .split(/(?=[A-Z])/)
    .map((word): string => word.toLocaleLowerCase())
    .join('-'),
};
