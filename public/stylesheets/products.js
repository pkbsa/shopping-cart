let notAvailableLinks = document.getElementsByClassName("notAvailable");

for (let i = 0; i < notAvailableLinks.length; i++) {
    notAvailableLinks[i].href = "#";
    notAvailableLinks[i].textContent = "SOLD OUT";
}
