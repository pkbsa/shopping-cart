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
      document.getElementById("regForm").submit();
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
    console.log(y[i])
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className = "field__input invalid";
      // and set the current valid status to false:
      valid = false;
    } else if (!y[i].value.match(y[i].pattern)) {
      // If the value does not match the pattern defined in the form, add an "invalid" class to the field:
      y[i].className = "field__input invalid";
      // and set the current valid status to false:
      valid = false;
    } else {
      y[i].className = "field__input";
    }
  }

  let Fname = document.getElementById('firstname');
  let Lname = document.getElementById('lastname');
  let Address = document.getElementById('address');
  let Subdistrict = document.getElementById('subdistrict');
  let District = document.getElementById('district');
  let Province = document.getElementById('province');
  let zipcode = document.getElementById("zipcode");
  let phone = document.getElementById("phone");
  let paymentDate = document.getElementById("date");
  let paymentTime = document.getElementById("time");


  let zipCodeRegex = /^[0-9]{5}$/;
  let phoneRegex = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
  let dateRegex = /^[0-3][0-9]\/[0-1][0-9]\/256[5-9]$/;
  let timeRegex = /^[0-9]{2}:[0-9]{2}$/;

  if(Fname.classList.contains('invalid')){
    document.getElementById('fnameField').className = 'field red'
  }else{
    document.getElementById('fnameField').className = 'field'
  }
  if(Lname.classList.contains('invalid')){
    document.getElementById('lnameField').className = 'field red'
  }else{
    document.getElementById('lnameField').className = 'field'
  }
  if(Address.classList.contains('invalid')){
    document.getElementById('addressField').className = 'field red'
  }else{
    document.getElementById('addressField').className = 'field'
  }
  if(Subdistrict.classList.contains('invalid')){
    document.getElementById('subdistrictField').className = 'field red'
  }else{
    document.getElementById('subdistrictField').className = 'field'
  }
  if(District.classList.contains('invalid')){
    document.getElementById('districtField').className = 'field red'
  }else{
    document.getElementById('districtField').className = 'field'
  }
  if(Province.classList.contains('invalid')){
    document.getElementById('provinceField').className = 'field red'
  }else{
    document.getElementById('provinceField').className = 'field'
  }

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
    // if(!dateRegex.test(paymentDate.value)){
    //   paymentDate.className += " invalid"
    //   let dateField = document.getElementById('datefield')
    //   dateField.className += ' red'
    //   valid = false
    // }else{
    //   let dateField = document.getElementById('datefield')
    //   dateField.className = 'field'
    // }
    // if(!timeRegex.test(paymentTime.value)){
    //   paymentTime.className += " invalid"
    //   let timeField = document.getElementById('timefield')
    //   timeField.className += ' red'
    //   valid = false
    // }else{
    //   let timeField = document.getElementById('timefield')
    //   timeField.className = 'field'
    // }
  

  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}
