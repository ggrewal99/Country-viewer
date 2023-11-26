document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const countryName = urlParams.get('country');
    const backBtn = document.querySelector('.back-btn');

    document.title = `${countryName} - Details`;

    const dataArrayFormatter = (array) => {
        return array.join(', ');
    };

    const numberFormatter = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    axios.get(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
        .then((result) => {
            document.querySelector(".spinner-container").style.display = "none";
            document.querySelector(".detail-main-content").style.display = "flex";
            const data = result.data;
            const name = document.querySelector(".d_country-name");
            const nativeName = document.querySelector(".native-name");
            const population = document.querySelector(".population");
            const region = document.querySelector(".region");
            const subRegion = document.querySelector(".sub-region");
            const capital = document.querySelector(".capital");
            const domain = document.querySelector(".domain");
            const currency = document.querySelector(".currency");
            const language = document.querySelector(".language");
            const borderCountries = document.querySelector(".border-countries .btn-group");
            console.log(data);

            const currencyData = Object.values(data[0].currencies).map(currency => currency.name);
            const languageData = Object.values(data[0].languages);
            const nativeNameData = Object.values(data[0].name.nativeName).map(nativeName => nativeName.common);

            name.textContent = data[0].name.common;
            nativeName.textContent = dataArrayFormatter(nativeNameData);
            population.textContent = numberFormatter(data[0].population);
            region.textContent = data[0].region;
            subRegion.textContent = data[0].subregion;
            capital.textContent = data[0].capital;
            domain.textContent = data[0].tld;
            currency.textContent = dataArrayFormatter(currencyData);
            language.textContent = dataArrayFormatter(languageData);
            document.querySelector(".img-container img").src = data[0].flags.svg;

            if (data[0].borders) {
                data[0].borders.forEach(border => {
                    axios.get(`https://restcountries.com/v3.1/alpha/${border}`)
                        .then((result) => {
                            const borderCountry = result.data[0];
                            const button = document.createElement("button");
                            button.className = "btn b-radius-7";
                            button.textContent = borderCountry.name.common;
                            borderCountries.appendChild(button);

                            button.addEventListener("click", () => {
                                window.location.href = `details.html?country=${borderCountry.name.common}`;
                            });
                        })
                        .catch((e) => {
                            console.log(e);
                        });
                });
            } else {
                const noBorderMsg = document.createElement("p");
                noBorderMsg.innerHTML = "N/A";
                borderCountries.appendChild(noBorderMsg);
            }

        });


    backBtn.addEventListener("click", () => {
        history.back();
    });
});