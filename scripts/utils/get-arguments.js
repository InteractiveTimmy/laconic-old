module.exports = (values) => {
  const args = [...values].slice(2);

  return {
    command: args.splice(0, 1)[0],
    params: (args.length !== 0)
      ? args.join(' ').slice(2).split(' --').map(
        (argument) => ({
          argument: argument.split(' ').slice(0, 1)[0],
          targets: argument.split(' ').slice(1),
        }),
      ) : [],
  };
};
