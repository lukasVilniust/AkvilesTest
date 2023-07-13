
const textContainers = document.querySelectorAll('.text-box');
const buttons = document.querySelectorAll('.button-toggle');
const inputElement = document.querySelector('.text-input');


buttons.forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('active');
    });
});

function saveToggledButtons() {
    const toggledButtons = Array.from(buttons).filter(button => button.classList.contains('active'));
    
    const data = {
        'Ugdymo lygis': [],
        'Integruojami dalykai': [],
    };

    toggledButtons.forEach(button => {
        const text = button.textContent;
        const container = button.closest('.container');
        const containerText = container.querySelector('.text-box').textContent;
        data[containerText].push(text);
    });

    if (inputElement.value.trim() !== '') {
        const container = inputElement.closest('.container');
        const containerText = container.querySelector('.text-box').textContent;
        data[containerText].push(inputElement.value);
    }


    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'Selections.json';
    link.click();

    URL.revokeObjectURL(url);
}

function handleInputChange(event) {
    const input = event.target;
    if (input.value.length > 0) {
        input.style.borderColor = 'purple';
        input.style.fontWeight = 'bold';
        input.style.borderWidth = '2px';
    } else {
        input.style.borderColor = 'black';
        input.style.borderWidth = '1px';
        input.style.fontWeight = 'normal';
    }
}

function resetButtonsAndInput() {
    buttons.forEach(button => {
        button.classList.remove('active');
    });
    inputElement.value = '';
    inputElement.style.borderColor = 'black';
    inputElement.style.borderWidth = '1px';
    inputElement.style.fontWeight = 'normal';
}

