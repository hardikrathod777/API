document.addEventListener("DOMContentLoaded", function() {
    document.body.classList.add('loaded');
    getAllChap();
});

let chapters = [];  // Define chapters in a scope accessible to both functions

function getAllChap(){
    fetch('https://bhagavadgitaapi.in/chapters/')
    .then(response => response.json())
    .then(data => {
        chapters = data;  // Assign data to the global chapters variable
        displayChap();
    })
    .catch(error => {
        console.error('error:', error);
    });
}

function displayChap() {
    const chaptersContainer = document.getElementById('chapters-container');

    chapters.forEach(chapter => {
        const chapterHTML = `
            <div class="col-xxl-5 chap-box" data-chapter="${chapter.chapter_number}">
                <p class="chap-p">Chapter ${chapter.chapter_number}</p>
                <p class="chap-n">${chapter.translation}</p>
                <p class="chap-t">${chapter.summary.en}</p>
            </div>
        `;
        chaptersContainer.innerHTML += chapterHTML;
    });

    // Add click event to dynamically created chap-box elements
    document.querySelectorAll('.chap-box').forEach(chapBox => {
        chapBox.addEventListener('click', function() {
            const selectedChapter = this.getAttribute('data-chapter');
            const chapterDetails = chapters.find(chapter => chapter.chapter_number == selectedChapter);

            // Manually trigger the modal
            $('#chapterModal').modal('show');

            // Update modal body content
            document.getElementById('chapterModalBody').innerHTML = `
                <p class="chap-m-p">Chapter ${chapterDetails.chapter_number}</p>
                <p class="chap-m-n">${chapterDetails.translation}</p>
                <p class="chap-m-t">${chapterDetails.summary.en}</p>
                <div class="br-verses">
                    <p class="chap-verses">${chapterDetails.verses_count} Verses</p>
                </div>
                <div id="verses-container"></div>
            `;

            // Fetch and display all verses
            getAllChapterVerses(selectedChapter);
        });
    });
}

function getAllChapterVerses() {
    fetch(`https://bhagavadgitaapi.in/slok/1/1/`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayAllVerses(data.verses);
        })
        .catch(error => {
            console.error('error:', error);
        });
}

function displayAllVerses(verses) {
    const versesContainer = document.getElementById('verses-container');

    verses.forEach(verse => {
        const verseHTML = `
    <p>${verse}: ${verse.id}</p>
`;
        versesContainer.innerHTML += verseHTML;
    });
}
