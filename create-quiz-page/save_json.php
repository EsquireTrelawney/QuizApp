<?php

$file = '../quiz-page/quizzes/questions.json';

$data = file_get_contents('php://input');

if (file_put_contents($file, $data)) {
    echo "Файл успешно сохранен в директорию!";
} else {
    echo "Ошибка при сохранении файла.";
}
?>