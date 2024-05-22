document.getElementById('type').addEventListener('change', function() {
    const type = this.value;
    const choicesContainer = document.getElementById('choices-container');
    if (type === 'checkbox' || type === 'radio') {
        choicesContainer.style.display = 'block';
    } else {
        choicesContainer.style.display = 'none';
    }
});

let questions = [];

function addQuestion() {
    const question = document.getElementById('question').value;
    const description = document.getElementById('description').value;
    const type = document.getElementById('type').value;
    const correctAnswer = document.getElementById('correctAnswer').value;
    const madeBy = document.getElementById('madeBy').value;

    let choices = [];
    if (type === 'checkbox' || type === 'radio') {
        choices = document.getElementById('choices').value.split(',').map(choice => choice.trim());
    }

    const questionObj = {
        question: question,
        description: description,
        type: type,
        correctAnswer: type === 'checkbox' || type === 'radio' ? JSON.parse(correctAnswer) : correctAnswer,
        madeBy: madeBy
    };

    if (choices.length > 0) {
        questionObj.choices = choices;
    }

    questions.push(questionObj);
    document.getElementById('jsonOutput').textContent = JSON.stringify(questions, null, 2);
    document.getElementById('testForm').reset();
    document.getElementById('choices-container').style.display = 'none';
}

function saveToFile() {
    const jsonData = JSON.stringify(questions);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "save_json.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            alert("Файл успешно сохранен!");
        }
    };
    xhr.send(jsonData);
}