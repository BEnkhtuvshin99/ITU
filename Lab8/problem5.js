if (confirm("Do you want to enter a number?")) {
  let number = prompt("Please enter a number:");
  
  if (number !== null) {
      let currentHour = new Date().getHours();
      let currentTime = new Date().toLocaleTimeString();

      if (currentHour < 13) {
          alert("It's before noon. The square root of your number is: " + Math.sqrt(number) + "\nCurrent time: " + currentTime);
      } else {
          alert("It's after noon. You entered: " + Math.pow(number,2) + "\nCurrent time: " + currentTime);
      }
  }
} else {
  alert("No number entered.");
}