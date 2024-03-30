function sendMail(){
    let params= {
        name: "gdsghdsgsdgdsgsdgsdg",
        email: "SqrTrelawney@yandex.ru",
        subject: "tegdsdsgsgsdgdsgdsgstSubj",
        message: "mgdsgdsgdsgdsgdssg"
    }
    let someObj = JSON.parse(localStorage.getItem('testResults'))
    params.additionalInfo = Object.assign(JSON.stringify(someObj))
    emailjs.send("service_almncq8","template_okk46xg", params).then(alert("Email sent!"));
}