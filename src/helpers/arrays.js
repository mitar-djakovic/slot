export const countElements = (array) => {
  return array.reduce(function (accumulator, currentValue, index) {
    if (typeof accumulator[currentValue.name] == 'undefined') {
      accumulator[currentValue.name] = 1;
    } else {
      accumulator[currentValue.name] += 1;
    }

    return accumulator;
  }, {});
}
