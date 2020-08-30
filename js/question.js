//Elements
const question = document.getElementById('question');
const questionBangla = document.getElementById('questionBangla')
const answer = Array.from(document.getElementsByClassName('answer'));
const nextButton = document.getElementById('btn__next');
const priviousButton = document.getElementById('btn__previous');
const ans = Array.from(document.getElementsByClassName('ans'));
const progress = document.getElementById('progress');
const progressText = document.getElementById('progressText');

//Global variables
let totalAnsweredQuestion = 0;
let start = 0; //for percentage loading
let end = 0; //for percentage loading
let questionCounter = -1;
let ANSWERS = [0, 0, 0, 0, 0];
let QUESTIONS = [
    {
        question: 'Over the last two weeks, I have felt cheerful and in good spirits?',
        questionBangla: 'বিগত ২ সপ্তাহে আমি উৎফুল্ল ও পজিটিভ মানসিকতা অনুভব করেছি?',
        option1: {op: 'All of the time ', opb: 'সব সময়', value: 10},
        option2: {op: 'Most of the time ', opb: 'অধিকাংশ সময়', value: 20},
        option3: {op: 'More than half of the time ', opb: 'অধিকাংশ সময়', value: 30},
        option4: {op: 'Less than half of the time ', opb: 'অর্ধেকেরও কম সময়', value: 40},
        option5: {op: 'Some of the time ', opb: 'কিছু সময়', value: 50},
        option6: {op: 'At no time ', opb: 'কোন সময়ই না', value: 60}
    },
    {
        question: 'Over the last two weeks, I have felt calm and relaxed?',
        questionBangla: 'বিগত ২ সপ্তাহে আমি ধিরস্থির ও রিলাক্সড অনুভব করেছি? ',
        option1: {op: 'All of the time ', opb: 'সব সময়', value: 10},
        option2: {op: 'Most of the time ', opb: 'অধিকাংশ সময়', value: 20},
        option3: {op: 'More than half of the time ', opb: 'অধিকাংশ সময়', value: 30},
        option4: {op: 'Less than half of the time ', opb: 'অর্ধেকেরও কম সময়', value: 40},
        option5: {op: 'Some of the time ', opb: 'কিছু সময়', value: 50},
        option6: {op: 'At no time ', opb: 'কোন সময়ই না', value: 60}
    },
    {
        question: 'Over the last two weeks, I have felt active and vigorous?',
        questionBangla: 'বিগত ২ সপ্তাহে আমি উৎসাহী ও সচল বোধ করেছি?',
        option1: {op: 'All of the time ', opb: 'সব সময়', value: 10},
        option2: {op: 'Most of the time ', opb: 'অধিকাংশ সময়', value: 20},
        option3: {op: 'More than half of the time ', opb: 'অধিকাংশ সময়', value: 30},
        option4: {op: 'Less than half of the time ', opb: 'অর্ধেকেরও কম সময়', value: 40},
        option5: {op: 'Some of the time ', opb: 'কিছু সময়', value: 50},
        option6: {op: 'At no time ', opb: 'কোন সময়ই না', value: 60}
    },
    {
        question: 'Over the last two weeks, I woke up feeling fresh and rested?',
        questionBangla: 'বিগত ২ সপ্তাহে আমি সতেজ ও প্রফুল্ল অনুভব করেছি?',
        option1: {op: 'All of the time ', opb: 'সব সময়', value: 10},
        option2: {op: 'Most of the time ', opb: 'অধিকাংশ সময়', value: 20},
        option3: {op: 'More than half of the time ', opb: 'অধিকাংশ সময়', value: 30},
        option4: {op: 'Less than half of the time ', opb: 'অর্ধেকেরও কম সময়', value: 40},
        option5: {op: 'Some of the time ', opb: 'কিছু সময়', value: 50},
        option6: {op: 'At no time ', opb: 'কোন সময়ই না', value: 60}
    },
    {
        question: 'Over the last two weeks, My daily life has been filled with things that interest me?',
        questionBangla: 'বিগত ২ সপ্তাহে আমার দৈনন্দিন জীবন আমার পছন্দের  ঘটনায় পরিপূর্ণ ছিল?',
        option1: {op: 'All of the time ', opb: 'সব সময়', value: 10},
        option2: {op: 'Most of the time ', opb: 'অধিকাংশ সময়', value: 20},
        option3: {op: 'More than half of the time ', opb: 'অধিকাংশ সময়', value: 30},
        option4: {op: 'Less than half of the time ', opb: 'অর্ধেকেরও কম সময়', value: 40},
        option5: {op: 'Some of the time ', opb: 'কিছু সময়', value: 50},
        option6: {op: 'At no time ', opb: 'কোন সময়ই না', value: 60}
    }
]


//add listener to all options and get the answer also store it to the answers array
ans.forEach(a => {
    a.addEventListener('click', event => {
        //remove abackground from others
        clearBackgroundColor();
        
        //selected option
        const selectedOption = event.target;
        
        //add style
        selectedOption.parentNode.classList.add('anserSelected');

        //identify the dataset number
        const selectedAnswer = selectedOption.dataset['number'];
        
        //set answer
        ANSWERS[questionCounter] = selectedAnswer;

        //load progress
        loadProgress();
    })
})


getNextQuestion = () => {
    if(questionCounter < QUESTIONS.length-1){
        //increase counter
        questionCounter++;

        //get background style if it has any
        clearBackgroundColor();   
        if (ANSWERS[questionCounter] != 0){
            getBackgroundStyle(ANSWERS[questionCounter] - 1)
        }

         //get question from data base    
        current_question = QUESTIONS[questionCounter]

        //set question to html
        question.innerHTML = current_question.question;
        questionBangla.innerHTML = current_question.questionBangla;

        //load all options to the html
        ans.forEach(a => {
            let ansNumber = a.dataset['number']
            a.innerHTML = current_question['option' + ansNumber].op + '[ ' +current_question['option' + ansNumber].opb + ' ]';
        })
    }
}

getPreviousQuestion = () => {
    if(questionCounter >= 1){
        //decrease counter
        questionCounter--;

        //get background style if it has any
        clearBackgroundColor();
        if (ANSWERS[questionCounter] !=0)
            getBackgroundStyle(ANSWERS[questionCounter] - 1)

         //get question from data base    
        current_question = QUESTIONS[questionCounter]

        //set question to html
        question.innerHTML = current_question.question;

        //load all options to the html
        ans.forEach(a => {
            let ansNumber = a.dataset['number']
            a.innerHTML = current_question['option' + ansNumber].op;
        })
    }
}

//clearing green background
clearBackgroundColor = () => {
    answer.forEach(a => {
        a.classList.remove('anserSelected')
    })
}

//Get green background if a questin answered
getBackgroundStyle = (id) => {
    ans[id].parentNode.classList.add('anserSelected');
}


//Load progress function
loadProgress = () => {
    //calculate total answered question
    let totalAnsweredQuestion = 0;
    ANSWERS.forEach(el => {
        if(el != 0) totalAnsweredQuestion++;
    })

    //calculate progress
    calculateProgress = () => {
        if(start == totalAnsweredQuestion * 20){
            clearInterval(load);
        } else{
            start++;
            progress.style.width = start + "%";
            progressText.innerHTML = start + "%";
        }
    }
    let load = setInterval(calculateProgress, 10);
}

//Initialization
getNextQuestion(-1);
loadProgress();

nextButton.addEventListener('click', getNextQuestion)
priviousButton.addEventListener('click', getPreviousQuestion);