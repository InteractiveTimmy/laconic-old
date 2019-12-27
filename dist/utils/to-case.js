export default {
    camel: (input, capFirstChar) => input
        .split('-')
        .map((word, i) => (!capFirstChar && i === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
        .join(''),
    dash: (input) => input
        .split(/(?=[A-Z])/)
        .map((word) => word.toLocaleLowerCase())
        .join('-'),
};
