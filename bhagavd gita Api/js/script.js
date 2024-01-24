document.addEventListener("DOMContentLoaded", function() {
    document.body.classList.add('loaded');
    getAllChap();
});

function getAllChap(){
    fetch('https://bhagavadgitaapi.in/chapters/')
    .then(response => response.json())
    .then(data => {
        displayChap(data);
    })
    .catch(error => {
        console.error('error : ',error)
    });
}
function displayChap(chapters) {
    const chaptersContainer = document.getElementById('chapters-container');

    chapters.forEach(chapter => {
        const chapterHTML = `
            <div class="col-xxl-5 chap-box">
                <p class="chap-p">Chapter ${chapter.chapter_number}</p>
                <p class="chap-n">${chapter.translation}</p>
                <p class="chap-t">${chapter.summary.en}</p>
            </div>
        `;
        chaptersContainer.innerHTML += chapterHTML;
    });
}