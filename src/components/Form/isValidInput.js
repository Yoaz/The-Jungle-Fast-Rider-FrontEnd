// Logic for checking valie user input based on set of rules for legit PIN number
function isValidInput(input) {
  const regex = /^JN-\d{4}-\d{4}-[A-Z]{2}$/;
  if (!regex.test(input)) {
    return false;
  }

  const firstFourDigits = input.substring(3, 7);
  const lastFourDigits = input.substring(8, 12);

  // Var's end with 1 for one before last letter, var's end with 2 for last letter
  let sum1 = 0;
  let sum2 = 0;
  for (let i = 0; i < 4; i++) {
    const digit1 = parseInt(firstFourDigits.charAt(i));
    const digit2 = parseInt(lastFourDigits.charAt(i));
    const weight1 = i % 2 === 0 ? 1 : 2;
    const weight2 = i % 2 === 0 ? 1 : 2;
    let product1 = digit1 * weight1;
    let product2 = digit2 * weight2;
    if (product1 > 9) {
      product1 = product1
        .toString()
        .split("")
        .reduce((acc, curr) => acc + parseInt(curr), 0);
    }
    if (product2 > 9) {
      product2 = product2
        .toString()
        .split("")
        .reduce((acc, curr) => acc + parseInt(curr), 0);
    }
    sum1 += product1;
    sum2 += product2;
  }
  const asciiCode1 = (sum1 % 26) + 65;
  const asciiCode2 = (sum2 % 26) + 65;
  const expectedChar1 = String.fromCharCode(asciiCode1);
  const expectedChar2 = String.fromCharCode(asciiCode2);
  console.log(`Expected Chars: ${expectedChar1} ${expectedChar2}`);

  return (
    input.charAt(13) === expectedChar1 && input.charAt(14) === expectedChar2
  );
}

export { isValidInput };
