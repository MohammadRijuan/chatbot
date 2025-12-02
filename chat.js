let savedQuestions = [];
const MAX_QUESTIONS = 5;

const chatWindow = document.getElementById('chat-window');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.querySelector('.send-btn');


// showing loader
function showLoader() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing';
    typingDiv.id = 'typing';

    typingDiv.innerHTML = `
                <div class="dot-pulse">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            `;

    chatWindow.appendChild(typingDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}


// hiding loader
function hideLoader() {
    const typingDiv = document.getElementById('typing');
    if (typingDiv) {
        typingDiv.remove();
    }
}


// adding question
function addQuestion(questionText) {
    savedQuestions.push(questionText);

    if (savedQuestions.length > MAX_QUESTIONS) {
        savedQuestions.shift();
    }

    const chatItem = document.createElement('div');
    chatItem.className = 'chat-item';

    chatItem.innerHTML = `
                <div class="question">
                    <span class="icon">💡</span>
                    ${questionText}
                </div>
            `;

    chatWindow.appendChild(chatItem);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}


// sending function
function handleSend() {
    const question = chatInput.value.trim();

    if (question) {
        addQuestion(question);
        chatInput.value = '';

        showLoader();

        setTimeout(() => {
            hideLoader();
        }, 5000);

        // chatInput.focus();
    }
}


sendBtn.addEventListener('click', handleSend);


chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSend();
    }
});


// chatInput.focus();