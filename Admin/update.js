// =====================================================
// Wedding Seating Chart Updater
// Marilia & Lucian
// =====================================================

let generatedGuests = [];

const textarea = document.getElementById("spreadsheetData");
const generateButton = document.getElementById("generateButton");
const downloadButton = document.getElementById("downloadButton");
const summary = document.getElementById("summary");

generateButton.addEventListener("click", generateJSON);

downloadButton.addEventListener("click", downloadJSON);

function generateJSON() {

    generatedGuests = [];

    summary.style.display = "block";

    downloadButton.style.display = "none";

    const text = textarea.value.trim();

    if (text === "") {

        summary.innerHTML = "Please paste your spreadsheet first.";

        return;

    }

    const rows = text.split(/\r?\n/);

    let duplicates = [];
    let warnings = [];
    let namesSeen = new Set();

    rows.forEach((row, index) => {

        const columns = row.split("\t");

// Ignore completely empty rows

if (columns.every(col => col.trim() === "")) return;

// Always create three fields, even if they're missing

let firstName = (columns[0] || "").trim();
let lastName  = (columns[1] || "").trim();
let table     = (columns[2] || "").trim();

        // Ignore header row

        if (
            firstName.toLowerCase() === "first name" ||
            firstName.toLowerCase() === "firstname"
        ) {
            return;
        }

        if (firstName === "")
            warnings.push(`Row ${index + 1}: Missing first name.`);

        if (lastName === "")
            warnings.push(`Row ${index + 1}: Missing last name.`);

        if (table === "") {

    warnings.push(
        `Row ${index + 1}: Missing table number.`
    );

} else if (!Number.isInteger(Number(table))) {

    warnings.push(
        `Row ${index + 1}: "${table}" is not a valid table number.`
    );

}

        const key =
            `${firstName.toLowerCase()}|${lastName.toLowerCase()}`;

        if (namesSeen.has(key)) {

            duplicates.push(
                `${firstName} ${lastName}`
            );

        } else {

            namesSeen.add(key);

        }

        if (

    firstName !== "" &&
    lastName !== "" &&
    Number.isInteger(Number(table))

){

    generatedGuests.push({

        firstName,

        lastName,

        table:Number(table)

    });

}

    });

    let report = "";

    report += `Valid guests: ${generatedGuests.length}\n`;

report += `Rows processed: ${rows.length - 1}\n\n`;

    if (duplicates.length > 0) {

        report += "Duplicate names:\n";

        duplicates.forEach(name => {

            report += `• ${name}\n`;

        });

        report += "\n";

    }

    if (warnings.length > 0) {

        report += "Warnings:\n";

        warnings.forEach(w => {

            report += `• ${w}\n`;

        });

    }

    if (
        duplicates.length === 0 &&
        warnings.length === 0
    ) {

        report += "✓ No problems found.";

    }

    summary.textContent = report;

    downloadButton.style.display = "block";

}

function downloadJSON() {

    const json = JSON.stringify(

        generatedGuests,

        null,

        2

    );

    const blob = new Blob(

        [json],

        {

            type: "application/json"

        }

    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "guests.json";

    a.click();

    URL.revokeObjectURL(url);

}