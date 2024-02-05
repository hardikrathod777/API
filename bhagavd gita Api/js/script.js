document.addEventListener("DOMContentLoaded", function() {
    document.body.classList.add('loaded');
    getAllChap();
});

let chapters = [];

function getAllChap(){
    fetch('https://bhagavadgitaapi.in/chapters/')
    .then(response => response.json())
    .then(data => {
        chapters = data;
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

    document.querySelectorAll('.chap-box').forEach(chapBox => {
        chapBox.addEventListener('click', function() {
            const selectedChapter = this.getAttribute('data-chapter');
            const chapterDetails = chapters.find(chapter => chapter.chapter_number == selectedChapter);

            $('#chapterModal').modal('show');

            document.getElementById('chapterModalBody').innerHTML = `
                <p class="chap-m-p">Chapter ${chapterDetails.chapter_number}</p>
                <p class="chap-m-n">${chapterDetails.translation}</p>
                <p class="chap-m-t">${chapterDetails.summary.en}</p>
                <div class="br-verses">
                    <p class="chap-verses">${chapterDetails.verses_count} Verses</p>
                </div>
                <div id="verses-container"></div>`;

            getAllChapterVerses(selectedChapter, chapterDetails.verses_count);
        });
    });
}

async function getAllChapterVerses(chapID, slID) {
    let promises = [];

    for (let i = 1; i <= slID; i++) {
        let a =  await fetch(`https://bhagavadgitaapi.in/slok/${chapID}/${i}/`)
            .then(response => response.json()).then(data => data)
            promises.push(a);
    }

    displayAllVerses(promises);
    
}

function displayAllVerses(verses) {
    const versesContainer = document.getElementById('verses-container');

    verses.forEach(verse => {
        const verseHTML = `<p class="verses_s">${verse.siva.et}</p>`;
        versesContainer.innerHTML += verseHTML;
    });
}
document.querySelectorAll('.verses_s').forEach(verseElement => {
    verseElement.addEventListener('click', function() {
        const chapID = this.getAttribute('data-chapter-id');
        const verseId = this.getAttribute('data-verse-id');
        displayVerseDetails(chapID, verseId);
    });
});

function displayVerseDetails(chapID, verseId) {
    fetch(`https://bhagavadgitaapi.in/slok/${chapID}/${verseId}/`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.json();
        })
        .then(verseDetails => {
            const offcanvasElement = document.getElementById('verseOffcanvas');
            const offcanvas = new bootstrap.Offcanvas(offcanvasElement);
            offcanvas.show();
            document.getElementById('verseOffcanvasBody').innerHTML = `
                <p class="verse-details">${verseDetails.siva.et}</p>
                <p class="verse-details">${verseDetails.siva.hi}</p>
                <!-- Add more details as needed -->
            `;
        })
        .catch(error => {
            console.error(`Error fetching verse details: ${error.message}`);
        });
}
