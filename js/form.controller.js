// -----------------------------------------------------------------  КОНТРОЛЛЕР     ----------------------------------------------------------------------------

// Нужно сделать так, чтобы в объект с данными, как и в localStorage, попадали разные заявки с разными идентификаторами. 
// В localStorage в графе key должны быть разные значения


//  Контроллер              МОДЕЛЬ     ШАБЛОН
var controller = (function(modelCtrl, viewCtrl) {

    // Получение кнопки "Оформить заявку" и добавление на неё обработчика событий
    var setupEventListeners = function(){
        var DOM = viewCtrl.getDomStrings(); // Получение объекта с селекторами. Из него нам нужна кнопка

        // Так он выглядит в ШАБЛОНЕ
        // var DOMstrings = {

        //     form: "[data-form]",
        //     inputNameSurname: "[data-name]",
        //     inputTel: "[data-tel]",
        //     inputEmail: "[data-email]",
        //     inputSelect: "[data-select]",
        //     submit: "[data-submit]"
    
        // };

        // Получаем форму и вешаем на неё событие ИНПУТ
        document.querySelector(DOM.form).addEventListener("input", searchErrorOutlineAndDeleteThem);


        // Получаем КНОПКУ оформить заявку и вешаем на неё событие - КЛИК
        document.querySelector(DOM.submit).addEventListener("click", checkedAndValidation); // Вешаем на кнопку событие "click"
    }

    // ---------------------- ПРИ ВВОДЕ ТЕКСТА  ИЩЕМ КРАСНУЮ ОБВОДКУ И УДАЛЯЕМ ЕЁ ------------------------------------------------
    // Функция, срабатывающая при событии INPUT -- когда вводим что-то в ИНПУТЫ, в случае - если у них был класс АУТЛАЙН, он уберётся 
    function searchErrorOutlineAndDeleteThem(e) {

        e.target.classList.remove("error-outline")
    }



    //----------------------------------- Функция, срабатывающая при КЛИКЕ на кнопку Оформить заявку --------------------------------
    function checkedAndValidation(event){
        event.preventDefault();

        // Получаем введённые пользователем ДАННЫЕ из Формы заявок, в виде ОБЪЕКТА и записываем его в переменную input              (getInput() описана в шаблоне)

        //                                              Объект input
        // return {
        //     inputNameSurnameValue:  document.querySelector(DOMstrings.inputNameSurname).value,
        //     inputTelValue: document.querySelector(DOMstrings.inputTel).value,
        //     inputEmailValue: document.querySelector(DOMstrings.inputEmail).value,
        //     selectValue: document.querySelector(DOMstrings.inputSelect).value,
        // }

        var input = viewCtrl.getInput();

        // Значения из инпутов   Формы заявок
        var inputNameSurnameValue = input.inputNameSurnameValue;

        var inputTelValue = input.inputTelValue;

        var inputEmailValue = input.inputEmailValue;

        // Вызываем функции isEmptyFields и isValid как методы ШАБЛОНА. И если условия будут выполнены.......
        if( viewCtrl.isEmptyFields(inputNameSurnameValue, inputTelValue, inputEmailValue) && viewCtrl.isValid(inputNameSurnameValue, inputTelValue, inputEmailValue) ) {
            // console.log("Все поля заполнены и валидация пройдена") 

            // Здесь получаем общий ОБЪЕКТ со ВСЕМИ данными и записываем в переменную allDataForSite. Берём ЕГО из модели, вызвав у модели метод .getAllData():

            // В МОДЕЛИ этот объект выглядит так:
            // var allData = {
            //     applicationFormData: [] -  массив, куда будут пушиться созданные объекты saveDataFromApplication
            // }

            // Сюда попадёт ВЕСЬ объект -- allData -- из МОДЕЛИ 
            var allDataForSite = modelCtrl.getAllData()


            // console.log("Массив объектов-заявок", allDataForSite.applicationFormData) 

            // ...........то должна сработать функция создания заявок (-из ФОРМЫ ЗАЯВОК) и добавления их в МАССИВ объектов. То есть - создаём объект с данными на основе того, что мы ввели в инпуты 

           // ------------Функция отрабатывает: создаёт заявку, добавляет в массив объектов, избавляется от дублей и даёт заявкам уникальные ID 
            modelCtrl.saveDataFromApplicationForm(allDataForSite, input.inputNameSurnameValue, input.inputTelValue, input.inputEmailValue, input.selectValue);

            //--------Затем заполненный заявками МАССИВ объектов  должен попасть/сохраниться в LocalStorage. Передаём его как аргумент
            modelCtrl.saveDataToLocalStorage(allDataForSite.applicationFormData)

        } else {
            console.log("Валидация НЕ пройдена и/или поля не заполнены") 
          }
    }

    // -------------------------------  Вернём наружу возможность запускать программу, то есть запускать прослушку
    return {
        init: function(){               // Функция, запускающая программу, то есть запускающая прослушку
            setupEventListeners();
        }
    }

})(modelController, viewController);   // Передаём внутрь контроллера как аргументы: МОДЕЛЬ и ШАБЛОН

// ЗАПУСКАЕМ программу
controller.init();
