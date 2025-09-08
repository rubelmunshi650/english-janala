const loadLesson = () => {
    const allLevelUrl = 'https://openapi.programming-hero.com/api/levels/all';
    fetch(allLevelUrl)
        .then((res) => res.json())
        .then((json) => displayLessons(json.data))

}
const removeActive = () => {
    const lessonBtns = document.querySelectorAll('.lesson-btn');
    lessonBtns.forEach((btn) => btn.classList.remove('active'))
    // console.log(lessonBtns);
    
}
const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            removeActive();
            const clickBtn = document.getElementById(`lesson-btn-${id}`);
            clickBtn.classList.add('active');
            console.log(clickBtn);
            
            displayLevelWords(data.data)
        });

}
const createElements = (arr) => {
    const htmlElements =arr.map((el) => `<span class="btn btn-sm bg-[#1A91FF1A]">${el}</span>`);
    return htmlElements.join(' ');
}
    const loadWordDetails = (id) =>{
        const url = `https://openapi.programming-hero.com/api/word/${id}`;
        fetch(url)
        .then((res) => res.json())
        .then((details) => displayWordDetails(details.data))
    }
    const displayWordDetails = (details) => {
        const wordDetailsContainer = document.getElementById('word-details-container');
        wordDetailsContainer.innerHTML =`
            <h3 class="text-3xl font-bold mb-5">${details.word?details.word:'কোন শব্দ পাওয়া যায়নি'} (<i class="fa-solid fa-microphone-lines"></i>:${details.pronunciation?details.pronunciation:'কোন শব্দ উচ্চারণ পাওয়া যায়নি'})</h3>
            <h4 class="text-xl font-semibold">Meaning</h4>
            <h4 class="text-xl font-medium mb-4">${details.meaning?details.meaning:'শব্দের অর্থ পাওয়া যায়নি '}</h4>
            <h4 class="text-xl font-semibold">Example</h4>
            <p class="text-lg mb-4">${details.sentence?details.sentence:'কোন বাক্য পাওয়া যায়নি'}</p>
            <h4 class="text-xl font-medium mb-2">সমার্থক শব্দ গুলো</h4>
            ${createElements(details.synonyms)?createElements(details.synonyms):'কোন সমার্থক শব্দ পাওয়া যায়নি'}
           
        `;
        document.getElementById('my_modal_5').showModal();
        
    }
const displayLevelWords = (words) => {
    const levelWordsContainer = document.getElementById('level-words-container');
    levelWordsContainer.innerHTML = '';
    if(words.length === 0){
        levelWordsContainer.innerHTML =`
                <div id="no-select-lesson" class=" hind-siliguri text-center col-span-3">
                    <img src="./assets/alert-error.png" alt="image" class="mx-auto">
                    <small>এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</small>
                    <h3 class="text-3xl font-semibold mt-4">নেক্সট Lesson এ যান</h3>
                </div>
        `;
    }

    words.forEach(word => {
        const card = document.createElement('div');
        card.innerHTML = `
        <div class="bg-white px-5 py-9 text-center rounded-lg h-full flex flex-col justify-between">
            <div class=" text-center">
                <h3 class="text-2xl font-semibold">${word.word?word.word:'শব্দ পাওয়া যায়নি'}</h3>
                <p class="my-5">Meaning /Pronounciation</p>
                <h3 class="hind-siliguri text-2xl font-semibold">"${word.meaning?word.meaning:'শব্দের অর্থ পাওয়া যায়নি'} / ${word.pronunciation?word.pronunciation:'শব্দের উচ্চারণ পাওয়া যায় নি'}"</h3>
            </div>
            <div class="flex justify-between items-center mt-10 ">
                <button type="button" onclick="loadWordDetails(${word.id})" class="btn bg-[#1A91FF1A] text-2xl p-2.5 hover:bg-[#1A91FF88]"><i class="fa-solid fa-circle-info"></i></button>
                <button type="button" class="btn bg-[#1A91FF1A] text-2xl p-2.5 hover:bg-[#1A91FF88]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `;
        levelWordsContainer.append(card)

    });

}
const displayLessons = (lessons) => {
    const levelsContainer = document.getElementById('levels-container');
    levelsContainer.innerHTML = '';
    for (const lesson of lessons) {
        const lessonBtnDiv = document.createElement('div');
        lessonBtnDiv.innerHTML = `
        <button id="lesson-btn-${lesson.level_no}" onclick = "loadLevelWord(${lesson.level_no})" class="btn btn-sm lesson-btn bg-transparent text-[#422AD5] text-sm border border-[#422AD5]"><i class="fa-brands fa-readme"></i> <span class="">Lesson - ${lesson.level_no}</span></button>
        `;
        
        levelsContainer.appendChild(lessonBtnDiv);
    }

}
loadLesson();