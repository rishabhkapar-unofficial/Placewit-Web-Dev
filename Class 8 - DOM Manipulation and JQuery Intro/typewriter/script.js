function typewriter() {
    let element = document.getElementById("keywords");
    let typeDelay = 300;
    let deleteDelay = 100;
    let waitDelay = 1000;
    let words = JSON.parse(element.getAttribute("data-words"));
    let index = 0;
    let text = '';
    let letters = 0;
    let deleting = false;

    this.type = function () {
        word = words[index];
        let delay = typeDelay;

        if(!deleting) {
            text = word.substring(0, letters++);
            delay = typeDelay;
            element.classList.remove('blink');

        } else {
            text = word.substring(0, --letters);
            delay = deleteDelay;
            element.classList.remove('blink');
        }

        if(text === word) {
            deleting = true;
            delay = waitDelay;
            element.classList.add('blink');
        }

        if(text === '') {
            deleting = false;
            index = (index+1)%words.length;
            element.classList.add('blink');
        }
        element.textContent = text;
        setTimeout(this.type, delay);
    }

    this.type();
}

typewriter();