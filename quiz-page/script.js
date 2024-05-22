function processingResultsThenSendMail(){
    let params= {
        name: "Веб-приложение для тестов",
        to_email: "nothinginterestinghere",
        subject: "Результаты тестирования",
        message: "Ниже <strong>приведены результаты</strong> <br> прохождения тестирования",
        info: '',
        nickname: '',
        contacts: '',
        date: '',
        quiz_start_time: '',
        quiz_end_time: ''
    }
    let testResults = JSON.parse(localStorage.getItem('testResults'));
    params.questionsAnsweredCorrectly = testResults.correct_total.correct_answers;
    params.questionsTotal = testResults.correct_total.total_questions;
    params.percentage = (params.questionsAnsweredCorrectly / params.questionsTotal * 100).toFixed(2) + "%";
    params.nickname = JSON.parse(localStorage.getItem('userInfo')).nickname;
    params.contacts = JSON.parse(localStorage.getItem('userInfo')).contacts;
    params.to_email = params.contacts;
    const currentDate = new Date();
    // Получаем день, месяц и год
    // Добавляем значение в params
    params.date = `${String(currentDate.getDate()).padStart(2, '0')}.${String(currentDate.getMonth() + 1).padStart(2, '0')}.${currentDate.getFullYear()}`;

    // Получаем время окончания тестирования
    // добавляем ведущий ноль, если значение меньше 10
    params.quiz_start_time = JSON.parse(localStorage.getItem('timeOfStart'));
    params.quiz_end_time = `${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;

    const questionsResults = testResults.quizzesResults;

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
        params.info += questionInfo.replaceAll('<in>', '_').replaceAll('\n', '');
    }

// Закрываем таблицу
    params.info += "</table>";
    emailjs.send("service_almncq8","template_okk46xg", params).then(console.log("email_sent"));
}