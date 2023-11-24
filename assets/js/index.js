document.addEventListener("DOMContentLoaded", () => {
    filterContainer = document.querySelector(".filter-container");
    filterDropdown = document.querySelector(".filter-dropdown")

    filterContainer.addEventListener("click", () => {
        filterDropdown.classList.toggle("d-none")
    })
})