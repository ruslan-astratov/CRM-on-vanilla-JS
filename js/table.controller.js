// ------------------------------------------------ КОНТРОЛЛЕР ВТОРОЙ СТРАНИЦЫ -----------------------

//                                МОДЕЛЬ      ШАБЛОН
var tableController = (function (modelCtrl, viewCtrl) {

    //----- В  setupEventListeners будут находиться все обработчики событий, которые есть на этой странице, и функции, которые будут запущены при загрузке страницы
    let setupEventListeners = function(){

        // // Получаем объект со ВСЕМИ нужными для работы селекторами. 
        let DOM = viewCtrl.getDomStrings(); 

        // в DOM  получили : 
        // // Объект с СЕЛЕКТОРАМИ , со страницы Таблица заявок

        // var DOMstrings = {
        //     wrapperTabs: "[data-wrapper-tabs]",                       // Обёртка табов-фильтров (Все/ новые/ в работе...)
        //     selectAllProducts: "[data-select]",                       // Селект Все продукты
        //     containerApplications: "[data-container-applications]",    // Контейнер с заявками
        //     buttonDeleteAllApplications: "[data-delete-button]"       // Кнопка Удалить ВСЕ ЗАЯВКИ
        // };

        // // Только Обёртка табов
        let wrapperTabs = document.querySelector(DOM.wrapperTabs)

        // Только сам Контейнер с заявками
        let containerApplications = document.querySelector(DOM.containerApplications)

        // Получаем КНОПКУ УДАЛИТЬ ВСЕ ЗАЯВКИ
        let buttonDeleteAllApplications = document.querySelector(DOM.buttonDeleteAllApplications)
        

        // --------------------------------- СРАБАТЫВАЕТ ФУНКЦИЯ ОТРИСОВКИ ЗНАЧЕНИЙ СЧЁТЧИКОВ ( И НА 2, И НА 3 СТРАНИЦЕ)--------------------------------------------

        viewCtrl.updateValueOfCounter()

        // -------------------------------//СРАБАТЫВАЕТ ФУНКЦИЯ ОТРИСОВКИ ЗНАЧЕНИЙ СЧЁТЧИКОВ ( И НА 2, И НА 3 СТРАНИЦЕ)--------------------------------------------


        // ---------------------------------- ФУНКЦИЯ КОТОРАЯ СРАБАТЫВАЕТ ПРИ ПЕРЕХОДЕ С 3 НА 2 СТРАНИЦУ    -----------------------------
        // -----------------------------------   ТАБ "АРХИВНЫЕ"  ДЕЛАЕТСЯ АКТИВНЫМ!!!! -----------------------------------------
        // Функция, которая даёт АКТИВНЫЙ класс табу "Архивные" - в случае, если мы действительно попали на вторую страницу по ссылке с третьей страницы

        function giveActiveClassArchiveTab(wrapperTabs) {
                //    Пытаемся получить запись из localStorage -по ключу  "go to the second page after deleting it in the archive"  - о том, что мы действительно переходили на 2 страницу после того как на 3 нажали "УДАЛИТЬ В АРХИВ"
    
                let isTransitionFromThirdPage = JSON.parse(localStorage.getItem("go to the second page after deleting it in the archive")); 
                
                if(isTransitionFromThirdPage) {
    
                    
                    // Где-то здесь даём ТАБУ активный класс
                    wrapperTabs.querySelectorAll('[data-tab]').forEach(function(item) {
                        item.classList.remove("btn-light--active")

                        if(item.dataset.tab == "Архивные") {
                            item.classList.add("btn-light--active")
                        }
                    })
    
                    // В конце - удаляем  из localStorage запись по ключу "go to the second page after deleting it in the archive"
                    // localStorage.remove('go to the second page after deleting it in the archivedelete');
                    localStorage.removeItem('go to the second page after deleting it in the archive');
                }
    
            }
            // Запускаем функцию
            giveActiveClassArchiveTab(wrapperTabs)
        // ----------------------------------//  ФУНКЦИЯ КОТОРАЯ СРАБАТЫВАЕТ ПРИ ПЕРЕХОДЕ С 3 НА 2 СТРАНИЦУ    -----------------------------



        //-------------------------  Здесь сработает функция УДАЛИТЬ ВСЕ ЗАЯВКИ.  ---------------------------------------------
        // Сначала функция удалит ВСЕ заявки из localStorage, а затем принудительно перезагрузит страницу

        // Вешаем на кнопку УДАЛИТЬ    обработчик события по КЛИКУ: 
        buttonDeleteAllApplications.addEventListener('click', deleteAllApplications);

        function deleteAllApplications() {

            // Сначала сработает функция, которая удалит ВСЕ заявки из LOCALSTORAGE.                   Эта функция описана в МОДЕЛИ
            modelCtrl.deleteAllAppFromLocalStorage()

            // Затем сработает другая функция, которая принудительно ПЕРЕЗАГРУЗИТ страницу и визуально очистит страницу
            window.location.reload()
        }

        //------------------------- // Здесь сработает функция УДАЛИТЬ все ЗАЯВКИ-------------------------------------

        // ----------------- Описано---- СОБЫТИЕ - при клике на РЕДАКТИРОВАТЬ ---------------------------------
        // Вешаем событие по клику на ВЕСЬ контейнер с заявками. Делаем делегирование 
        containerApplications.addEventListener('click', saveThisApplicationForEdit);

        // Собственно - описание функции , которая срабатывает при клике
        function saveThisApplicationForEdit(e) {
            if(e.target.innerHTML == "Редактировать") {

                e.preventDefault()

                // Здесь создаём ПОКА ПУСТОЙ объект, в который будем набивать данные  стянутые из ОБЪЕКТА  (в массиве объектов)!!!
                let dataFromThisApplForEdit = {

                    //--------------------------- --Здесь должны быть свойства.  Их мы набьём чуть позже
                    // EmailValue: "ruslan.astratov@yandex.ru"
                    // ID: 1
                    // NameSurnameValue: "Мария Треногина"
                    // TelValue: "+79186765060"
                    // selectValue: "Курс по верстке"
                    // status: "Новые"
                    // whenItWasFilled: "Заявка была заполнена в 15 час. 12 мин. - 18 10 2020 гг. "
                    
                }


                // Поднимаемся вверх - к самой заявке , и собираем с неё ID, и этот ID записываем в переменную
                let thisApplicationID = e.target.closest("[data-application]").querySelector('[scope="row"]').innerHTML

                // ПОЛУЧАЕМ и ПАРСИМ данные из localStorage в массив arrFromLocalStorage/ Сделаем JSON-строку обычным массивом, с которым далее можно будет работать 
                //готовый к работе МАССИВ объектов из localStorage -- перебирая его циклом, находим там нужную заявку по ID , который мы получили ранее
                var arrFromLocalStorage = JSON.parse(localStorage.getItem("clients application"));

                // console.log(arrFromLocalStorage)

                // Перебираем все объекты МАССИВА объектов и набиваем нашему пустому ОБЪЕКТУ  dataFromThisApplForEdit свойства 
                arrFromLocalStorage.forEach(function(item) {

                    // Если ID объекта в МАССИВЕ объектов совпала с ID той заявки, у которой мы нажали РЕДАКТИРОВАТЬ, то -- 
                    if(item.ID == thisApplicationID) {

                        dataFromThisApplForEdit.EmailValue = item.EmailValue

                        dataFromThisApplForEdit.ID = item.ID

                        dataFromThisApplForEdit.NameSurnameValue = item.NameSurnameValue

                        dataFromThisApplForEdit.TelValue = item.TelValue

                        dataFromThisApplForEdit.selectValue = item.selectValue

                        dataFromThisApplForEdit.status = item.status

                        dataFromThisApplForEdit.whenItWasFilled = item.whenItWasFilled
                    }
               })


                console.log(dataFromThisApplForEdit)

                // Когда сФормировали ОБЪЕКТ с данными --  сохраняем его в localstorage под отдельным ключом(!!!). Этот объект мы потом получим, но уже перейдя на 3 страницу!!
                localStorage.setItem("dataOfThisApplicationForEdit", JSON.stringify(dataFromThisApplForEdit));

                // Собственно теперь можем перейти на другую страницу. Делаем ПЕРЕХОД на страницу принудительно
                window.location.href = '03-crm-edit-bid.html'

            }
        }
        // -----------------// Здесь должно сработать СОБЫТИЕ - при клике на РЕДАКТИРОВАТЬ ---------------------------------


        // ------------------- -----ПОЛУЧЕНИЕ ДАННЫХ ИЗ localStorage и ОТРИСОВКА + ФИЛЬТРАЦИЯ   заявок на странице ----------------------------------------
        // Где - то здесь мы должны выдернуть ДАННЫЕ из localStorage!!!!!!!!!!!!!!!!!!!!!!!!!!  и отрендерить на страницу заявки из localStorage
        // Вызывается функция, которая получает из localStorage массив с данными и отрисовывает по этим данным ЗАЯВКИ на странице. 

        function getDataAndRenderApplicationsFromLocalStorage() {

            // Если в localStorage что-то есть, то срабатывает функция, достающая данные из localStorage. Она в return возвращает МАССИВ объект. Его мы передаём другой функции
             if(viewCtrl.getDataFromLS()) {

                // Сюда запишется уже готовый МАССИВ объектов
                let resultFunctionGetDataFromLS = viewCtrl.getDataFromLS()
                console.log("В локалстораж что то есть", resultFunctionGetDataFromLS)

                // Вызывается функция, которая на основе данных отрисовывает заявки на странице. Функция описана в ШАБЛОНЕ
                viewCtrl.renderApplications(resultFunctionGetDataFromLS)
            }
        }

        // Вызываем функцию ПОЛУЧЕНИЯ данных из localStorage, и отрисовки по этим данным заявок на странице
        getDataAndRenderApplicationsFromLocalStorage()



        // Здесь срабатывает функция автоматической ФИЛЬТРАЦИИ заявок при ЗАГРУЗКЕ/перезагрузке страницы. Фунция ищет таб с активным классом
        viewCtrl.filterApplicationsOnLoading(wrapperTabs, containerApplications)



        // Находим ОБЁРТКУ с табами-фильтрами (Все/ новые/ в работе...) и вешаем на неё обработчик событий по КЛИКУ
        // При клике сработают ДВЕ(!) функции - функция, дающая табу АКТИВНЫЙ класс (что выделяет его визуально), и функция, которая фильтрует заявки

        document.querySelector(DOM.wrapperTabs).addEventListener('click', runTwoFunctions);

        function runTwoFunctions(e) {

            viewCtrl.giveTabActiveClass(e);   //  функция, дающая табу АКТИВНЫЙ класс
            viewCtrl.filterApplicationsOnLoading(wrapperTabs, containerApplications)  //  функция, которая ПЕРВЫЙ раз - при ЗАГРУЗКЕ страницы, фильтрует заявки

            //------ Здесь должна отработать функция, которая: посмотрит на выбранную ОПЦИЮ в СЕЛЕКТЕ и ВТОРОЙ раз отфильтрует заявки
            viewCtrl.filterApplicationsOnSelect()
        }


        // ------------------------------------------------------- ФИЛЬТР ПО СЕЛЕКТУ-------------------------------------
        // Найдём СЕЛЕКТ и повесим на него обработчик по событию change. При изменении СЕЛЕКТА будет происходить фильтрация ЗАЯВОК. Функция описана в ШАБЛОНЕ!!!
        document.querySelector(DOM.selectAllProducts).addEventListener('change', viewCtrl.filterFromSelect);

    }










    // Возвращаем метод init, чтобы можно было его запустить снаружи
    return {
        init: function(){               // Функция, запускающая программу, то есть запускающая прослушку
            setupEventListeners();
        }
    }

})(modelController, viewTableController);   // Передаём внутрь контроллера как аргументы: МОДЕЛЬ(общую) и ШАБЛОН(таблицы)

// Запускаем программу
tableController.init();






// Заметки на полях:  все функции для МОДЕЛИ и ШАБЛОНА описываются в МОДЕЛИ и ШАБЛОНЕ, но вызываются непосредственно в контроллере, во время срабатывания обработчика события!!

// Если у нас есть отдельный файл с функцией, которая отработала (test-data.js), то мы можем использовать её, просто вызвав, например, в контроллере

// Создавая элементы ДОХОД РАСХОД, было бы неплохо сразу задавать каждому из них индивидуальный id, чтобы персонализировать их (Это понадобится дальше, при написании функций удаления элементов)