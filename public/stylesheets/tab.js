var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  var nextBtn = document.getElementById("nextBtn");
  if (n == x.length - 1) {
    nextBtn.innerHTML = "Submit";
    setTimeout(() => {
      nextBtn.setAttribute("type", "submit");
    }, 500);
  } else {
    nextBtn.innerHTML = "Next";
    nextBtn.setAttribute("type", "button");
  }
  // ... and run a function that displays the correct step indicator:
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    if (validateForm()) {
      //...the form gets submitted:
      document.getElementById("myForm").submit();
    }
    return false;
  }
  showTab(currentTab);
  // Otherwise, display the correct tab:
}

function validateForm() {
  // This function deals with validation of the form fields
  var x,
    y,
    i,
    valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false:
      valid = false;
    }
  }

  let zipcode = document.getElementById("zipcode");
  let zipCodeRegex = /^[0-9]{5}$/;
  let phone = document.getElementById("phone");
  let phoneRegex = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;

  if (!zipCodeRegex.test(zipcode.value)) {
    zipcode.className += " invalid"
    valid = false
    let zipcodeField = document.getElementById('zipcodefield')
    zipcodeField.className += ' red'
  }else{
    let zipcodeField = document.getElementById('zipcodefield')
    zipcodeField.className = 'field'
  }
  if (!phoneRegex.test(phone.value)) {
    phone.className += " invalid"
    valid = false
    let phoneField = document.getElementById('phonefield')
    phoneField.className += ' red'
  }else{
    let phoneField = document.getElementById('phonefield')
    phoneField.className = 'field'
  }
  

  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}
