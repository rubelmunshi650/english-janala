const loadLesson = () => {
    const allLevelUrl = 'https://openapi.programming-hero.com/api/levels/all';
    fetch(allLevelUrl)
        .then((res) => res.json())
        .then((json) => displayLessons(json.data))

}
const displayLessons = (lessons) => {
    const levelsContainer = document.getElementById('levels-container');
    levelsContainer.innerHTML = '';
    for (const lesson of lessons) {
        const lessonBtnDiv = document.createElement('div');
        // lessonBtnDiv.classList.add('flex');
        lessonBtnDiv.innerHTML = `
        <button class="btn btn-sm bg-transparent text-[#422AD5] text-sm border border-[#422AD5]"><i class="fa-brands fa-readme"></i> <span class="">Lesson - ${lesson.level_no}</span></button>
        `;
        levelsContainer.appendChild(lessonBtnDiv);
    }

}
loadLesson();