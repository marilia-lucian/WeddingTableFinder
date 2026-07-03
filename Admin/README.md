# WeddingTableFinder

## Purpose
This website allows wedding guests to scan a QR code, enter their name, and instantly see their assigned table.

Project:
Marilia & Lucian
Wedding Date: October 10, 2026

## Project Files

WeddingTableFinder/
- index.html
- style.css
- script.js
- guests.json
- README.md
- assets/

## Edit the Guest List

Open guests.json.

Each guest looks like:

{
  "firstName": "Jane",
  "lastName": "Smith",
  "table": 5
}

To move someone, change only the table number.

## Add a Guest

Copy an existing guest entry, paste it before the closing ], edit the name and table, and remember that every entry except the last ends with a comma.

## Remove a Guest

Delete the entire guest entry.

## Test

1. Save guests.json.
2. Refresh the website.
3. Search for the guest.
4. Verify the correct table appears.

## Publish an Update (GitHub Pages)

1. Open your GitHub repository.
2. Upload the updated guests.json.
3. Commit the change.
4. Wait about one minute.
5. Refresh the website.

## Backup

Keep:
- Your project folder.
- Your GitHub repository.
- Your master guest spreadsheet.

Created for Marilia & Lucian.
