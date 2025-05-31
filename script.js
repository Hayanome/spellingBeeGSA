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
                "cow",
                "horse",
                "calf",
                "sheep",
                "rooster",
                "dog",
                "cat",
                "hen",
                "bike",
                "robot",
                "doll",
                "ball",
                "car",
                "eraser",
                "game",
                "board",
                "crayons",
                "lunchbox",
                "ruler",
                "pencil",
            ],
            master: [
                "ostrich",
                "kangaroo",
                "puzzle",
                "balloons",
                "scissors",
                "highlighter",
                "pencil case",
                "lambs",
                "scooter",
                "pencil sharpener",
            ],
        },
        second_third: {
            normal: [
                "swimming",
                "skateboarding",
                "hockey",
                "baseball",
                "badminton",
                "biking",
                "icy",
                "dry",
                "snowy",
                "foggy",
                "shoes",
                "wash",
                "brush",
                "face",
                "shower",
                "bread",
                "sauce",
                "mushrooms",
                "there",
                "any",
            ],
            master: [
                "grasshopper",
                "snowman",
                "weather",
                "cloudy",
                "swimming",
                "teeth",
                "healthy",
                "juice",
                "always",
                "cheese",
            ],
        },
        fourth_fifth: {
            normal: [
                "jelly",
                "toast",
                "throat",
                "cough",
                "many",
                "much",
                "ring",
                "cake",
                "water",
                "robot",
                "desert",
                "canyon",
                "merchant",
                "fencing",
                "pottery",
                "chess",
                "volcano",
                "rocky",
                "rainforest",
            ],
            master: [
                "hospital",
                "juice",
                "hungry",
                "dentist",
                "bandage",
                "gymnastics",
                "trampolining",
                "photography",
                "harvest",
                "grassland",
            ],
        },
        sixth_seventh: {
            normal: [
                "jump",
                "snowy",
                "pants",
                "science",
                "pretty",
                "read",
                "cloudy",
                "short",
                "skirt",
                "funny",
                "toothbrush",
                "sunglasses",
                "achievement",
                "agreement",
                "improvement",
                "calculator",
                "instrument",
                "scissors",
                "bottle",
                "helmet",
            ],
            master: [
                "volleyball",
                "sweater",
                "drawing",
                "geography",
                "physics",
                "advertisement",
                "amazingly",
                "beautifully",
                "carefully",
                "documentary",
            ],
        },
        eighth_ninth: {
            normal: [
                "burglaries",
                "thieves",
                "kidnapping",
                "smuggling",
                "robbery",
                "punishment",
                "firewall",
                "vandalism",
                "witness",
                "ransomware",
                "consequences",
                "nevertheless",
                "against",
                "fraudster",
                "persuade",
                "frightened",
                "sympathize",
                "frauds",
                "suspicious",
                "suggest",
            ],
            master: [
                "pickpocketer",
                "decrypt",
                "phishing",
                "cryptojacking",
                "trafficking",
                "surveillance",
                "counterfeiting",
                "cybersecurity",
                "psychological",
                "recommend",
            ],
        },
        tenth_eleventh: {
            normal: [
                "punishment",
                "bungalow",
                "detached",
                "fashionable",
                "over-sized",
                "pointless",
                "timeless",
                "patterned",
                "noughties",
                "affordable",
                "generous",
                "thoughtful",
                "aggressive",
                "supportive",
                "stubborn",
                "clumsy",
                "reliable",
                "appeared",
                "innovative",
                "predictions",
            ],
            master: [
                "fully furnished",
                "sophisticated",
                "thoughtfulness",
                "floppy hat",
                "endorsement",
                "unreliable",
                "mind-blowing",
                "approaching",
                "unwearable",
                "enthusiastic",
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
