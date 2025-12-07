let savedQuestions = [];

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









// webkit scrollbar customization into bullet

document.addEventListener('DOMContentLoaded', function() {
  
  const style = document.createElement('style');
  style.textContent = `
    .chat-window::-webkit-scrollbar { display: none !important; }
    .chat-window { -ms-overflow-style: none !important; scrollbar-width: none !important; }
    .chat-container { position: relative; }
    
    .custom-scrollbar-track {
      position: absolute;
      right: 15px;
      width: 7px;
      background-color:  rgb(240, 237, 237);
      border-radius: 50px;
      z-index: 99;
    }
    
    .custom-scrollbar-bullet {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 10px;
      height: 10px;
      background-color: var(--primary-font-color);
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    }
    
    .custom-scrollbar-bullet:hover { transform: translateX(-50%) scale(1.2); }
    .custom-scrollbar-bullet.dragging { transform: translateX(-50%) scale(1.3); }
  `;
  document.head.appendChild(style);

  const container = document.querySelector('.chat-container');
  const chatWindow = document.getElementById('chat-window');
  const track = document.createElement('div');
  const bullet = document.createElement('div');
  
  track.className = 'custom-scrollbar-track';
  bullet.className = 'custom-scrollbar-bullet';
  track.appendChild(bullet);
  container.appendChild(track);

  let isDragging = false;

  function update() {
    const st = chatWindow.scrollTop;
    const sh = chatWindow.scrollHeight;
    const ch = chatWindow.clientHeight;

    if (sh <= ch) { track.style.display = 'none'; return; }
    
    track.style.display = 'block';
    const rect = chatWindow.getBoundingClientRect();
    const cRect = container.getBoundingClientRect();
    
    track.style.top = (rect.top - cRect.top) + 'px';
    track.style.height = rect.height + 'px';
    
    const percent = st / (sh - ch);
    bullet.style.top = (rect.height - 12) * percent + 'px';
  }

  bullet.onmousedown = (e) => {
    e.preventDefault();
    isDragging = true;
    bullet.classList.add('dragging');
  };

  document.onmousemove = (e) => {
    if (!isDragging) return;
    const tRect = track.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (e.clientY - tRect.top) / tRect.height));
    chatWindow.scrollTop = (chatWindow.scrollHeight - chatWindow.clientHeight) * percent;
  };

  document.onmouseup = () => {
    isDragging = false;
    bullet.classList.remove('dragging');
  };

  chatWindow.addEventListener('scroll', update);
  window.addEventListener('resize', update);
  setTimeout(update, 100);
});