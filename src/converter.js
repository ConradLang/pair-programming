const zeroToNineteen = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
];

const tens = [
  "",
  "",
  "twenty",
  "thirty",
  "fourty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety",
];

const threeDigitGroupNames = [
  "",
  "thousand",
  "million",
  "billion",
  "trillion",
  "quadrillion",
];

function convertTensAndUnits(amountText) {
  const tensValue = parseInt(amountText.slice(-2)) || 0;
  const zeroToNineteenText = zeroToNineteen[tensValue];

  if (zeroToNineteenText) {
    return zeroToNineteenText;
  }

  const unitsPart = parseInt(amountText.slice(-1)) || 0;
  const tensPart = parseInt(amountText.slice(-2, -1)) || 0;

  let overNineteenText = tens[tensPart] || "";

  if (overNineteenText && unitsPart > 0) {
    overNineteenText += ` ${zeroToNineteen[unitsPart] || ""}`;
  }

  return overNineteenText;
}

function convertHundreds(amountText) {
  const hundredsValue = parseInt(amountText.slice(-3, -2));

  if (!hundredsValue || hundredsValue === 0) {
    return "";
  }

  return `${zeroToNineteen[hundredsValue]} hundred`;
}

function convertThreeDigits(amountText, groupName) {
  if (amountText.length === 0) {
    return "";
  }

  const tensText = convertTensAndUnits(amountText);
  const hundredsText = convertHundreds(amountText);

  let amountAsText = hundredsText || "";
  if (hundredsText && tensText) {
    amountAsText += " and "
  };
  amountAsText += tensText || "";

  if (amountAsText && groupName) {
    amountAsText += ` ${groupName}`;
  }

  return amountAsText;
}

function convertAmount(amountText, amountAsText = "", groupNumber = 0) {
  if (amountText.length === 0) {
    return amountAsText;
  }

  if (groupNumber >= threeDigitGroupNames.length) {
    throw new Error("The amount is too large!");
  }

  const groupName = threeDigitGroupNames[groupNumber];
  const groupAmountAsText = convertThreeDigits(amountText, groupName);

  let combinedAmountAsText = groupAmountAsText;
  
  if (amountAsText) {
    combinedAmountAsText += ` ${amountAsText}`;
  }

  return convertAmount(amountText.slice(0, -3), combinedAmountAsText, groupNumber + 1);
}

// Assume amountText is an integer (cents not supported).
function convert(amountText) {
  const amountTextDigitsOnly = amountText.replace(/[^0-9]/g, "");

  if (!amountTextDigitsOnly) {
    throw new Error("No digits in amountText.");
  }

  const amountAsText = convertAmount(amountTextDigitsOnly);

  console.log(`${amountText} = ${amountAsText} dollars`);

  return `${amountAsText} dollars`;
}

module.exports = {
  convertAmount: convert,
}

// convert("0");
// convert("7");
// convert("18");
// convert("30");
// convert("59");
// convert("631");
// convert("2,045"); // There's a bug here with "two thousand fourty five dollars" instead of "two thousand *and* fourty five dollars"
// convert("19,824");
// convert("311,240");
// convert("9 258 430")
// convert("14_682_490");
// convert("123,456,789,987,654,321");
