// =========================================
// Marilia & Lucian Wedding Seating
// Version 3.0 - Bilingual
// =========================================

let guests = [];

// =========================================
// Language Detection
// =========================================

const isPortuguese =
    window.location.pathname
    .toLowerCase()
    .includes("index-pt");

// =========================================
// Load Guest List
// =========================================

fetch("guests.json")
.then(response => response.json())
.then(data => {

    guests = data;

})
.catch(error => console.error(error));


// =========================================
// Remove Accents
// =========================================

function normalize(text){

    return text

        .normalize("NFD")

        .replace(/[\u0300-\u036f]/g,"")

        .toLowerCase()

        .trim();

}


// =========================================
// Search Button
// =========================================

document
.getElementById("searchButton")
.addEventListener("click", searchGuest);

document
.getElementById("guestName")
.addEventListener("keypress", function(e){

    if(e.key==="Enter"){

        searchGuest();

    }

});


// =========================================
// Main Search
// =========================================

function searchGuest(){

    const search = normalize(

        document.getElementById("guestName").value

    );

    const result = document.getElementById("result");



    // ------------------------------
    // Empty Search
    // ------------------------------

    if(search===""){

        result.innerHTML =

        `
        <div class="result-card">

            <p class="not-found">

                ${
                    isPortuguese
                    ? "Por favor, digite seu nome."
                    : "Please enter your name."
                }

            </p>

        </div>
        `;

        return;

    }



    // ------------------------------
    // Find Matches
    // ------------------------------

    const matches = guests.filter(g=>{

        const first = normalize(g.firstName);

        const last = normalize(g.lastName);

        const full = normalize(g.firstName+" "+g.lastName);

        return(

            first.includes(search)

            ||

            last.includes(search)

            ||

            full.includes(search)

        );

    });



    // ------------------------------
    // One Match
    // ------------------------------

    if(matches.length===1){

        const guest = matches[0];

        result.innerHTML =

        `
        <div class="result-card">

            <h2>

                ${
                    isPortuguese
                    ? `Olá, ${guest.firstName}!`
                    : `Welcome, ${guest.firstName}!`
                }

            </h2>

            <p>

                ${
                    isPortuguese
                    ? "Por favor, sente-se à"
                    : "You are seated at"
                }

            </p>

            <div class="table-number">

                ${
                    isPortuguese
                    ? `Mesa ${guest.table}`
                    : `Table ${guest.table}`
                }

            </div>

        </div>
        `;

        return;

    }



    // ------------------------------
    // Multiple Matches
    // ------------------------------

    if(matches.length>1){

        result.innerHTML =

        `
        <div class="result-card">

            <p class="not-found">

                ${
                    isPortuguese

                    ? `Encontramos vários convidados com "<strong>${search}</strong>".<br><br>Digite seu nome completo por gentileza.`

                    : `We found several guests matching "<strong>${search}</strong>".<br><br>Please type your complete first and last name.`

                }

            </p>

        </div>
        `;

        return;

    }



    // ------------------------------
    // Guest Not Found
    // ------------------------------

    result.innerHTML =

    `
    <div class="result-card">

        <p class="not-found">

            ${
                isPortuguese

                ? `Não encontramos esse nome.<br><br>Verifique a grafia e tente novamente, ou solicite ajuda aos anfitriões.`

                : `Sorry, we couldn't find that name.<br><br>Please check the spelling or ask a member of the wedding party.`

            }

        </p>

    </div>
    `;

}
