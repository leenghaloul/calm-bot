document.addEventListener("DOMContentLoaded", function () {
    // Quote Logic (always runs)
    const quoteTextElement = document.getElementById("quote-text");

    if (quoteTextElement) {
        const quotes = [
            "Believe in yourself!",
            "You are stronger than you think.",
            "Every day is a new opportunity.",
            "You got this!",
            "Don't stop until you're proud.",
            "Your mental health is just as important as your physical health.",
            "It's okay not to be okay",
            "You are not your mental illness.",
            "Your struggles do not define you.",
            "Taking care of your mental health is an act of self-love.",
            "Mental health is not a destination, but a process."
        ];

        function showRandomQuote() {
            const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
            quoteTextElement.textContent = randomQuote;
        }

        showRandomQuote();
        setInterval(showRandomQuote, 8000);
    } else {
        console.log("quote-text element not found!");
    }

    // =============================
    // Journal Logic (runs only on journal.html)
    // =============================
     const saveButton = document.querySelector(".button2");
    const journalEntry = document.getElementById("journalEntry");
    const journalHistory = document.getElementById("journalHistory");

    if (journalEntry && journalHistory) {
        function saveJournalEntry() {
            const journalText = journalEntry.value.trim();

            if (journalText === "") {
                alert("Please write something in the journal before saving.");
                return;
            }

            const currentDate = new Date().toLocaleString();
            const newEntry = { date: currentDate, text: journalText };

            const entries = JSON.parse(localStorage.getItem("journalEntries") || "[]");
            entries.push(newEntry);
            localStorage.setItem("journalEntries", JSON.stringify(entries));

            journalEntry.value = "";
            displayJournalEntries();
        }

        function deleteEntry(index) {
            const entries = JSON.parse(localStorage.getItem("journalEntries") || "[]");
            entries.splice(index, 1); // Remove the entry at the specified index
            localStorage.setItem("journalEntries", JSON.stringify(entries));
            displayJournalEntries(); // Refresh the table
        }

        function displayJournalEntries() {
            const entries = JSON.parse(localStorage.getItem("journalEntries") || "[]");
            const tableBody = journalHistory.querySelector("tbody");
            tableBody.innerHTML = "";

            entries.forEach((entry, index) => {
                const newRow = tableBody.insertRow();
                const dateCell = newRow.insertCell(0);
                const entryCell = newRow.insertCell(1);
                const deleteCell = newRow.insertCell(2); // New cell for delete button

                dateCell.textContent = entry.date;
                entryCell.textContent = entry.text;

                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "Delete";
                deleteBtn.style.backgroundColor = "#d9534f";
                deleteBtn.style.color = "white";
                deleteBtn.style.border = "none";
                deleteBtn.style.padding = "6px 12px";
                deleteBtn.style.borderRadius = "5px";
                deleteBtn.style.cursor = "pointer";

                deleteBtn.addEventListener("click", () => deleteEntry(index));
                deleteCell.appendChild(deleteBtn);
            });
        }

        if (saveButton) {
            saveButton.addEventListener("click", saveJournalEntry);
        }

        displayJournalEntries();
    }
   
});
