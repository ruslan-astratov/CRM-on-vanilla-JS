// --------------------------------------------------------- Шаблон ТАБЛИЦЫ ---------------------------- Здесь ОПИСЫВАЮТСЯ функции, которые вызываются в контроллере
var viewTableController = (function() {

    // Объект с СЕЛЕКТОРАМИ , со страницы Таблица заявок
    var DOMstrings = {
        wrapperTabs: "[data-wrapper-tabs]",                       // Обёртка табов-фильтров (Все/ новые/ в работе...)
        selectAllProducts: "[data-select]",                       // Селект Все продукты
        containerApplications: "[data-container-applications]",    // Контейнер с заявками
        buttonDeleteAllApplications: "[data-delete-button]"       // Кнопка Удалить ВСЕ ЗАЯВКИ
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

    // --------------------------------------- ПРИ ЗАГРУЗКЕ СТРАНИЦЫ ПРОБУЕМ ПОЛУЧИТЬ данные из localStorage -------------------------------
    function getDataFromLS() {

        let arrayOfObjectsFromLS = localStorage.getItem("clients application"); 

        if(arrayOfObjectsFromLS) {

            // Распарсим данные из localStorage в массив arrFromLocalStorage/ Сделаем JSON-строку обычным массивом, с которым далее можно будет работать
            let arrFromLocalStorage = JSON.parse(arrayOfObjectsFromLS); // Теперь arrFromLocalStorage  - МАССИВ объектов

            // Как рещультат, наружу мы вернём готовый МАССИВ объектов. Затем его передадим как аргумент функции  renderApplications, которая отрисует заявки
            // по каждому элементу массива
            return arrFromLocalStorage
        }
    }
    // ------------------------------------ // ПРИ ЗАГРУЗКЕ СТРАНИЦЫ ПРОБУЕМ ПОЛУЧИТЬ данные localStorage ------------------------------------

    // ------------------- Если функцией выше -- getDataFromLS() , данные из localStorage были получены, то РЕНДЕРИМ по этим данным ЗАЯВКИ на страницу---- 
    function renderApplications(resultFunctionGetDataFromLS) {

        // Так как resultFunctionGetDataFromLS - это массив, то обработаем его в ЦИКЛЕ. Пройдёмся по каждому элементу массива и для каждого создадим HTML разметку,
        // которую вставим в КОНТЕЙНЕР ЗАЯВОК , то есть визуально отобразим заявки на странице

        resultFunctionGetDataFromLS.forEach(function(item) {

            // item - это каждый ОБЪЕКТ в массиве объектов

            // Создадим переменные, которые будем подставлять в HTML шаблон заявки
            // ID заявки
            let idApplication = item.ID;

            // Дата создания заявки.   В формате "Заявка была заполнена в 13 час. 58 мин. - 17 10 2020 гг. "     
            // Дату нужно обработать! 
            let dataApplication = item.whenItWasFilled;

            // Разобьём строку с датой на массив.  Теперь в arrayFromStringData лежит МАССИВ с отдельными словами
            let arrayFromStringData = dataApplication.split(' ');

            let dayData = arrayFromStringData[11]

            let monthData = arrayFromStringData[12]

            let yearData = arrayFromStringData[13]

            //------------------------ Итоговый вариант строки с датой, которая попадёт в HTML код заявки
            let newStringData = `${dayData}.${monthData}.${yearData}`;

           

            // Выбранный продукт  (Курс по Верстке...)
            let selectProductApplication = item.selectValue;

            // ИмяФамилия из заявки
            let userNameSurnameApplication = item.NameSurnameValue;

            // Почта из заявки
            let emailApplication = item.EmailValue;

            // Телефон из заявки
            let telephoneApplication = item.TelValue;

            // Временной статус из заявки  (Новые/ Завершённые / Архивные)
            let statusApplication = item.status;

            // Объявим переменную. Сейчас она ПУСТА! Но В ней чуть позже будет находиться название класса, который мы присвоим заявке (например - badge-danger)
            // Этот класс окрасит заявку в  цвет, который соответствует её статусу (Новые/ Завершённые / Архивные)
            let colorOfStatusApplication

            //----------- Условие: если статус заявки (statusApplication) = "Новая", то в переменную запишется класс - badge-danger. И так далее

            if(statusApplication == "Новые") {
                colorOfStatusApplication = "badge-danger"
            } 
            else if(statusApplication == "В работе") {
                colorOfStatusApplication = "badge-warning"
            }
            else if(statusApplication == "Завершённые") {
                colorOfStatusApplication = "badge-success"
            }
            else if(statusApplication == "Архивные") {
                colorOfStatusApplication = "badge-arhive"
            }


            // ----------------------------------------- Создаём HTML  шаблон заявки + рисуем на странице -------------------------------------------------------
            let applicationHTML = `<tr data-application="${statusApplication}" data-product="${selectProductApplication}">
                                        <th scope="row">${idApplication}</th>
                                        <td>${newStringData}</td>
                                        <td>${selectProductApplication}</td>
                                        <td>${userNameSurnameApplication}</td>
                                        <td>${emailApplication}</td>
                                        <td>${telephoneApplication}</td>
                                        <td>
                                            <div class="badge badge-pill ${colorOfStatusApplication}">
                                            ${statusApplication}
                                            </div>
                                        </td>
                                        <td>
                                            <a href="03-crm-edit-bid.html">Редактировать</a>
                                        </td>
                                    </tr>`;



            // Физически вставляем каждую созданную HTML заявку - в КОНТЕЙНЕР заявок
            // insert.Adjacent
            document.querySelector(DOMstrings.containerApplications).insertAdjacentHTML('beforeEnd', applicationHTML);


            // ------------------- СКРОЕМ КНОПКУ "РЕДАКТИРОВАТЬ" У ВСЕХ ЗАЯВОК СО СТАТУСОМ "АРХИВНЫЕ"  ---------------------------

            // После того, как вставили в разметку все  "Архивные" элементы, и  перебираем в ЦИКЛЕ.  Удаляем  у каждой неё кнопку "Редактировать"
            document.querySelectorAll('[data-application="Архивные"]').forEach(function(item) {
                item.querySelector('[href="03-crm-edit-bid.html"]').style.visibility = "hidden"
            })

            // -------------------//  СКРОЕМ КНОПКУ "РЕДАКТИРОВАТЬ" У ВСЕХ ЗАЯВОК СО СТАТУСОМ "АРХИВНЫЕ"  ---------------------------


        })
    }
    // ------------------- //------------------ РЕНДЕРИМ по этим данным ЗАЯВКИ на страницу -------------------------


    // --------------------------------- ---------ФИЛЬТР ПО СЕЛЕКТУ. Описание функции ----------------------------------------------------------------
    function filterFromSelect() {

        // При совершении события - получаем весь КОНТЕЙНЕР с ЗАЯВКАМИ.                         И в нём ищем/получаем ВСЕ заявки
        let allApplictions = document.querySelector(DOMstrings.containerApplications)

        // После изменения  СЕЛЕКТА - console.log Будет выводить последнее значение селекта, т.к. this ссылается на СЕЛЕКТ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // console.log(this.value)  


        // Находим АКТИВНЫЙ ТАБ и смотрим его дата-атрибут.  Потом в цикле проверяем каждую ЗАЯВКУ: соответствует ли её статус дата-атрибуту АКТИВНОГО ТАБА?
        let activeTAB = document.querySelector(DOMstrings.wrapperTabs).querySelector(".btn-light--active")
        // И если соответствует, то заявки, удовлетворившие условию , показываем, а остальные скрываем

        // Получаем ЗНАЧЕНИЕ АТРИБУТА data-tab у найденного АКТИВНОГО ТАБА
        let valueOfDataAttrActiveTab = activeTAB.dataset.tab

        //----------------------------- Если в СЕЛЕКТЕ мы выбрали "Курс по верстке",                 то берём ВСЕ наши заявки и СКРЫВАЕМ их,
        //  а затем показываем только те, которые соответствуют условию - "Курс по верстке"
        if(this.value == "Курс по верстке") {

            // Привязка контекста сработала!!!
            (() => {

                 //                                            Скрываем ВСЕ заявки
                allApplictions.querySelectorAll("[data-application]").forEach(function(item) {
                    item.style.display = "none"
                })

                
                // В цикле обходим каждую ЗАЯВКУ и... проверяем её по условию
                allApplictions.querySelectorAll(`[data-product="${this.value}"]`).forEach(function(item) {

                    // ... проверяем её по условию: если СТАТУС заявки соответствует значению дата атрибута ТАБА (Все/Новые..) - показываем заявку, если нет - скрываем её
                    if(item.dataset.application == valueOfDataAttrActiveTab) {
                        item.style.display = "table-row"
                    }
                    // Если АКТИВНЫЙ ТАБ == "Все", тогда Заявку тоже показываем
                    else if(valueOfDataAttrActiveTab == "Все"){
                        item.style.display = "table-row"
                    }
                    else {
                        item.style.display = "none"
                    }

                })

            })()


        }

        //------------- Если выбрали в селекте  - "Курс по JavaScript"
        else if(this.value == "Курс по JavaScript") {
            (() => {

                //                                            Скрываем ВСЕ заявки
               allApplictions.querySelectorAll("[data-application]").forEach(function(item) {
                   item.style.display = "none"
               })

               
               // В цикле обходим каждую ЗАЯВКУ и... проверяем её по условию
               allApplictions.querySelectorAll(`[data-product="${this.value}"]`).forEach(function(item) {

                   // ... проверяем её по условию: если СТАТУС заявки соответствует значению дата атрибута ТАБА (Все/Новые..) - показываем заявку, если нет - скрываем её
                   if(item.dataset.application == valueOfDataAttrActiveTab) {
                       item.style.display = "table-row"
                   }
                   // Если АКТИВНЫЙ ТАБ == "Все", тогда Заявку тоже показываем
                   else if(valueOfDataAttrActiveTab == "Все"){
                       item.style.display = "table-row"
                   }
                   else {
                       item.style.display = "none"
                   }

               })

           })()
        }
        //-------------- Если выбрали в селекте  - "Курс по VUE JS"
        else if(this.value == "Курс по VUE JS") {
            (() => {

                //                                            Скрываем ВСЕ заявки
               allApplictions.querySelectorAll("[data-application]").forEach(function(item) {
                   item.style.display = "none"
               })

               
               // В цикле обходим каждую ЗАЯВКУ и... проверяем её по условию
               allApplictions.querySelectorAll(`[data-product="${this.value}"]`).forEach(function(item) {

                   // ... проверяем её по условию: если СТАТУС заявки соответствует значению дата атрибута ТАБА (Все/Новые..) - показываем заявку, если нет - скрываем её
                   if(item.dataset.application == valueOfDataAttrActiveTab) {
                       item.style.display = "table-row"
                   }
                   // Если АКТИВНЫЙ ТАБ == "Все", тогда Заявку тоже показываем
                   else if(valueOfDataAttrActiveTab == "Все"){
                       item.style.display = "table-row"
                   }
                   else {
                       item.style.display = "none"
                   }

               })

           })()
        }

                //-------------- Если выбрали в селекте  - "Курс по PHP"
        else if(this.value == "Курс по PHP") {
            (() => {

                //                                            Скрываем ВСЕ заявки
               allApplictions.querySelectorAll("[data-application]").forEach(function(item) {
                   item.style.display = "none"
               })

               
               // В цикле обходим каждую ЗАЯВКУ и... проверяем её по условию
               allApplictions.querySelectorAll(`[data-product="${this.value}"]`).forEach(function(item) {

                   // ... проверяем её по условию: если СТАТУС заявки соответствует значению дата атрибута ТАБА (Все/Новые..) - показываем заявку, если нет - скрываем её
                   if(item.dataset.application == valueOfDataAttrActiveTab) {
                       item.style.display = "table-row"
                   }
                   // Если АКТИВНЫЙ ТАБ == "Все", тогда Заявку тоже показываем
                   else if(valueOfDataAttrActiveTab == "Все"){
                       item.style.display = "table-row"
                   }
                   else {
                       item.style.display = "none"
                   }

               })

           })()
        }
        //-------------- Если выбрали в селекте  - "Курс по WordPress"
        else if(this.value == "Курс по WordPress") {
            (() => {

                //                                            Скрываем ВСЕ заявки
               allApplictions.querySelectorAll("[data-application]").forEach(function(item) {
                   item.style.display = "none"
               })

               
               // В цикле обходим каждую ЗАЯВКУ и... проверяем её по условию
               allApplictions.querySelectorAll(`[data-product="${this.value}"]`).forEach(function(item) {

                   // ... проверяем её по условию: если СТАТУС заявки соответствует значению дата атрибута ТАБА (Все/Новые..) - показываем заявку, если нет - скрываем её
                   if(item.dataset.application == valueOfDataAttrActiveTab) {
                       item.style.display = "table-row"
                   }
                   // Если АКТИВНЫЙ ТАБ == "Все", тогда Заявку тоже показываем
                   else if(valueOfDataAttrActiveTab == "Все"){
                       item.style.display = "table-row"
                   }
                   else {
                       item.style.display = "none"
                   }

               })

           })()
        }

        //-------------- Если выбрали в селекте  - "Все продукты"
        else if(this.value == "Все продукты") {

            (() => {

                //                                            Скрываем ВСЕ заявки
               allApplictions.querySelectorAll("[data-application]").forEach(function(item) {
                   item.style.display = "none"
               })

               
               // В цикле обходим каждую ЗАЯВКУ и... проверяем её по условию
               allApplictions.querySelectorAll(`[data-product]`).forEach(function(item) {

                   // ... проверяем её по условию: если временной СТАТУС заявки соответствует значению дата атрибута ТАБА - (Все/Новые..) - показываем заявку, если нет - скрываем её
                   if(item.dataset.application == valueOfDataAttrActiveTab) {
                       item.style.display = "table-row"
                   }
                   // Если АКТИВНЫЙ ТАБ == "Все", тогда Заявку тоже показываем
                   else if(valueOfDataAttrActiveTab == "Все"){
                       item.style.display = "table-row"
                   }
                   else {
                       item.style.display = "none"
                   }

               })

           })()
        }
    }
    // --------------------------------- ---------// ФИЛЬТР ПО СЕЛЕКТУ. Описание функции ----------------------------------------------------------------


    // ------------------------------------------------- ДАЁМ АКТИВНЫЙ КЛАСС ----------------
    // -------------------- По клику на любой таб - даём этому Табу активный класс. Внизу в return вернём эту функцию наружу для использования в контроллере
    function giveTabActiveClass(e) {

        // Если клик произошёл именно по табу (имеет общий для табов атрибут - data-tab ), то
        if(e.target.closest("[data-tab]")) {

            // Получаем родительскую ОБЁРТКУ табов,затем  находим в ней ВСЕ табы (запишем их коллекцию в переменную tabs)  и...
            let tabs = e.target.closest("[data-wrapper-tabs]").querySelectorAll("[data-tab]");

            //... и УДАЛЯЕМ у них ВСЕХ активный класс
            tabs.forEach(function(item) {
                item.classList.remove("btn-light--active")
            })

            // а для конкретного e.target  - даём активный класс
            e.target.closest("[data-tab]").classList.add("btn-light--active")
        }
    }
    // --------------------// По клику на любой таб - даём этому Табу активный класс. Внизу в return вернём эту функцию наружу для использования в контроллере


    //------------------------  АВТОМАТИЧЕСКАЯ ФИЛЬТРАЦИЯ ЗАЯВОК по АКТИВНОМУ КЛАССУ ТАБА. ПРИ ЗАГРУЗКЕ СТРАНИЦЫ.  Ищем ТАБ с АКТ классом---------
    // Скрипт, который будет срабатывать КАЖДЫЙ раз при загрузке/перезагрузке страницы (К этому моменту все данные с localStorage стянули и отрисовали заявки)
    // Смотрим:  В зависимости от того, на каком ТАБЕ стоит активный класс, мы показываем соответствующие этому классу заявки
    // Например, если активный класс  (.btn-light--active)  --  стоит на ТАБе "Завершённые" , тогда на экране показываем ТОЛЬКО "Завершённые" заявки

    //                                 обёртка  табов    контейнер  заявок
    function filterApplicationsOnLoading(wrapperTabs, containerApplications) {

        // В ОБЁРТКЕ табов  пытаемся найти таб, имеющий АКТИВНЫЙ класс И общий для табов атрибут [data-tab].  То есть пытаемся найти таб [data-tab] с активным классом
        let resultSearchingActiveTab = wrapperTabs.querySelector(".btn-light--active[data-tab]")

        // ...Если такой находим, то
        if(resultSearchingActiveTab) {

            // Записываем в переменную  значение атрибута именно этого АКТИВНОГО таба. Если АКТ класс стоял на табе "Все", то в переменную запишется СТРОКА "Все"
            let valueDataAttributeActiveTab = resultSearchingActiveTab.dataset.tab

            // Если АКТИВНЫЙ таб - это "Все", 
            if(valueDataAttributeActiveTab == "Все") {

                //   то визуально отображаем совершенно все заявки, независимо от их статуса
                containerApplications.querySelectorAll(`[data-application]`).forEach(function(item) {
                    item.style.display = "table-row"
                })
            } 
            // Если АКТИВНЫЙ таб - это "Новые"
            else if(valueDataAttributeActiveTab == "Новые") {

                // ... То сначала скрываем вообще ВСЕ заявки
                containerApplications.querySelectorAll(`[data-application]`).forEach(function(item) {
                    item.style.display = "none"
                })

                //   , и делаем видимыми только те заявки, которые имеют статус Новые
                containerApplications.querySelectorAll(`[data-application="Новые"]`).forEach(function(item) {
                    item.style.display = "table-row"
                })

                
            } 
            // Если АКТИВНЫЙ таб - это "В работе"
            else if(valueDataAttributeActiveTab == "В работе") {

                // ... То сначала скрываем вообще ВСЕ заявки
                containerApplications.querySelectorAll(`[data-application]`).forEach(function(item) {
                    item.style.display = "none"
                })

                //   , и делаем видимыми только те заявки, которые имеют статус "В работе"
                containerApplications.querySelectorAll(`[data-application="В работе"]`).forEach(function(item) {
                    item.style.display = "table-row"
                })

                
            } 
            // Если АКТИВНЫЙ таб - это "Завершенные"
            else if(valueDataAttributeActiveTab == "Завершённые") {

                // ... То сначала скрываем вообще ВСЕ заявки
                containerApplications.querySelectorAll(`[data-application]`).forEach(function(item) {
                    item.style.display = "none"
                })

                //   , и делаем видимыми только те заявки, которые имеют статус "Завершенные"
                containerApplications.querySelectorAll(`[data-application="Завершённые"]`).forEach(function(item) {
                    item.style.display = "table-row"
                })

            } 
            // Если АКТИВНЫЙ таб - это "Архивные"
            else if(valueDataAttributeActiveTab == "Архивные") {

                // ... То сначала скрываем вообще ВСЕ заявки
                containerApplications.querySelectorAll(`[data-application]`).forEach(function(item) {
                    item.style.display = "none"
                })

                //   , и делаем видимыми только те заявки, которые имеют статус "В работе"
                containerApplications.querySelectorAll(`[data-application="Архивные"]`).forEach(function(item) {
                    item.style.display = "table-row"
                })
            } 
        }
        // --- // Конец условного блока
    }
    //---------------------//  АВТОМАТИЧЕСКАЯ ФИЛЬТРАЦИЯ ЗАЯВОК по АКТИВНОМУ КЛАССУ ТАБА. ПЕРВАЯ ФИЛЬТРАЦИЯ---------------------------------------------------------




    //--------------- ПОВТОРНАЯ ФИЛЬТРАЦИЯ.- Здесь описана функция, которая при КЛИКЕ на ТАБ: посмотрит на выбранную ОПЦИЮ в СЕЛЕКТЕ и второй раз отфильтрует заявки
    function filterApplicationsOnSelect() {

        // Получаем ОБЁРТКУ над ТАБами, а в ней ищем АКТИВНЫЙ ТАБ,  и берём у него значение временного атрибута  ("Все" /"Новые"/"В работе")
        let valueOfDataAttrActiveTab = document.querySelector(DOMstrings.wrapperTabs).querySelector(".btn-light--active").dataset.tab
        // console.log("Получаем временной атрибут активного ТАБа", activTAB)

        

        //  Получаем  значение СЕЛЕКТА     , чтобы потом             по нему фильтровать  имеющиеся ЗАЯВКИ
        let selectValue = document.querySelector(DOMstrings.selectAllProducts).value
        // console.log("Получаем значение СЕЛЕКТА", selectValue)

        // Получаем все ЗАЯВКИ, которые отображены на данный момент в таблице --   получаем их в виде нодлиста
        let allCurrentApplications = document.querySelectorAll("[data-application]")      // Где [data-application] - это вообще все заявки, без разбора
        // console.log("Получили ВСЕ ЗАЯВКИ - показанные на текущий момент", allCurrentApplications)

        //---------------------------------- Перебираем ЦИКЛОМ все заявки и прогоняем их через УСЛОВИЯ ---------------------------------------------
        allCurrentApplications.forEach(function(item) {

            // Если дата-атрибут продукта = селекту  И  дата-атрибут Времени itemа  ==  атрибуту ТАБа (Все/Новые и т.д) то
            if(item.dataset.product == selectValue && item.dataset.application == valueOfDataAttrActiveTab) {

                item.style.display = "table-row"
            } 
            
            //    значение селекта == "Все продукты"  И   дата атрибут времени ТАБа == значение временного атрибута ТАба
            else if(selectValue == "Все продукты" && item.dataset.application == valueOfDataAttrActiveTab) {

                item.style.display = "table-row"

            } 

            // --------- Показывает все заявки при   СЕЛЕКТ = "Все продукты"  и ТАБ = Все
            else if(selectValue == "Все продукты" && valueOfDataAttrActiveTab == "Все") {
                item.style.display = "table-row"
            }

            // "Курс по верстке"  
            else if(selectValue == "Курс по верстке" && valueOfDataAttrActiveTab == "Все" && item.dataset.product == "Курс по верстке") {
                item.style.display = "table-row"
            }

            // "Курс по JavaScript"
            else if(selectValue == "Курс по JavaScript" && valueOfDataAttrActiveTab == "Все" && item.dataset.product == "Курс по JavaScript") {
                item.style.display = "table-row"
            }

            // "Курс по VUE JS"
            else if(selectValue == "Курс по VUE JS" && valueOfDataAttrActiveTab == "Все" && item.dataset.product == "Курс по VUE JS") {
                item.style.display = "table-row"
            }
            
            // "Курс по PHP"
            else if(selectValue == "Курс по PHP" && valueOfDataAttrActiveTab == "Все" && item.dataset.product == "Курс по PHP") {
                item.style.display = "table-row"
            }

            // "Курс по WordPress"
            else if(selectValue == "Курс по WordPress" && valueOfDataAttrActiveTab == "Все" && item.dataset.product == "Курс по WordPress") {
                item.style.display = "table-row"
            }

            else {
                item.style.display = "none"
            }
        })
    }
    //---------------------- // ПОВТОРНАЯ ФИЛЬТРАЦИЯ.---  Здесь описана функция, которая: посмотрит на выбранную ОПЦИЮ в СЕЛЕКТЕ и второй раз отфильтрует заявки


    // Возвращаем наружу для использования в КОНТРОЛЛЕРЕ
    return {
        getDataFromLS: getDataFromLS,                               // Функция должна вернуть МАССИВ объектов из localStorage при загрузке страницы 
        renderApplications: renderApplications,                     // Функция отрисовывает/рендерит ЗАЯВКИ на странице, на основе того, что вернула getDataFromLS 

        updateValueOfCounter: updateValueOfCounter,                 // Функция - которая визуально показывает СЧЁТЧИКИ заявок в левой синей панели
        filterApplicationsOnSelect: filterApplicationsOnSelect,     // Функция - ВТОРОЙ фильтр ПО КЛИКУ на ТАБ (но смотрит на ЗНАЧЕНИЕ в СЕЛЕКТЕ)
        filterFromSelect: filterFromSelect,                         // Функция - ПЕРВЫЙ фильтр - чисто ПО СЕЛЕКТУ (тот, что в правом верхнем углу на второй странице)
        filterApplicationsOnLoading: filterApplicationsOnLoading,   // Функция возвращает метод -  в зависимости от того, на каком табе акт-ый класс, фильтруем заявки
        giveTabActiveClass: giveTabActiveClass,                     // Функция возвращает метод -  ЗАДАТЬ табу актвный класс при клике
        getDomStrings: function() {                                 // Функция возвращает объект с СЕЛЕКТОРАМИ
            return DOMstrings;             
        }
    };


})();


