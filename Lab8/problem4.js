function primeFactorization(n, primeCounts) {
  let i = 2;
  while (i * i <= n) {
      while (n % i === 0) {
          primeCounts[i] = (primeCounts[i] || 0) + 1;
          n = Math.floor(n / i);
      }
      i++;
  }
  if (n > 1) {
      primeCounts[n] = (primeCounts[n] || 0) + 1;
  }
}

function lcmOfNumbers(numbers) {
  const primeCounts = {};

  for (const n of numbers) {
      const tempCounts = {};
      primeFactorization(n, tempCounts);

      for (const [prime, count] of Object.entries(tempCounts)) {
          primeCounts[prime] = Math.max(primeCounts[prime] || 0, count);
      }
  }

  let lcm = 1n;
  for (const [prime, count] of Object.entries(primeCounts)) {
      lcm *= BigInt(prime) ** BigInt(count);
  }

  return lcm.toString();
}

let numbers;
do {
  const input = prompt("5 тоогоо оруулна уу:");
  if (input.toLowerCase() === 'exit') break;

  numbers = input.split(",").map(num => parseInt(num.trim()));

  if (numbers.length !== 5 || numbers.some(isNaN)) {
      alert("Яг 5 тоо оруулна уу.");
      numbers = null;
  }
} while (!numbers);

if (numbers) {
  const lcm = lcmOfNumbers(numbers);
  alert(`ХБЕХ: ${lcm}`);  
}