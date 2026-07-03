// =========================================
// Marilia & Lucian Wedding Seating
// Version 2.0
// =========================================

let guests = [];

// Load guest list
fetch("guests.json")
.then(response => response.json())
.then(data => {

    guests = data;

})
.catch(error => console.error(error));



// --------------------------------------
// Remove accents
// --------------------------------------

function normalize(text){

    return text

        .normalize("NFD")

        .replace(/[\u0300-\u036f]/g,"")

        .toLowerCase()

        .trim();

}



// --------------------------------------
// Search button
// --------------------------------------

document
.getElementById("searchButton")
.addEventListener("click",searchGuest);



document
.getElementById("guestName")
.addEventListener("keypress",function(e){

    if(e.key==="Enter"){

        searchGuest();

    }

});



// --------------------------------------
// Main Search
// --------------------------------------

function searchGuest(){

    const search = normalize(

        document.getElementById("guestName").value

    );

    const result = document.getElementById("result");


    if(search===""){

        result.innerHTML=

        `
        <div class="result-card">

            <p class="not-found">

                Please enter your name.

            </p>

        </div>
        `;

        return;

    }



    const matches=guests.filter(g=>{

        const first=normalize(g.firstName);

        const last=normalize(g.lastName);

        const full=normalize(g.firstName+" "+g.lastName);



        return(

            first.includes(search)

            ||

            last.includes(search)

            ||

            full.includes(search)

        );



    });




    // One match

    if(matches.length===1){

        const guest=matches[0];

        result.innerHTML=

        `
        <div class="result-card">

            <h2>

                Welcome,
                ${guest.firstName}!

            </h2>

            <p>

                You are seated at

            </p>

            <div class="table-number">

                Table ${guest.table}

            </div>

        </div>
        `;

        return;

    }



    // Multiple matches

    if(matches.length>1){

        result.innerHTML=

        `
        <div class="result-card">

            <p class="not-found">

                We found several guests matching

                "<strong>${search}</strong>"

                <br><br>

                Please type your complete first and last name.

            </p>

        </div>
        `;

        return;

    }



    // Nothing found

    result.innerHTML=

    `
    <div class="result-card">

        <p class="not-found">

            Sorry, we couldn't find that name.

            <br><br>

            Please check the spelling or ask a member of the wedding party.

        </p>

    </div>
    `;

}