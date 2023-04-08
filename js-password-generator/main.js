// DOM Elements.
const resultEl = document.getElementById('result');
const clipboardEl = document.getElementById('clipboard');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numberEl = document.getElementById('number');
const symbolEl = document.getElementById('symbol');
const generateEl = document.getElementById('generate');

const randomFunc = {
  uppercase: getRandomUpperCase,
  lowercase: getRandomLowerCase,
  number: getRandomNumber,
  symbol: getRandomSymbol
};

// Generate Event Listener.
generateEl.addEventListener('click', () => {
  const Length = lengthEl.value;

  const hasUpperCase = uppercaseEl.checked;
  const hasLowerCase = lowercaseEl.checked;
  const hasNumber = numberEl.checked;
  const hasSymbol = symbolEl.checked;

  resultEl.innerText = generatePassword(
    hasUpperCase,
    hasLowerCase,
    hasNumber,
    hasSymbol,
    Length
  );
})

//Copy Password To Clipboard.
clipboardEl.addEventListener('click', () => {
  const textArea = document.createElement('textarea');
  const password = resultEl.innerText;

  if (!password) {
    return;
  }

  textArea.value = password;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  textArea.remove();
  alert('Password Has Been Copied To The Clipboard');
})

// Generate Password Function
function generatePassword(uppercase, lowercase, number, symbol, length) {
  let generatedPassword = '';

  const typeCount = uppercase + lowercase + number + symbol;

  const typeArr = [{ uppercase }, { lowercase }, { number }, { symbol }].filter((item) => {
    return Object.values(item)[0];
  });

  if (typeCount === 0) {
    return '';
  }

  for (let i = 0; i < length; i += typeCount) {
    typeArr.forEach((type) => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    })
  }

  const finalPassword = generatedPassword.slice(0, length);
  return finalPassword;
}

function getRandomUpperCase() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomLowerCase() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const Symbols = '!@#$%^&*(){}[]=<>/,.';
  return Symbols[Math.floor(Math.random() * Symbols.length)];
}