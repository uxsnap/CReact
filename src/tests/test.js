export const test = (tests, func) => {
  tests.forEach((test, index) => {
    try {
      func(test, index);
    } catch (err) {
      console.log(err);
      console.log("Error here: " + JSON.stringify(test));
    }
  });
};
