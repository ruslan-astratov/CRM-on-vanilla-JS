// // План действий:

// // Руслан Астратов  - регулярка на Имя Фамилия
// // Телефон - регулярка на Телефон в формате
// // Email - регулярка на почту
// // Продукт:  - Какой селект выбран


// // Объект allData, в котором будут храниться ВСЕ ДАННЫЕ приложения
// var allData = {

//     // Чуть позже вместо null мы добавим сюда сформированный объект со введёнными пользователем данными из ФОРМЫ ЗАЯВОК. По умолчанию он пустой!!!
//     applicationFormData: null

// }


// // Получаем инпуты и селект:
// var inputNameSurname = document.querySelector("[data-name]");

// var inputTel = document.querySelector("[data-tel]");

// var inputEmail = document.querySelector("[data-email]");

// var inputSelect = document.querySelector("[data-select]");

// var submit = document.querySelector("[data-submit]");

// // Вешаем на кнопку обработчик события:
// submit.addEventListener("click", checkedAndValidation);




// // Функция, срабатывающая при submit -----------------------------------------------------
// function checkedAndValidation(e) {
//     e.preventDefault()

//     // Получили значение инпута с Имя Фамилия
//     var inputNameSurnameValue = inputNameSurname.value;

//     // Получили значение инпута с телефоном
//     var inputTelValue = inputTel.value;

//     // Получили значение инпута с email
//     var inputEmailValue = inputEmail.value;

//     // Получили  value значение select / Продукт:   Курс по вёрстке...Курс по Javascript...
//     var selectValue = inputSelect.value;

//     // Обе функции  должны вернуть true, чтобы программа отработала дальше и сохранила данные  в объект data, и отдельно в LocalStorage
//     // Если поля НЕ пусты , и валидация по всем полям пройдена, то..
//     if( isEmptyFields() && isValid(inputNameSurnameValue, inputTelValue, inputEmailValue) ) {
//         console.log("Валидация и проверка на заполненость пройдены")

//         // .. должна сработать функция сохранения данных(из ФОРМЫ ЗАЯВОК) в объект. То есть - создаём объект с данными на основе того, что мы ввели в инпуты и какой селект выбрали.
//         // Функция отрабатывает и результат работы функции -- то есть объект -- сохраняется в переменную saveDataFromApplication!!!!!
//         // А переменную потом передадим как аргумент в функцию saveDataToLocalStorage, которая уже в свою очередь сохраняет данные в localStorage
//         var saveDataFromApplication = saveDataFromApplicationForm(inputNameSurnameValue, inputTelValue, inputEmailValue, selectValue);

//         // Затем созданный выше объект с данными(saveDataFromApplication) должен попасть/сохраниться в LocalStorage
//         saveDataToLocalStorage(saveDataFromApplication)

//     } else {
//         console.log("Валидация и/или проверка на заполненость НЕ пройдены")
//     }
// }


// // Опишем функцию, которая СОЗДАЁТ ОБЪЕКТ с данными на основе тех значений, которые были введёны пользователем в inputы ФОРМЫ ЗАЯВОК
// //  и сохраняет его в общий объект allData в поле applicationFormData, то есть в allData.applicationFormData

// // ВАЖНО!  Функция обязательно должна принимать аргументы (значения инпутов). Без этого ничего не получится!!
// function saveDataFromApplicationForm(inputNameSurnameValue, inputTelValue, inputEmailValue, selectValue) {

//     // Создаём объект и наполняем его данными из инпутов
//     var objDataFromInputs = {
//         inputNameSurnameValue: inputNameSurnameValue,
//         inputTelValue: inputTelValue,
//         inputEmailValue: inputEmailValue,
//         selectValue: selectValue,
//     };
    
//     console.log("Созданный нами объект с данными из input-ов", objDataFromInputs)

//     // Собственно добавляем наш только что созданный объект с данными(из инпутов) в ОБЩИЙ объект allData(содержащий все данные)
//     allData.applicationFormData = objDataFromInputs;

//     console.log("Добавили созданный объект в ОБЩИЙ объект с данными", allData)

//     // Возвращаем созданный объект наружу, т.к. нам необходимо будет использовать его далее --- для сохранения данных в localStorage!!!
//     return objDataFromInputs
// }

// // ----------------------------------------------------------   localStorage ---------------------------------------------------------
// // Описана Функция, сохраняющая данные в localStorage. Принимает в себя созданный ранее объект с данными
// function saveDataToLocalStorage(saveDataFromApplication) {

//     localStorage.setItem("InputsValueFromApplicationForm", JSON.stringify(saveDataFromApplication));

// }

// // ---------------------------------------------------------- // localStorage ---------------------------------------------------------

// // Функция , проверяющая на ЗАПОЛНЕННОСТЬ полей , что поля НЕ пусты 
// // Если (Все поля input text/tel/email заполнены, НЕ пусты) и (Валидация пройдена), то добавляем данные в объект data и  переходим на другую страницу
// function isEmptyFields() {
//     var isEmptyField;

//     if(inputNameSurname.value.trim() != "" && inputTel.value.trim() != "" && inputEmail.value.trim() != "") {
//         isEmptyField = true;
//         console.log("Поля заполнены")
//     } else {
//         isEmptyField = false;
//         console.log("Поля ПУСТЫ!")
//     }

//     return isEmptyField;
//     // Функция должна вернуть true
// }




// // ---------------------------------------------------------------------
// // Три ОТДЕЛЬНЫЕ функции, проверяющие на ВАЛИДНОСТЬ/ Они входят в ОБЩУЮ функцию

// // 1) Функция, проверяющая ИмяФамилия: 
// function isValidNameSurname(inputValue) {

//     // Паттерн для проверки введённых ИмяФамилия - только русские буквы
//     var pattern = /^[a-zA-Zа-яА-Я]/

//     return pattern.test(inputValue);
// }

// // -----------------------------------------------------------------

// // 2) Функция, проверяющая телефон: 
// // Регулярка, проверяющая телефон
// function isValidTelephone(inputTelVal) {

//     // Паттерн для проверки телефона
//     var pattern = /(\+7|8)[- _]*\(?[- _]*(\d{3}[- _]*\)?([- _]*\d){7}|\d\d[- _]*\d\d[- _]*\)?([- _]*\d){6})/g

//     return pattern.test(inputTelVal);
// }
// // ----------------------------------------------------------------------

// // 3) Функция, проверяющая почту - email: 
// // Регулярка, проверяющая email
// function isValidEmail(inputEmailValue) {

//     // ruslan.astratov@yandex.ru
//     // Паттерн для проверки email
//     var pattern = /^([a-z0-9_\-]+\.)*[a-z0-9_\-]+@([a-z0-9][a-z0-9\-]*[a-z0-9]\.)+[a-z]{2,4}$/i;

//     return pattern.test(inputEmailValue);
// }

// // -----------------------------------------------------------------------

// // ОБЩАЯ Функция , проверяющая на ВАЛИДНОСТЬ поля: ИмяФамилия, Телефон, Емейл. Сейчас пока тестирую валидность Емейл
// // inputNameSurnameValue  - было в аргументах

// function isValid(inputNameSurnameValue, inputTelValue, inputEmailValue) {
//     var isFieldsValid;

//     // Если валидны ВСЕ три поля:   ИмяФамилия,  телефон и емейл, то
//     if(isValidNameSurname(inputNameSurnameValue) && isValidTelephone(inputTelValue) && isValidEmail(inputEmailValue) ) {

//         isFieldsValid = true;
//         console.log("Валидация пройдена")

//     } else {

//         isFieldsValid = false;

//         console.log("Валидация НЕ пройдена")
//     }

//     return isFieldsValid;
//     // Отработав, функция должна вернуть true или false!
// }


