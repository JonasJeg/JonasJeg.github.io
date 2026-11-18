const design = document.getElementById("design");
const designValue = document.getElementById("designValue");

const functionality = document.getElementById("functionality");
const functionalityValue = document.getElementById("functionalityValue");

const experience = document.getElementById("experience");
const experienceValue = document.getElementById("experienceValue");

design.addEventListener("input", () => {
    designValue.textContent = design.value;
});

functionality.addEventListener("input", () => {
    functionalityValue.textContent = functionality.value;
});

experience.addEventListener("input", () => {
    experienceValue.textContent = experience.value;
});



// Išvedimas į konsolę

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("contactForm");

    const submitBtn = document.getElementById("submitBtn");

    const nameField = document.querySelector('input[name="name"]');
    const surnameField = document.querySelector('input[name="surname"]');
    const emailField = document.querySelector('input[name="email"]');
    const addressField = document.querySelector('input[name="address"]');
    const phoneField = document.querySelector('input[name="phone"]');

    const designField = document.getElementById("design");
    const functionalityField = document.getElementById("functionality");
    const experienceField = document.getElementById("experience");

    const clearBtn = document.getElementById("clearBtn");

    function validateForm() {

            let isValid = true;

            // Vardas
            if (!/^[A-Za-zĄČĘĖĮŠŲŪŽąčęėįšųūž]+$/.test(nameField.value.trim())) {

                document.getElementById("nameError").textContent =
                    "Vardą gali sudaryti tik raidės";

                nameField.classList.add("error");
                isValid = false;

            } else {

                document.getElementById("nameError").textContent = "";

                nameField.classList.remove("error");
                nameField.classList.add("valid");
            }

            // Pavardė
            if (!/^[A-Za-zĄČĘĖĮŠŲŪŽąčęėįšųūž]+$/.test(surnameField.value.trim())) {

                document.getElementById("surnameError").textContent =
                    "Pavardę gali sudaryti tik raidės";

                surnameField.classList.add("error");
                isValid = false;

            } else {

                document.getElementById("surnameError").textContent = "";

                surnameField.classList.remove("error");
                surnameField.classList.add("valid");
            }

            // El. paštas
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(emailField.value.trim())) {

                document.getElementById("emailError").textContent =
                    "Neteisingas el. pašto formatas";

                emailField.classList.add("error");
                isValid = false;

            } else {

                document.getElementById("emailError").textContent = "";

                emailField.classList.remove("error");
                emailField.classList.add("valid");
            }

            // Adresas
            if (addressField.value.trim() === "") {

                document.getElementById("addressError").textContent =
                    "Adresas yra privalomas";

                addressField.classList.add("error");
                isValid = false;

            } else {

                document.getElementById("addressError").textContent = "";

                addressField.classList.remove("error");
                addressField.classList.add("valid");
            }

            // Slideriai 1-10
            const values = [
                Number(designField.value),
                Number(functionalityField.value),
                Number(experienceField.value)
            ];

            values.forEach(value => {
                if (value < 1 || value > 10) {
                    isValid = false;
                }
            });

            submitBtn.disabled = !isValid;
    }

    nameField.addEventListener("input", validateForm);
    surnameField.addEventListener("input", validateForm);
    emailField.addEventListener("input", validateForm);
    addressField.addEventListener("input", validateForm);

    designField.addEventListener("input", validateForm);
    functionalityField.addEventListener("input", validateForm);
    experienceField.addEventListener("input", validateForm);

    phoneField.addEventListener("input", function () {

        let digits = this.value.replace(/\D/g, "");

        if (digits.startsWith("370")) {
            digits = digits.substring(3);
        }

        digits = digits.substring(0, 8);

        let formatted = "+370";

        if (digits.length > 0) {
            formatted += " " + digits.substring(0, 3);
        }

        if (digits.length > 3) {
            formatted += " " + digits.substring(3);
        }

        this.value = formatted;

        validateForm();
    });

    clearBtn.addEventListener("click", () => {

        form.reset();

        document.getElementById("design").value = 5;
        document.getElementById("functionality").value = 5;
        document.getElementById("experience").value = 5;

        document.getElementById("designValue").textContent = 5;
        document.getElementById("functionalityValue").textContent = 5;
        document.getElementById("experienceValue").textContent = 5;

        document.getElementById("result").innerHTML = "";

        document.querySelectorAll(".error-text").forEach(error => {
            error.textContent = "";
        });

        document.querySelectorAll(".form-control").forEach(field => {
            field.classList.remove("error");
            field.classList.remove("valid");
        });

        submitBtn.disabled = true;
    });

    validateForm();

    console.log(form);

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const data = {
            vardas: document.querySelector('input[name="name"]').value,
            pavarde: document.querySelector('input[name="surname"]').value,
            elPastas: document.querySelector('input[name="email"]').value,
            telefonas: document.querySelector('input[name="phone"]').value,
            adresas: document.querySelector('input[name="address"]').value,
            dizainas: document.getElementById("design").value,
            funkcionalumas: document.getElementById("functionality").value,
            patirtis: document.getElementById("experience").value
        };

        const vidurkis =
        (
            Number(data.dizainas) +
            Number(data.funkcionalumas) +
            Number(data.patirtis)
        ) / 3;

        console.log(data);

        document.getElementById("result").innerHTML = `
            <div class="result-box">
                <p><strong>Vardas:</strong> ${data.vardas}</p>
                <p><strong>Pavardė:</strong> ${data.pavarde}</p>
                <p><strong>El. paštas:</strong> ${data.elPastas}</p>
                <p><strong>Tel. numeris:</strong> ${data.telefonas}</p>
                <p><strong>Adresas:</strong> ${data.adresas}</p>
                <p><strong>Dizaino įvertinimas:</strong> ${data.dizainas}/10</p>
                <p><strong>Funkcionalumo įvertinimas:</strong> ${data.funkcionalumas}/10</p>
                <p><strong>Naudotojo patirties įvertinimas:</strong> ${data.patirtis}/10</p>
                <p>
                    <strong>
                        ${data.vardas} ${data.pavarde}: ${vidurkis.toFixed(2)}
                    </strong>
                </p>
            </div>
        `;
    });
});

