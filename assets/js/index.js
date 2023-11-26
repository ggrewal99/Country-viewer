document.addEventListener("DOMContentLoaded", () => {
    const filterContainer = document.querySelector(".filter-container");
    const filterDropdown = document.querySelector(".filter-dropdown");
    const loadMoreBtn = document.querySelector(".load-more-btn");
    let noOfResults = 20; // Show 20 results initially
    const filter = document.querySelectorAll(".filter-dropdown li");
    const searchBtn = document.querySelector(".input-container button");
    const searchInput = document.querySelector(".input-container input");
    const filterTitle = document.querySelector(".filter-title");
    let selectedRegion = "all";
    let searchMode = false;

    const searchCountry = () => {
        searchMode = true;
        clearResults();
        showResult(0, noOfResults, searchMode);
    };

    const numberFormatter = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const clearResults = () => {
        document.querySelector(".main-content").innerHTML = "";
    };

    const showDetails = (name) => {
        window.location.href = `details.html?country=${name}`;
    };

    const showResult = (start, end, searchMode) => {
        let data = "";

        let suffix = "";
        if (searchMode) {
            if (searchInput.value === "") {
                suffix = "all";
            } else suffix = `name/${searchInput.value}`;
        } else {
            if (selectedRegion === "all") {
                suffix = "all";
            } else {
                suffix = `region/${selectedRegion}`;
                console.log(suffix);
            }
        }

        console.log(suffix);

        axios
            .get(`https://restcountries.com/v3.1/${suffix}`)
            .then((result) => {
                loadMoreBtn.classList.remove("d-none");
                data = result.data;
                end = Math.min(end, data.length);
                console.log(data);
                data.slice(start, end).forEach((country) => {
                    const card = document.createElement("div");
                    const flag_container = document.createElement("div");
                    const flag = document.createElement("img");
                    const caption = document.createElement("div");
                    const country_name = document.createElement("h5");
                    const population = document.createElement("p");
                    const region = document.createElement("p");
                    const capital = document.createElement("p");

                    card.classList.add("card");
                    flag_container.classList.add("card-flag-container");
                    caption.classList.add("caption");
                    country_name.classList.add("country-name");
                    population.classList.add("population");
                    region.classList.add("region");
                    capital.classList.add("capital");

                    document.querySelector(".main-content").appendChild(card);
                    card.appendChild(flag_container);
                    card.appendChild(caption);
                    flag_container.appendChild(flag);
                    caption.appendChild(country_name);
                    caption.appendChild(population);
                    caption.appendChild(region);
                    caption.appendChild(capital);

                    flag.src = country.flags.png;
                    country_name.innerHTML = country.name.common;
                    population.innerHTML = `Population: <span>${numberFormatter(
                        country.population
                    )}</span>`;
                    region.innerHTML = `Region: <span>${country.region}</span>`;
                    if (
                        country.capital &&
                        Array.isArray(country.capital) &&
                        country.capital.length > 0
                    ) {
                        capital.innerHTML = `Capital: <span>${country.capital}</span>`;
                    } else {
                        capital.innerHTML = "N/A";
                    }

                    card.addEventListener("click", () => {
                        showDetails(country.name.common);
                    });
                });
                if (end < data.length) {
                    loadMoreBtn.classList.remove("d-none");
                } else {
                    loadMoreBtn.classList.add("d-none");
                }
            })
            .catch((e) => {
                loadMoreBtn.style.display = "none";
                if (e.response.status === 404) {
                    const message = document.createElement("h3");
                    message.classList.add("message");
                    message.textContent = `No results found for ${searchInput.value}`;
                    document
                        .querySelector(".main-content")
                        .appendChild(message);
                }
                console.log(
                    "There was error while retrieving data. Please try again later",
                    e
                );
            });
    };


    // Event listeners

    loadMoreBtn.addEventListener("click", () => {
        const startIndex = document.querySelectorAll(".card").length;
        const endIndex = startIndex + noOfResults;
        showResult(startIndex, endIndex, searchMode);
    });

    searchBtn.addEventListener("click", searchCountry);
    searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            searchCountry();
        }
    });

    filter.forEach((item) => {
        item.addEventListener("click", () => {
            selectedRegion = item.dataset.filter;
            clearResults();
            searchMode = false;
            showResult(0, noOfResults, searchMode);
            if (selectedRegion === "all") {
                filterTitle.classList.add("d-none");
            } else {
                filterTitle.classList.remove("d-none");
                document.querySelector(".filter-title p").textContent =
                    selectedRegion;
            }
        });
    });

    filterTitle.addEventListener("click", () => {
        filterTitle.classList.add("d-none");
        selectedRegion = "all";
        clearResults();
        searchMode = false;
        showResult(0, noOfResults, searchMode);
    });

    filterContainer.addEventListener("click", () => {
        filterDropdown.classList.toggle("d-none");
    });

    showResult(0, noOfResults, searchMode);
});
