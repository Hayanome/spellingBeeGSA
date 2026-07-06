document.addEventListener("DOMContentLoaded", function () {
    const wordDisplay = document.getElementById("wordDisplay");
    const randomizeButton = document.getElementById("randomizeButton");
    const playButton = document.getElementById("playButton");
    const gradeSelect = document.getElementById("gradeSelect");
    const typeSelect = document.getElementById("typeSelect");
    const imageContainer = document.getElementById("imageContainer");
    const feedback = document.getElementById("feedback");

     const words = {
        transition_first: {
            normal: [
                "eraser",
                "arms",
                "market",
                "shower",
                "sad",
                "fingers",
                "glue",
                "scissors",
                "grand-mom",
                "sister",
                "hands",
                "girl",
                "three",
                "purple",
                "two",
                "toes",
                "pink",
                "foot",
                "eight",
                "head",
            ],
            master: [
                "sharpener",
                "livingroom",
                "pencil case",
                "lunchbox",
                "kitchen",
                "eyes",
                "knee",
                "shoulder",
                "eight",
                "notebook",
            ],
        },
        second_third: {
            normal: [
                "elephant",
                "aquatic",
                "terrestrial",
                "sunny",
                "rainy",
                "bat",
                "monkey",
                "swimming",
                "basketball",
                "snowboarding",
                "eggplants",
                "pineapples",
                "homework",
                "sweep",
                "always",
                "whale",
                "bookstore",
                "hospital",
                "avocados",
                "theater",
            ],
            master: [
                "hummingbird",
                "macaw",
                "athletics",
                "curling",
                "windy",
                "shepherd",
                "starfish",
                "grocery store",
                "sweep",
                "straight",
            ],
        },
        fourth_fifth: {
            normal: [
                "treasure",
                "cheesecake",
                "pumpkin",
                "hummingbird",
                "cheetah",
                "responsible",
                "medium height",
                "straight",
                "sociable",
                "chubby",
                "english",
                "science",
                "bakery",
                "restaurant",
                "chicken",
                "cheese",
                "puppy",
                "hamster",
                "comedy",
            ],
            master: [
                "hummingbird",
                "cheetah",
                "insecure",
                "responsible",
                "medium height",
                "strawberry",
                "hardware store",
                "chocolate candy",
                "jigsaw puzzles",
                "clothing store",
            ],
        },
        sixth_seventh: {
            normal: [
                "acquiesce",
                "conscientious",
                "miscellaneous",
                "entrepreneur",
                "rhythmically",
                "bureaucracy",
                "supersede",
                "questionnaire",
                "pronunciation",
                "maintenance",
                "succesfully",
                "immigrants",
                "independence",
                "sensitivities",
                "software",
                "environmentalist",
                "currency",
                "plastic",
                "nature",
                "forest",
            ],
            master: [
                "accommodate",
                "environment",
                "embarrass",
                "definitely",
                "government",
                "photography",
                "outstanding",
                "sustainability",
                "baggage",
                "monument",
            ],
        },
        eighth_ninth: {
            normal: [
                "challange",
                "knowledge",
                "environment",
                "literature",
                "beautiful",
                "neccesary",
                "rhythm",
                "embarras",
                "conscience",
                "achievement",
                "civilization",
                "architecture",
                "fascinating",
                "competition",
                "experience",
                "environment",
                "sustainable",
                "symptom",
                "anxiety",
                "exhausted",
            ],
            master: [
                "ocassionally",
                "pronunciation",
                "neighbour",
                "through",
                "business",
                "strength",
                "foreign",
                "experience",
                "independent",
                "miscellaneous",
            ],
        },
        tenth_eleventh: {
            normal: [
                "disguise",
                "audience",
                "broadcast",
                "trademark",
                "friendship",
                "prohibition",
                "manipulative",
                "carefully",
                "research",
                "muscles",
                "resilience",
                "consistency",
                "infraestructure",
                "sustainability",
                "environment",
                "combustion",
                "cooperation",
                "deduction",
                "obsession",
                "mobility",
            ],
            master: [
                "advertisement",
                "acquaintance",
                "accurately",
                "copywriter",
                "waistline",
                "puctuality",
                "cohesion",
                "hypothetical",
                "bureaucracy",
                "phenomenom",
            ],
        },
    };

    let usedWords = [];
    let currentWord = "";

    function getRandomWord(grade, type) {
        const wordList = words[grade][type];
        let availableWords = wordList.filter((w) => !usedWords.includes(w));

        if (availableWords.length === 0) {
            usedWords = [];
            availableWords = wordList;
        }

        const randomIndex = Math.floor(Math.random() * availableWords.length);
        const selectedWord = availableWords[randomIndex];
        usedWords.push(selectedWord);
        return selectedWord;
    }

    function speakWord(word) {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = "en-US";
        window.speechSynthesis.speak(utterance);
    }

    function showImageOptions(correctWord, allWords) {
        imageContainer.innerHTML = "";
        feedback.textContent = "";

        const options = [correctWord];
        while (options.length < 3) {
            const randomWord =
                allWords[Math.floor(Math.random() * allWords.length)];
            if (!options.includes(randomWord)) options.push(randomWord);
        }

        // Shuffle options
        options.sort(() => Math.random() - 0.5);

        options.forEach((option) => {
            const img = document.createElement("img");
            img.src = `images/${option}.jpg`;
            img.alt = option;
            img.style.maxWidth = "150px";
            img.style.margin = "10px";
            img.style.cursor = "pointer";
            img.style.borderRadius = "10px";
            img.style.boxShadow = "0 0 5px rgba(0,0,0,0.2)";

            img.addEventListener("click", () => {
                if (option === correctWord) {
                    feedback.textContent = "Correct! ✅";
                    feedback.style.color = "green";
                } else {
                    feedback.textContent = `Incorrect. ❌ The word was: ${correctWord}`;
                    feedback.style.color = "red";
                }
            });

            imageContainer.appendChild(img);
        });
    }

    randomizeButton.addEventListener("click", function () {
        const grade = gradeSelect.value;
        const type = typeSelect.value;
        const word = getRandomWord(grade, type);
        currentWord = word;

        if (grade === "transition_first") {
            wordDisplay.textContent = "";
            speakWord(word);
            showImageOptions(word, words[grade][type]);
        } else {
            wordDisplay.textContent = word;
            imageContainer.innerHTML = "";
            feedback.textContent = "";
        }
    });

    playButton.addEventListener("click", function () {
        if (currentWord) speakWord(currentWord);
    });
});
