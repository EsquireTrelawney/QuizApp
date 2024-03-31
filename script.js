function processingResultsThenSendMail(){
    let params= {
        name: "MathProbabilityQuizzes",
        email: "SqrTrelawney@yandex.ru",
        subject: "Результаты тестирования",
        message: "Ниже <strong>приведены результаты</strong> <br> прохождения тестирования пользователем ",
        info: ''
    }
    let testResults = JSON.parse(localStorage.getItem('testResults'));
    params.questionsAnsweredCorrectly = testResults.correct_total.correct_answers;
    params.questionsTotal = testResults.correct_total.total_questions;
    params.percentage = (params.questionsAnsweredCorrectly / params.questionsTotal * 100).toFixed(2) + "%";

    const questionsResults = testResults.quizzesResults;
    localStorage.setItem('testResults_new', JSON.stringify(testResults));
    localStorage.setItem('questionsResults', JSON.stringify(questionsResults));

// Создаем начало таблицы
    params.info = "<table>";

    for (let i = 0; i < questionsResults.length; i++) {
        const singleQuestionResults = questionsResults[i];
        let questionInfo = "";

        // Формируем информацию о вопросе
        questionInfo += `<tr><td colspan="2" style="background-color: ${singleQuestionResults.isCorrect ? '#23c351' : '#fd3f38'}; color: white;"><b>Вопрос:</b> ${singleQuestionResults.question ?? ''} ${singleQuestionResults.description ?? ''}</td></tr>`;

        // Добавляем тип вопроса и ответы
        if (singleQuestionResults.type === "input" || singleQuestionResults.type === "multi-input") {
            questionInfo += `<tr><td colspan="2"><b>Тип вопроса:</b> ${singleQuestionResults.type}</td></tr>`;
            questionInfo += `<tr><td><b>Ответ пользователя:</b> ${singleQuestionResults.userAnswer ?? ''}</td>`;
            questionInfo += `<td><b>Правильный ответ:</b> ${singleQuestionResults.correctAnswer ?? ''}</td></tr>`;
        } else {
            questionInfo += `<tr><td colspan="2"><b>Тип вопроса:</b> ${singleQuestionResults.type}</td></tr>`;


            let userAnswers = Array.isArray(singleQuestionResults.userAnswer) ? singleQuestionResults.userAnswer : [singleQuestionResults.userAnswer];
            let correctAnswers = Array.isArray(singleQuestionResults.correctAnswer) ? singleQuestionResults.correctAnswer : [singleQuestionResults.correctAnswer];
            // Формируем текст ответов пользователя
            let userAnswersText = userAnswers.map(index => singleQuestionResults.choices[index]).join(', ');
            let correctAnswersText = correctAnswers.map(index => singleQuestionResults.choices[index]).join(', ');

            questionInfo += `<tr><td><b>Ответ пользователя:</b> ${userAnswersText}</td>`;
            questionInfo += `<td><b>Правильный ответ:</b> ${correctAnswersText}</td></tr>`;
        }

        // Определяем цвет строки в зависимости от правильности ответа
        //const rowColor = singleQuestionResults.isCorrect ? 'green' : 'red';

        // Добавляем информацию о вопросе в таблицу
        params.info += /*`<tr style="background-color:${rowColor}; color:white;">${*/questionInfo.replaceAll('<in>', '_').replaceAll('\n', '')/*}</tr>`*/;
    }

// Закрываем таблицу
    params.info += "</table>";

    /*const questionsResults = testResults.quizzesResults;
    localStorage.setItem('testResults_new', JSON.stringify(testResults));
    localStorage.setItem('questionsResults', JSON.stringify(questionsResults));
    for (let i = 0; i < questionsResults.length; i++) {
        const singleQuestionResults = questionsResults[i];
        let questionInfo = `Вопрос: ${singleQuestionResults.question ?? ''} ${singleQuestionResults.description ?? ''}`;
        // когда тип вопроса input, то нужно просто возвращать userAnswer и correctAnswer. Иначе - выводить поля элементов массива
        if (singleQuestionResults.type === "input" || singleQuestionResults.type === "multi-input") {
            questionInfo += ` Ответ пользователя: ${singleQuestionResults.userAnswer ?? ''} Правильный ответ: ${singleQuestionResults.correctAnswer ?? ''}`;
        } else {
            // Для случая, когда тип вопроса не является input
            // Была ошибка, связанная с тем, что map не применялся к объектам, потому что они не массивы, хотя это странно..
            // раз добралось в эту scope, то тайп != инпут, а значит объекты эти точно массивы. Хм. Надо будет поинтересоваться подробно
            let userAnswers = Array.isArray(singleQuestionResults.userAnswer) ? singleQuestionResults.userAnswer : [singleQuestionResults.userAnswer];
            let correctAnswers = Array.isArray(singleQuestionResults.correctAnswer) ? singleQuestionResults.correctAnswer : [singleQuestionResults.correctAnswer];

            // Преобразование индексов ответов пользователя и правильных ответов в соответствующие текстовые значения из choices
            let userAnswersText = userAnswers.map(index => singleQuestionResults.choices[index]).join(', ');
            let correctAnswersText = correctAnswers.map(index => singleQuestionResults.choices[index]).join(', ');
            questionInfo += ` Ответ пользователя: ${userAnswersText} Правильный ответ: ${correctAnswersText}`;
        }
        singleQuestionResults.isCorrect ?
            params[i] ='<span style="color: #71b671;">ВЕРНО</span> |' + questionInfo:
            params[i] = '<span style="color: #9a4242;">НЕВЕРНО</span> |' + questionInfo;
    }

    for (let i = 0; i < params.questionsTotal; i++) {
        // Добавляем значение текущего поля в объединенную строку
        params.info += params[i].replaceAll('<in>', '_').replaceAll('\n', '')+ '<br>';
    }*/
    console.log(params.info);
    localStorage.setItem('params_info', JSON.stringify(params));
    emailjs.send("service_almncq8","template_okk46xg", params).then(alert("Email sent!"));
}