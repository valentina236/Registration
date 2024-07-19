username.onblur = function() {
    if (!/^[а-яА-Яa-zA-Z]+$/.test(username.value)) {
        document.getElementById('username').classList.add('invalid');
        let errorDiv = document.createElement('div');
        errorDiv.classList.add('error');
        errorDiv.textContent = 'Пожалуйста, введите корректно свое имя.';
        username.after(errorDiv);
    }
};

username.onfocus = function() {
    document.getElementById('username').classList.remove('invalid');
    let errorDiv = username.nextElementSibling;
    if (errorDiv && errorDiv.classList.contains('error'))
        errorDiv.remove();
};

email.onblur = function() {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
        document.getElementById('email').classList.add('invalid');
        let errorDiv = document.createElement('div');
        errorDiv.classList.add('error');
        errorDiv.textContent = 'Пожалуйста, введите корректный email.';
        let emailContainer = document.getElementsByClassName('email-box');
        emailContainer[0].after(errorDiv);
    }
};

email.onfocus = function() {
    email.classList.remove('invalid');
    let emailContainer = document.getElementsByClassName('email-box');
    let errorDiv = emailContainer[0].nextElementSibling;
    if (errorDiv && errorDiv.classList.contains('error'))
        errorDiv.remove();
};

password.onblur = function() {
    if (password.value.length < 4 || password.value.length > 8) {
        password.classList.add('invalid');
        let errorDiv = document.createElement('div');
        errorDiv.classList.add('error');
        errorDiv.textContent = 'Пароль должен содержать от 4 до 8 символов.';
        password.after(errorDiv);
    }
};

password.onfocus = function() {
    password.classList.remove('invalid');
    let errorDiv = password.nextElementSibling;
    if (errorDiv && errorDiv.classList.contains('error'))
        errorDiv.remove();
};

birthday.onblur = function() {
    let datePattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (!datePattern.test(birthday.value)) {
        document.getElementById('birthday').classList.add('invalid');
        let errorDiv = document.createElement('div');
        errorDiv.classList.add('error');
        errorDiv.textContent = 'Введите дату рождения в формате: 01/01/2000';
        birthday.after(errorDiv);
    }
};

birthday.onfocus = function() {
    document.getElementById('birthday').classList.remove('invalid');
    let errorDiv = birthday.nextElementSibling;
    if (errorDiv && errorDiv.classList.contains('error'))
        errorDiv.remove();
};

LoginForm.addEventListener('submit', function(e) {
    e.preventDefault();

    clearErrorMessages();

    let nameInput = document.getElementById('username');
    let emailInput = document.getElementById('email');
    let passwordInput = document.getElementById('password');
    let confirmPasswordInput = document.getElementById('confPassword');
    let birthdayInput = document.getElementById('birthday');
    let countrySelect = document.getElementById('counties');
    let hobbiesCheckboxes = document.getElementsByName('hobbies');
    let mailingRadios = document.getElementsByName('options');

    let hasErrors = false;

    if (nameInput.value === '') {
        showErrorMessage(nameInput, 'Введите ваше имя');
        hasErrors = true;
    }

    if (emailInput.value === '') {
        showErrorMessage(emailInput, 'Введите ваш email');
        hasErrors = true;
    }

    if (passwordInput.value === '') {
        showErrorMessage(passwordInput, 'Введите пароль');
        hasErrors = true;
    }

    if (confirmPasswordInput.value === '') {
        showErrorMessage(confirmPasswordInput, 'Подтвердите пароль');
        hasErrors = true;
    } 
    else if (confirmPasswordInput.value !== passwordInput.value) {
        showErrorMessage(confirmPasswordInput, 'Пароли не совпадают');
        hasErrors = true;
    }

    if (birthdayInput.value === '') {
        showErrorMessage(birthdayInput, 'Введите дату рождения в формате: 01/01/2000');
        hasErrors = true;
    }

    if (countrySelect.value === '') {
        showErrorMessage(countrySelect, 'Выберите страну');
        hasErrors = true;
    }

    let hobbySelected = false;
    for (let i = 0; i < hobbiesCheckboxes.length; i++)
        if (hobbiesCheckboxes[i].checked) {
            hobbySelected = true;
            break;
        }

    if (!hobbySelected) {
        showErrorMessage(hobbiesCheckboxes[0], 'Выберите как минимум один вариант');
        hasErrors = true;
    }

    let mailingSelected = false;
    for (let i = 0; i < mailingRadios.length; i++)
        if (mailingRadios[i].checked) {
            mailingSelected = true;
            break;
        }

    if (!mailingSelected) {
        showErrorMessage(mailingRadios[0], 'Выберите один вариант');
        hasErrors = true;
    }

    if (!hasErrors)
        LoginForm.submit();
});


function showErrorMessage(input, message) {
    input.classList.add('invalid');
    let errorDiv = document.createElement('div');
    errorDiv.classList.add('error');
    errorDiv.textContent = message;

    if(message === 'Выберите как минимум один вариант'){
        let hobi = document.getElementsByClassName('hobbi');
        hobi[0].after(errorDiv);
    }
    else if(message === 'Выберите один вариант'){
        let option = document.getElementsByClassName('dop-details');
        option[0].after(errorDiv);
    }
    else if(message === 'Введите ваш email'){
        let email = document.getElementsByClassName('email-box');
        email[0].after(errorDiv);
    }
    else input.after(errorDiv);
}

function clearErrorMessages() {
    let errorMessages = document.querySelectorAll('.error');
    errorMessages.forEach(errorMessage => errorMessage.remove());
}  

counties.onfocus = function() {
    counties.classList.remove('invalid');
    let errorDiv = counties.nextElementSibling;
    if (errorDiv && errorDiv.classList.contains('error'))
        errorDiv.remove();
};

confPassword.onfocus = function() {
    confPassword.classList.remove('invalid');
    let errorDiv = confPassword.nextElementSibling;
    if (errorDiv && errorDiv.classList.contains('error'))
        errorDiv.remove();
};

let hobbiesCheckboxes = document.getElementsByName('hobbies');

hobbiesCheckboxes.forEach(checkbox => {
    checkbox.onchange = function() {
        let hobbySelected = false;
        for (let i = 0; i < hobbiesCheckboxes.length; i++)
            if (hobbiesCheckboxes[i].checked) {
                hobbySelected = true;
                break;
            }

        if (hobbySelected) {
            let hobi = document.getElementsByClassName('hobbi');
            let errorDiv = hobi[0].nextElementSibling;
            if (errorDiv && errorDiv.classList.contains('error'))
                errorDiv.remove();
        }
    };
});

let mailingRadios = document.getElementsByName('options');

for (let i = 0; i < mailingRadios.length; i++) {
    mailingRadios[i].onchange = function() {
        let option = document.getElementsByClassName('dop-details');
        let errorDiv = option[0].nextElementSibling;
        if (errorDiv && errorDiv.classList.contains('error'))
            errorDiv.remove();
    };
}
