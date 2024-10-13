// Function to append messages to the chat box
function appendMessage(sender, message) {
    const p = document.createElement('p');
    p.textContent = `${sender}: ${message}`;
    const chatBox = document.getElementById('chat-box');
    chatBox.appendChild(p);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to simulate fetching a response based on user input
async function getResponse(message) {
    const greetings = ["Hello!", "Hi there!", "Hey!", "Greetings!"];
    const affirmatives = ["Yes", "Certainly", "Of course", "Absolutely"];
    const negatives = ["No", "Sorry, I can't do that", "Unfortunately not", "I'm afraid not"];
    const thanks = ["You're welcome!", "No problem!", "Glad to help!", "Anytime!"];
    const commands = {
        "help": "You can ask me questions or chat about various topics.",
        "time": getCurrentTime(),
        "date": getCurrentDate(),
        "weather": getWeatherInfo(),
        "joke": getJoke(),
        "fact": getFact(),
        "quote": getQuote(),
    };

    let response;
    const lowerCaseMessage = message.toLowerCase();
    if (commands[lowerCaseMessage]) {
        response = commands[lowerCaseMessage];
    } else if (lowerCaseMessage.includes("thank")) {
        response = getRandomElement(thanks);
    } else if (lowerCaseMessage.includes("yes")) {
        response = getRandomElement(affirmatives);
    } else if (lowerCaseMessage.includes("no")) {
        response = getRandomElement(negatives);
    } else {
        response = await fetchGeneratedResponse(message);
    }
    setTimeout(() => appendMessage('Assistant', response), 500);
}

async function fetchGeneratedResponse(inputMessage) {
    try {
        const response = await fetch('/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: inputMessage })
        });
        const text = await response.text();  // or await response.json() if the server responds with JSON
        return text;  // Return the text directly from the async function
    } catch (error) {
        console.error('Error fetching generated response:', error);
        return null;  // Optionally return null or throw the error
    }
}

// Utility functions
function getCurrentTime() {
    return `Current time is ${new Date().toLocaleTimeString()}`;
}

function getCurrentDate() {
    return `Today's date is ${new Date().toDateString()}`;
}

function getWeatherInfo() {
    const temperature = getRandomNumber(10, 35);
    const condition = getRandomElement(["Sunny", "Cloudy", "Rainy", "Windy"]);
    return `Current weather: ${temperature}°C, ${condition}`;
}

function getJoke() {
    const jokes = [
        "Why don't scientists trust atoms? Because they make up everything!",
        "Parallel lines have so much in common. It's a shame they'll never meet.",
        "I told my wife she was drawing her eyebrows too high. She looked surprised.",
        "Why did the scarecrow win an award? Because he was outstanding in his field!"
    ];
    return getRandomElement(jokes);
}

function getFact() {
    const facts = [
        "Ants stretch when they wake up in the morning.",
        "A group of flamingos is called a flamboyance.",
        "Honey never spoils.",
        "The shortest war in history lasted only 38 minutes.",
        "Octopuses have three hearts."
    ];
    return getRandomElement(facts);
}

function getQuote() {
    const quotes = [
        "The only way to do great work is to love what you do. – Steve Jobs",
        "In the middle of difficulty lies opportunity. – Albert Einstein",
        "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill"
    ];
    return getRandomElement(quotes);
}

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Event listener to handle UI interactions once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const chatContainer = document.querySelector('.chat-container');
    const sendButton = document.querySelector('#send-button');
    const userInput = document.querySelector('#user-input');
    const newConversationBtn = document.getElementById('new-conversation-btn');
    const conversationContent = document.querySelector('.conversation-content');
    const modeToggle = document.querySelector('#mode-toggle-checkbox');
    const newConversationButton = document.getElementById('new-conversation-btn');
        
    newConversationButton.addEventListener('click', function() {
        location.reload();
    });

    sendButton.addEventListener('click', () => {
        const message = userInput.value.trim();
        if (message !== '') {
            appendMessage('user', message);
            getResponse(message);
            userInput.value = '';
        }
    });

    userInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            sendButton.click();
        }
    });

    sidebarToggle.addEventListener('click', function () {
        sidebar.classList.toggle('collapsed');
        if (sidebar.classList.contains('collapsed')) {
            chatContainer.style.width = '97%';
            chatContainer.style.marginLeft = '3%';
        } else {
            chatContainer.style.width = 'calc(100% - 300px)';
            chatContainer.style.marginLeft = '300px';
        }
    });

    newConversationBtn.addEventListener('click', function () {
        conversationContent.textContent = "New Conversation Started!";
    });

    modeToggle.addEventListener('change', function () {
        chatContainer.classList.toggle('light-mode');
        chatContainer.classList.toggle('dark-mode');
    });

    modeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
    });
});