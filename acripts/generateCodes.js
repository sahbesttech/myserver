// generateCodes.js

function generateActivationCode() {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const digits = '0123456789';
  let code = '';
  
  // Generate 6 random lowercase letters
  for (let i = 0; i < 6; i++) {
    code += letters[Math.floor(Math.random() * letters.length)];
  }
  
  // Generate 4 random digits
  for (let i = 0; i < 4; i++) {
    code += digits[Math.floor(Math.random() * digits.length)];
  }
  
  return code;
}

const numCodes = 100;
const codesSet = new Set();

// Ensure unique codes
while (codesSet.size < numCodes) {
  codesSet.add(generateActivationCode());
}

const codesArr = Array.from(codesSet);

// Map each code to a string formatted as {code:"<code>"}
const formattedCodes = codesArr.map(code => `{code:"${code}"}`).join(',');

// Wrap the output with square brackets and a space if needed
const output = `[ ${formattedCodes} ]`;

console.log(formattedCodes);
