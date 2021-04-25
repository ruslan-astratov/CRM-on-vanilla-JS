// ------------------------------------------------------------ШАБЛОН VIEW -----------------------------
var viewController = (function() {

    // Объект с СЕЛЕКТОРАМИ тех элементов, с которыми мы будем работать
    var DOMstrings = {

        form: "[data-form]",
        inputNameSurname: "[data-name]",
        inputTel: "[data-tel]",
        inputEmail: "[data-email]",
        inputSelect: "[data-select]",
        submit: "[data-submit]"
    };

    // Функция ПОЛУЧЕНИЯ данных с формы (в момент нажатия на кнопку "Оформить заявку") и возвращение их в виде ОБЪЕКТА
    function getInput() {

        return {
            inputNameSurnameValue:  document.querySelector(DOMstrings.inputNameSurname).value,
            inputTelValue: document.querySelector(DOMstrings.inputTel).value,
            inputEmailValue: document.querySelector(DOMstrings.inputEmail).value,
            selectValue: document.querySelector(DOMstrings.inputSelect).value,
        }

    }


    // Здесь мы ОПИШЕМ функции isEmptyFields() && isValid() 

    // Функция , проверяющая на ЗАПОЛНЕННОСТЬ полей , что поля НЕ пусты ---------------------------
    // Если (Все поля input text/tel/email заполнены, НЕ пусты) и (Валидация пройдена), то добавляем данные в объект data и  переходим на другую страницу
    function isEmptyFields(inputNameSurnameValue, inputTelValue, inputEmailValue) {
        var isEmptyField;

        if(inputNameSurnameValue.trim() != "" && inputTelValue.trim() != "" && inputEmailValue.trim() != "") {
            isEmptyField = true;
            // console.log("Поля заполнены")
        } else {
            isEmptyField = false;

            //--------------Сработает уведомление - АЛЕРТ, о том, что одно из полей, возможно пустое
            swal('Что-то пошло не так..','Пожалуйста, заполните все поля', "error")


            //--------------------- Попробуем найти ВСЕ те ИНПУТЫ, значение которых пустая строка

            let formm = document.querySelector(DOMstrings.form).querySelectorAll("input")

            // Перебираем циклом массив элементов и смотрим - -какой из инпутов ПУСТ -- и даём ему класс -- error-outline -- он рисует аутлайн красного цвета
            formm.forEach(function(item) {

                // если инпут пустой, то даём ему класс, который выделит инпут красным цветом
                if(item.value == "") {
                    item.classList.add("error-outline")
                }
            })
        }

        return isEmptyField;
        // Функция должна вернуть true
    }


    // ---------------------------------------------------------------------
    // Три ОТДЕЛЬНЫЕ функции, проверяющие на ВАЛИДНОСТЬ/ Они входят в ОБЩУЮ функцию

    // 1) Функция, проверяющая ИмяФамилия: 
    function isValidNameSurname(inputValue) {

        // Паттерн для проверки введённых ИмяФамилия - только русские буквы
        var pattern = /^[a-zA-Zа-яА-Я]/

        // var pattern = /(^[A-Z]{1}[a-z]{1,14} [A-Z]{1}[a-z]{1,14}$)|(^[А-Я]{1}[а-я]{1,14} [А-Я]{1}[а-я]{1,14}$)/

        // Если после КЛИКА по кнопке Оформить заявку ИмяФамилия не проходят ВАЛИДАЦИЮ, то ИНПУТУ с именем будет дан класс - рисующий КРАСНЫЙ АУТЛАЙН
        if(!pattern.test(inputValue)) {
            document.querySelector(DOMstrings.inputNameSurname).classList.add("error-outline")
        }

        // Вернёт результат выражения -- true или false
        return pattern.test(inputValue);
    }



    // -----------------------------------------------------------------
    // 2) Функция, проверяющая телефон: 
    // Регулярка, проверяющая телефон

    function isValidTelephone(inputTelVal) {

        // Паттерн для проверки телефона
        var pattern = /(\+7|8)[- _]*\(?[- _]*(\d{3}[- _]*\)?([- _]*\d){7}|\d\d[- _]*\d\d[- _]*\)?([- _]*\d){6})/g;

        // Если после КЛИКА по кнопке Оформить заявку ИмяФамилия не проходят ВАЛИДАЦИЮ, то ИНПУТУ с именем будет дан класс - рисующий КРАСНЫЙ АУТЛАЙН
        if(!pattern.test(inputTelVal)) {
            document.querySelector(DOMstrings.inputTel).classList.add("error-outline")
        }

        console.log(pattern.test(inputTelVal))

        return pattern.test(inputTelVal);
    }

    // ----------------------------------------------------------------------

    // 3) Функция, проверяющая почту - email: 
    // Регулярка, проверяющая email

    function isValidEmail(inputEmailValue) {

        // ruslan.astratov@yandex.ru
        // Паттерн для проверки email
        var pattern = /^([a-z0-9_\-]+\.)*[a-z0-9_\-]+@([a-z0-9][a-z0-9\-]*[a-z0-9]\.)+[a-z]{2,4}$/i;

        // Если введённая почта НЕ соответствует регулярке, то находим ИНПУТ почты и подсвечиваем его КРАСНЫМ АУТЛАЙНОМ
        if(!pattern.test(inputEmailValue)) {
            document.querySelector(DOMstrings.inputEmail).classList.add("error-outline")
        }


        return pattern.test(inputEmailValue);
    }

    // -----------------------------------------------------------------------------------------------------------------

    //----------------------------- ОБЩАЯ Функция , проверяющая на ВАЛИДНОСТЬ инпуты: ИмяФамилия, Телефон, Емейл.
    function isValid(inputNameSurnameValue, inputTelValue, inputEmailValue) {
        var isFieldsValid;

        // Если валидны ВСЕ три поля:   ИмяФамилия,  телефон и емейл, то
        if(isValidNameSurname(inputNameSurnameValue) && isValidTelephone(inputTelValue) && isValidEmail(inputEmailValue) ) {

            isFieldsValid = true;
            // console.log("Валидация пройдена")

        } else {

            isFieldsValid = false;

            // console.log("Валидация НЕ пройдена")

            //---------- Срабатывает алерт , сообщающий пользователю о НЕКОРРЕКТНЫХ ДАННЫХ
            swal('Ой! Кажется, возникла ошибка..','Пожалуйста, проверьте введённые данные. Скорее всего, вы ввели некорректные инициалы, телефон или почту', "error")
        }

        return isFieldsValid;
        // Отработав, функция должна вернуть true или false!
    }


    //----------------------------------------------- Возвращаем наружу методы ШАБЛОНА для использования их в КОНТРОЛЛЕРЕ

    return {
        getInput: getInput,        // Функция получения введённых пользователем данных с формы в момент нажатия на кнопку Оформить заявку,  создаётся ОБЪЕКТ с данными
        isEmptyFields: isEmptyFields,       // Функция возвращает наружу метод , проверяющий поля на ЗАПОЛНЕНОСТЬ. Метод вызывается в контроллере
        isValid: isValid,                   // Функция возвращает наружу метод , проверяющий поля на ВАЛИДНОСТЬ  . Метод вызывается в контроллере
        getDomStrings: function() {         // Функция возвращает объект с СЕЛЕКТОРАМИ. вызывается в контроллере
            return DOMstrings;             
        }
    };

})();


