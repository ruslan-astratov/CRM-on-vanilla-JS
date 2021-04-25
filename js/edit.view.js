// -------------------------- ШАБЛОН РЕДАКТИРОВАТЬ. 3 СТРАНИЦА--------------------- -------------------------
var viewEditController = (function() {

    // Объект с СЕЛЕКТОРАМИ третьей страницы.
    var DOMstrings = {

        dataOfID: "[data-ID]",                             // ID: Заявка N
        dataTimeOfCreation: "[data-time-of-creation]",     // Дата создания:   2020-04-20 13:52:13

        selectProducts: "[data-products]",                 // Продукт -  селект
        inputName: "[data-name]",                          // Имя
        inputEmail: "[data-email]",                        // Мэйл
        inputTelephone: "[data-telephone]",                // Телефон
        selectStatus: "[data-status]",                     // Статус заявки

        buttonSaveChanges: "[data-save-changes]",          // Кнопка "Сохранить изменения"
        buttonDeleteToArchive: "[data-delete-to-archive]"  // Кнопка "Добавить в архив"

    };


    // ----------------------------------------- ФУНКЦИЯ ОТРИСОВКИ ЗНАЧЕНИЙ СЧЁТЧИКОВ ( И НА 2, И НА 3 СТРАНИЦЕ)--------------------------------------------

    // 1. Получаем и МАССИВ объектов из localStorage, и СЧЁТЧИК заявок (на 2 и 3 страницах он в левой части) 
    // Если удаётся получить, выполняем функцию: 
    function updateValueOfCounter() {


        // Пробуем получить МАССИВ объектов из localStorage, в котором находятся все наши заявки
        let arrayObjectsFromLS = JSON.parse(localStorage.getItem("clients application")); 

        // Пробуем получить КОНТЕЙНЕР всех СЧЁТЧИКОВ, тем самым проверяя -  есть ли он у страницы, на которой мыы находимся
        let counterWrapper = document.querySelector('[data-counter-wrapper]')

        // Далее проверяем условие: если МАССИВ объектов, И контейнер счётчиков найдены, то 
        if(arrayObjectsFromLS && counterWrapper) {
            // console.log("И счётчик, и МАССИВ объектов найдены!")

            // Для каждого из типов заявок (Все, Новые, Завершённые, В работе, Архивные) создаём СВОЮ переменную-СЧЁТЧИК

            // Все заявки
            let allApplications = 0

            // Новые заявки
            let newApplications = 0

            // В работе   заявки
            let inWorkApplications = 0

            // Завершённые   заявки
            let completeApplications = 0

            // Архив   заявки
            let archiveApplications = 0

            // При каждом проходе цикла, в результате СОВПАДЕНИЯ  значение переменной-счётчика будет увеличиваться на единицу.  

            // Например, нужно посчитать - сколько в МАССИВЕ объектов находится заявок со статусом "Завершённые"
            // Для этого устанавливаем переменную let counterComleteApplications = 0 , затем проходим циклом и ищем заявки со статусом "Завершенные". При ПЕРВОЙ такой найденной заявке - переменная counterComleteApplications станет равной 1. И так далее
            arrayObjectsFromLS.forEach(function(item) {

            //  // Условие для --- Все заявки
                if(item.hasOwnProperty("status")) {
                    allApplications++
                }

                // Условие для    Новые заявки
                if(item.status == "Новые") {
                    newApplications++
                }

                // Условие для    В работе   заявки
                if(item.status == "В работе") {
                    inWorkApplications++
                }

                // Условие для    Завершённые   заявки
                if(item.status == "Завершённые") {
                    completeApplications++
                }

                // Условие для    Архив   заявки
                if(item.status == "Архивные") {
                    archiveApplications++
                }
            })
            // ------------------------------- // Конец цикла -----------------------------------------

            // Теперь получаем HTML элементы со страницы - БЕЙДЖИ-счётчики. И в их содержимое прописываем значения наших ПЕРЕМЕННЫХ-СЧЁТЧИКОВ
            // НО! Прописываем условие!  Если переменная-счётчик БОЛЬШЕ 0, то только в таком случае мы ВИЗУАЛЬНО ПОКАЗЫВАЕМ БЕЙДЖ

            // Все заявки.    Если значение переменной больше нуля, то визуально отображаем БЕЙДЖ-счётчик
            if(allApplications > 0) {
                let badgeAllApplications = document.querySelector('[data-counter-all-applications]')
                badgeAllApplications.style.visibility = "visible"
                badgeAllApplications.innerHTML = allApplications
            }

            // Новые заявки.    Если значение переменной больше нуля, то визуально отображаем БЕЙДЖ-счётчик
            if(newApplications > 0) {
                let badgeNewApplications = document.querySelector('[data-counter-new-applications]')
                badgeNewApplications.style.visibility = "visible"
                badgeNewApplications.innerHTML = newApplications
            }

            // В работе заявки.    Если значение переменной больше нуля, то визуально отображаем БЕЙДЖ-счётчик
            if(inWorkApplications > 0) {
                let badgeInWorApplications = document.querySelector('[data-counter-in-work-applications]')
                badgeInWorApplications.style.visibility = "visible"
                badgeInWorApplications.innerHTML = inWorkApplications
            }

            // Завершённые заявки.    Если значение переменной больше нуля, то визуально отображаем БЕЙДЖ-счётчик
            if(completeApplications > 0) {
                let badgeCompleteApplications = document.querySelector('[data-counter-complete-applications]')
                badgeCompleteApplications.style.visibility = "visible"
                badgeCompleteApplications.innerHTML = completeApplications
            }

            // Архивные заявки.    Если значение переменной больше нуля, то визуально отображаем БЕЙДЖ-счётчик
            if(archiveApplications > 0) {
                let badgeArchiveApplications = document.querySelector('[data-counter-archive-applications]')
                badgeArchiveApplications.style.visibility = "visible"
                badgeArchiveApplications.innerHTML = archiveApplications
            }                

        }
    }
    // Функция срабатывает каждый раз при загрузке 2 и 3 страницы

    // -----------------------------------------  // ФУНКЦИЯ ОТРИСОВКИ ЗНАЧЕНИЙ СЧЁТЧИКОВ ( И НА 2, И НА 3 СТРАНИЦЕ)--------------------------------------------


    // Возвращаем наружу для использования в КОНТРОЛЛЕРЕ
    return {
        updateValueOfCounter: updateValueOfCounter,  // Функция - которая визуально показывает СЧЁТЧИКИ заявок в левой синей панели
        getDomStrings: function() {                 // Функция возвращает объект с СЕЛЕКТОРАМИ
            return DOMstrings;             
        }
    };
})();


