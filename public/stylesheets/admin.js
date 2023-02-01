var title = document.getElementById("heading")
if(title.classList.contains("home")){
    var sidebarHome = document.getElementById("sidebar-home")
    sidebarHome.className += " active"
}
if(title.classList.contains("orders")){
    var sidebarHome = document.getElementById("sidebar-orders")
    sidebarHome.className += " active"
}
if(title.classList.contains("products")){
    var sidebarHome = document.getElementById("sidebar-products")
    sidebarHome.className += " active"
}
if(title.classList.contains("users")){
    var sidebarHome = document.getElementById("sidebar-users")
    sidebarHome.className += " active"
}
document.addEventListener("DOMContentLoaded", function () {
    const selectElements = document.querySelectorAll("select[name='status']");
    selectElements.forEach(selectElement => {
      const options = selectElement.options;
      for (let i = 0; i < options.length; i++) {
        if (options[i].value === selectElement.getAttribute("value")) {
          options[i].selected = true;
          break;
        }
      }
    });
  });
  
