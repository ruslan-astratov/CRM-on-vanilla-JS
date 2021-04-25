// ----------------------------------------- КОНТРОЛЛЕР страницы Редактирование заявок ----------------------------------------------------

//                              МОДЕЛЬ     ШАБЛОН
var editController = (function(modelCtrl, uiCtrl) {

    // В этой функции - ВСЕ события, происходящие на третьей странице
    var setupEventListeners = function(){

        var DOM = uiCtrl.getDomStrings(); // Получение объекта с селекторами третьей страницы. 

        // Так выглядит объект в ШАБЛОНЕ 
        // var DOMstrings = {

        //     dataOfID: "[data-ID]",                             // ID: Заявка N
        //     dataTimeOfCreation: "[data-time-of-creation]",     // Дата создания:   2020-04-20 13:52:13
    
        //     selectProducts: "[data-products]",                 // Продукт -  селект
        //     inputName: "[data-name]",                          // Имя
        //     inputEmail: "[data-email]",                        // Мэйл
        //     inputTelephone: "[data-telephone]",                // Телефон
        //     selectStatus: "[data-status]",                     // Статус заявки
    
        //     buttonSaveChanges: "[data-save-changes]",          // Кнопка "Сохранить изменения"
        //     buttonDeleteToArchive: "[data-delete-to-archive]"  // Кнопка "удалить в архив"
    
        // };


                // ---------------------------- СРАБАТЫВАЕТ ФУНКЦИЯ ОТРИСОВКИ ЗНАЧЕНИЙ СЧЁТЧИКОВ ( И НА 2, И НА 3 СТРАНИЦЕ)--------------------------------------------

                uiCtrl.updateValueOfCounter()

                // --------------------------//СРАБАТЫВАЕТ ФУНКЦИЯ ОТРИСОВКИ ЗНАЧЕНИЙ СЧЁТЧИКОВ ( И НА 2, И НА 3 СТРАНИЦЕ)--------------------------------------------


        // --------------------------- ПРИ ПЕРЕХОДЕ НА 3-Ю страницу НАПОЛНЯЕМ форму редактирования данными РЕДАКТИРУЕМОЙ заявки----------------
        //   ПОЛУЧАЕМ ДАННЫЕ из localStorage - по ключу "dataOfThisApplicationForEdit", превращаем строку в JS-объект и  затем вставляем в разметку 
        //----------------- В переменную записываем уже ГОТОВЫЙ для работы ОБЪЕКТ  - то есть те данные, которые затем мы вставим в localStorage
        let receivedDataFromLS = JSON.parse(localStorage.getItem("dataOfThisApplicationForEdit")); 

        // console.log(receivedDataFromLS)

        // ------------------------------------   Теперь создаём переменные -  это будут ЭЛЕМЕНТЫ ФОРМЫ редактирования  ----------                                      

        // Заявка N..
        let dataOfID = document.querySelector(DOM.dataOfID)

        // 2020-04-20 13:52:13
        let dataTimeOfCreation = document.querySelector(DOM.dataTimeOfCreation)
        // console.log(dataTimeOfCreation)

        // Курс по вёрстке/ Курс по JavaScript/...
        // let selectProducts = document.querySelector(DOM.selectProducts).value
        let selectProducts = document.querySelector(DOM.selectProducts)
        // console.log(selectProducts)

        // Пётр
        let inputName = document.querySelector(DOM.inputName)
        // console.log(inputName)

        // petr.vasilyev@yandex.ru
        let inputEmail = document.querySelector(DOM.inputEmail)
        // console.log(inputEmail)

        // 8-938-067-08-00
        let inputTelephone = document.querySelector(DOM.inputTelephone)
        // console.log(inputTelephone)

        //  Новая/В работе (Ожидается оплата)/Завершена (Оплата получена)                   Статус заявки  - значение селекта
        let selectStatus = document.querySelector(DOM.selectStatus)
        // console.log(selectStatus)

        // ---------------------------------- //  Теперь создаём переменные -  это будут ЭЛЕМЕНТЫ ФОРМЫ редактирования  ----------                                      

        // ------------------------------- Теперь ПРИСВАИВАЕМ переменным (то есть элементам формы редактирования)  ЗНАЧЕНИЯ  из объекта receivedDataFromLS ---
        //  то есть перезаписываем переменные, которые мы создали выше

        // Заявка N(значение из объекта)
        dataOfID.innerHTML = `Заявка №${receivedDataFromLS.ID}`

        // Заходим в объект receivedDataFromLS, берём строку с датой ---- "Заявка была заполнена в 8 час. 24 мин. 33 сек. - 19 10 2020 гг. " и записываем в переменную
        let timeString = receivedDataFromLS.whenItWasFilled
        // Теперь разбиваем эту строку на массив слов,  разделитель - пробел. В переменной arr - получили массив СЛОВ
        let arr = timeString.split(' ');
        // console.log(arr)

        //                                                        arr

        //     0        1         2         3    4      5      6     7       8     9      10   11    12     13     14    15

        // ["Заявка", "была", "заполнена", "в", "8", "час.", "24", "мин.", "33", "сек.", "-", "19", "10", "2020", "гг.", ""]

        // Создаём НОВУЮ СТРОКУ. Именно она станет содержимым в элементе "Дата создания:"
                                         
        // В переменной  получим: 2020-04-20 13:52:13
        let newString = `${arr[13]}-${arr[12]}-${arr[11]} ${arr[4]}:${arr[6]}:${arr[8]}`
        // console.log(newString)

        // Теперь в значение формы "Дата создания:" запишем переменную newString
        dataTimeOfCreation.innerHTML = newString
        // console.log(dataTimeOfCreation)

        // Меняем значение СЕЛЕКТА "Продукт:"           на то, что получили в объекте:
        selectProducts.value = receivedDataFromLS.selectValue

        // Меняем значение в ИНПУТЕ ИМЯ  на то, что получили из объекта 
        inputName.value = receivedDataFromLS.NameSurnameValue

        // Меняем значение в ИНПУТЕ ПОЧТА  на то, что получили из объекта 
        inputEmail.value = receivedDataFromLS.EmailValue

        // Меняем значение в ИНПУТЕ ТЕЛЕФОН  на то, что получили из объекта 
        inputTelephone.value = receivedDataFromLS.TelValue

        // Меняем значение в СЕЛЕКТЕ "Статус заявки"  на то, что получили из объекта 
        selectStatus.value = receivedDataFromLS.status

        // ----- -------------------//  ПОДСТАВЛЕНИЕ  ДАННЫХ редактируемой заявки в ФОРМУ для редактирования заявок-----------------------




        // --------------- -------------------СОБЫТИЕ ПРИ КЛИКЕ по кнопке "СОХРАНИТЬ ИЗМЕНЕНИЯ" -------------------------------------------
        //  Получаем кнопку "СОХРАНИТЬ ИЗМЕНЕНИЯ"  и вешаем на неё обработчик события       bind     ПОЗВОЛЯЕТ ПЕРЕДАТЬ АРГУМЕНТ В ОБРАБОТЧИКЕ!!!!
        document.querySelector(DOM.buttonSaveChanges).addEventListener('click', saveChanges.bind(null, receivedDataFromLS));
        
    
        // --- Описана функция, которая сохраняет изменения при клике на кнопку "СОХРАНИТЬ ИЗМЕНЕНИЯ". Внутрь функции передаём ОБЪЕКТ -  ДАННЫЕ из localStorage
        function saveChanges(receivedDataFromLS) {
            // Создаём объект. Он пока пустой, но чуть позже мы наполним его
            let objForLocalStorage = {

            }

            // а) С формы редактирования соберутся все данные  по нашей заявке
            // 
            // Заявка N..
            let dataOfID2 = document.querySelector(DOM.dataOfID)

            // 2020-04-20 13:52:13
            let dataTimeOfCreation2 = document.querySelector(DOM.dataTimeOfCreation)
            // console.log(dataTimeOfCreation)

            // Курс по вёрстке/ Курс по JavaScript/...
            // let selectProducts = document.querySelector(DOM.selectProducts).value
            let selectProducts2 = document.querySelector(DOM.selectProducts)
            // console.log(selectProducts)

            // Пётр
            let inputName2 = document.querySelector(DOM.inputName)
            // console.log(inputName.value)

            // petr.vasilyev@yandex.ru
            let inputEmail2 = document.querySelector(DOM.inputEmail)
            // console.log(inputEmail)

            // 8-938-067-08-00
            let inputTelephone2 = document.querySelector(DOM.inputTelephone)
            // console.log(inputTelephone)

            //  Новая/В работе (Ожидается оплата)/Завершена (Оплата получена)                   Статус заявки  - значение селекта
            let selectStatus2 = document.querySelector(DOM.selectStatus)


            // б) этими данными ЗАПОЛНЯЕТСЯ прежде пустой объект -- objForLocalStorage

            // Перед тем, как в свойство объекта присвоим ID-шник,  нам нужно как-то обработать фразу "Заявка №3" и извлечь из неё цифру
            // В arrID получили ["Заявка", "№3"]
            let arrID = dataOfID2.innerHTML.split(" ")
            // console.log(arrID)

            // ------------------Берём второй элемент массива arrID  -- "№3"   и парсим его в число  3
            let elemArrID =  parseInt(arrID[1][1]) 
            // console.log(elemArrID)


            objForLocalStorage.dataOfID2 = elemArrID


            // Здесь мы должны присвоить ЗНАЧЕНИЮ СВОЙСТВА объекта уже отформатированную запись - "Заявка была заполнена в 10 час. 12 мин. 13 сек. - 19 10 2020 гг. "

            //                                                          0             1
            //                                                      0123456789    01234567
            // В переменную  ar     получим    ["2020-10-19", "10:12:20"]
            let ar = dataTimeOfCreation2.innerHTML.split(" ")                                          //   получим    ["2020-10-19", "10:12:20"]
            // console.log("ВРЕМЯ" , arrDataTimeOfCreation)


            // Лепим новую строку
            // let newStringTimeOfCreation = `Заявка была заполнена в 10 час. 12 мин. 13 сек. - 19 10 2020 гг. `
            let newStringTimeOfCreation = `Заявка была заполнена в ${ar[1][0]}${ar[1][1]} час. ${ar[1][3]}${ar[1][4]} мин. ${ar[1][3]}${ar[1][4]} сек. - ${ar[0][8]}${ar[0][9]} ${ar[0][5]}${ar[0][6]} ${ar[0][0]}${ar[0][1]}${ar[0][2]}${ar[0][3]} гг. `


            objForLocalStorage.dataTimeOfCreation2 = newStringTimeOfCreation

            objForLocalStorage.selectProducts2 = selectProducts2.value

            objForLocalStorage.inputName2 = inputName2.value

            objForLocalStorage.inputEmail2 = inputEmail2.value

            objForLocalStorage.inputTelephone2 = inputTelephone2.value

            objForLocalStorage.selectStatus2 = selectStatus2.value

            // console.log("ЗАПОЛНИЛИ объект перед сохранением в localStorage", objForLocalStorage)

            // --------------------- Теперь наш прежде пустой объект objForLocalStorage ЗАПОЛНЕН и имеет такой вид: 

            // let objForLocalStorage = {
            //     dataOfID2: 3
            //     dataTimeOfCreation2: "Заявка была заполнена в 10 час. 12 мин. 13 сек. - 19 10 2020 гг. "
            //     inputEmail2: "ruslan.astratov@yandex.ru"
            //     inputName2: "Мария Треногина"
            //     inputTelephone2: "+79186765060"
            //     selectProducts2: "Курс по JavaScript"
            //     selectStatus2: "Новые"
            // }

            // console.log("сформированный объект, который попадёт в МАССИВ объектов", objForLocalStorage)

            // --------------------------- // ЗАПОЛНИЛИ ОБЪЕКТ данными с ФОРМЫ РЕДАКТИРОВАНИЯ ЗАЯВОК -----------------------------

            // в)  получаем МАССИВ объектов из localStorage - newArr, парсим его в МАССИВ js, перебираем на совпадения ID элемента с ID редактируемой заявки, 
            //     в условии   берём совпавший объект из newArr , меняем его свойства на свойства объекта objForLocalStorage
            //     МАССИВ объектов парсится в строку и перезаписывается в localStorage

            // Возможно, этот код потом поднимем выше ----  в самый верх файла !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            let receivedArrayOfObjectsFromLS = JSON.parse(localStorage.getItem("clients application")); 
            
            //---------------------------------- Структура каждого объекта item в МАССИВЕ объектов:

            // EmailValue: "ruslan.astratov@yandex.ru"
            // ID: 2
            // NameSurnameValue: "Руслан Астратов"
            // TelValue: "+79186765060"
            // selectValue: "Курс по верстке"
            // status: "Новые"
            // whenItWasFilled: "Заявка была заполнена в 10 час. 12 мин. 13 сек. - 19 10 2020 гг. "
            //   // Структура отдельного объекта в МАССИВЕ объекта:


            // ------------------------------ ВНОСИМ ИЗМЕНЕНИЯ В МАССИВ ОБЪЕКТОВ (как в js-объект) ---------------------
            // КОГДА совпадёт ID-шка item-а с ID-шкой созданного нами объекта objForLocalStorage, мы поменяем значения свойств itemа на значения свойств созданного ранее -- objForLocalStorage
            receivedArrayOfObjectsFromLS.forEach(function(item) {
                if(item.ID == objForLocalStorage.dataOfID2) {
                    item.EmailValue = objForLocalStorage.inputEmail2
                    item.NameSurnameValue = objForLocalStorage.inputName2
                    item.TelValue = objForLocalStorage.inputTelephone2
                    item.selectValue = objForLocalStorage.selectProducts2
                    item.status = objForLocalStorage.selectStatus2
                    item.whenItWasFilled = objForLocalStorage.dataTimeOfCreation2
                }
            })
            // ------------------------------//  ВНОСИМ ИЗМЕНЕНИЯ В МАССИВ ОБЪЕКТОВ (как в js-объект)---------------------


            // --------------------------------- ПЕРЕЗАПИШЕМ МАССИВ ОБЪЕКТОВ В localStorage---------------------------
            // ----- ТЕПЕРЬ обновлённый МАССИВ ОБЪЕКТОВ преобразуем в JSON строку и добавим/перезапишем!!! в localStorage
            localStorage.setItem("clients application", JSON.stringify(receivedArrayOfObjectsFromLS));
            // --------------------------------- ПЕРЕЗАПИШЕМ МАССИВ ОБЪЕКТОВ В localStorage---------------------------

            // ----------------Функция, которая обнуляет все цифры в СЧЁТЧИКЕ перед тем как сработает функция ПОДСЧЁТА количества заявок 
            function zeroing() {
                let badgeAllApplications = document.querySelector('[data-counter-all-applications]')
                badgeAllApplications.innerHTML = 0
                badgeAllApplications.style.visibility = "hidden"

                let badgeNewApplications = document.querySelector('[data-counter-new-applications]')
                badgeNewApplications.innerHTML = 0
                badgeNewApplications.style.visibility = "hidden"

                let badgeInWorApplications = document.querySelector('[data-counter-in-work-applications]')
                badgeInWorApplications.innerHTML = 0
                badgeInWorApplications.style.visibility = "hidden"

                let badgeCompleteApplications = document.querySelector('[data-counter-complete-applications]')
                badgeCompleteApplications.innerHTML = 0
                badgeCompleteApplications.style.visibility = "hidden"

                let badgeArchiveApplications = document.querySelector('[data-counter-archive-applications]')
                badgeArchiveApplications.innerHTML = 0
                badgeArchiveApplications.style.visibility = "hidden"

            }

            zeroing()
            // ---------------- // Функция, которая обнуляет все цифры в СЧЁТЧИКЕ перед тем как сработает функция ПОДСЧЁТА количества заявок 

            // -----------------------------  СРАБАТЫВАЕТ ФУНКЦИЯ  ПОДСЧЁТА И ОТРИСОВКИ ЗНАЧЕНИЙ СЧЁТЧИКОВ -------------

            uiCtrl.updateValueOfCounter()

            // -----------------------------  СРАБАТЫВАЕТ ФУНКЦИЯ ПОДСЧЁТА И  ОТРИСОВКИ ЗНАЧЕНИЙ СЧЁТЧИКОВ --------

            // Уведомление о том, что данные были сохранены
            swal('Изменения сохранены!','Благодарим Вас за то, что пользуетесь услугами нашей компании!', "success")

        }
        // --- // Описана функция, которая сохраняет изменения при клике на кнопку "СОХРАНИТЬ ИЗМЕНЕНИЯ". Внутрь функции передаём ОБЪЕКТ -  ДАННЫЕ из localStorage

        // ------- ---------------------ОПИСАНА ФУНКЦИЯ , СРАБАТЫВАЮЩАЯ ПРИ КЛИКЕ НА КНОПКУ "УДАЛИТЬ В АРХИВ" ------------------------------------------
        document.querySelector(DOM.buttonDeleteToArchive).addEventListener('click', deleteToArchive.bind(null, receivedDataFromLS), false);
        // false - означает, что обработчик события будет срабатывать в фазе всплытия, а значит -- в функцию deleteToArchive мы теперь сможем передать объект event!!!

        function deleteToArchive(receivedDataFromLS, e) {
            e.preventDefault()

            console.log(e.target)

            // Создаём объект. Он пока пустой, но чуть позже мы наполним его
            let objForLocalStorage = {

            }

            // а) С формы редактирования соберутся все данные  по нашей заявке
            // 
            // Заявка N..
            let dataOfID2 = document.querySelector(DOM.dataOfID)

            // 2020-04-20 13:52:13
            let dataTimeOfCreation2 = document.querySelector(DOM.dataTimeOfCreation)
            // console.log(dataTimeOfCreation)

            // Курс по вёрстке/ Курс по JavaScript/...
            // let selectProducts = document.querySelector(DOM.selectProducts).value
            let selectProducts2 = document.querySelector(DOM.selectProducts)
            // console.log(selectProducts)

            // Пётр
            let inputName2 = document.querySelector(DOM.inputName)
            // console.log(inputName.value)

            // petr.vasilyev@yandex.ru
            let inputEmail2 = document.querySelector(DOM.inputEmail)
            // console.log(inputEmail)

            // 8-938-067-08-00
            let inputTelephone2 = document.querySelector(DOM.inputTelephone)
            // console.log(inputTelephone)

            //  Новая/В работе (Ожидается оплата)/Завершена (Оплата получена)                   Статус заявки  - значение селекта
            let selectStatus2 = document.querySelector(DOM.selectStatus)


            // б) этими данными ЗАПОЛНЯЕТСЯ прежде пустой объект -- objForLocalStorage

            // Перед тем, как в свойство объекта присвоим ID-шник,  нам нужно как-то обработать фразу "Заявка №3" и извлечь из неё цифру
            // В arrID получили ["Заявка", "№3"]
            let arrID = dataOfID2.innerHTML.split(" ")
            // console.log(arrID)

            // ------------------Берём второй элемент массива arrID  -- "№3"   и парсим его в число  3
            let elemArrID =  parseInt(arrID[1][1]) 
            // console.log(elemArrID)


            objForLocalStorage.dataOfID2 = elemArrID


            // Здесь мы должны присвоить ЗНАЧЕНИЮ СВОЙСТВА объекта уже отформатированную запись - "Заявка была заполнена в 10 час. 12 мин. 13 сек. - 19 10 2020 гг. "

            //                                                          0             1
            //                                                      0123456789    01234567
            // В переменную  ar     получим    ["2020-10-19", "10:12:20"]
            let ar = dataTimeOfCreation2.innerHTML.split(" ")                                          //   получим    ["2020-10-19", "10:12:20"]
            // console.log("ВРЕМЯ" , arrDataTimeOfCreation)


            // Лепим новую строку
            // let newStringTimeOfCreation = `Заявка была заполнена в 10 час. 12 мин. 13 сек. - 19 10 2020 гг. `
            let newStringTimeOfCreation = `Заявка была заполнена в ${ar[1][0]}${ar[1][1]} час. ${ar[1][3]}${ar[1][4]} мин. ${ar[1][3]}${ar[1][4]} сек. - ${ar[0][8]}${ar[0][9]} ${ar[0][5]}${ar[0][6]} ${ar[0][0]}${ar[0][1]}${ar[0][2]}${ar[0][3]} гг. `


            objForLocalStorage.dataTimeOfCreation2 = newStringTimeOfCreation

            objForLocalStorage.selectProducts2 = selectProducts2.value

            objForLocalStorage.inputName2 = inputName2.value

            objForLocalStorage.inputEmail2 = inputEmail2.value

            objForLocalStorage.inputTelephone2 = inputTelephone2.value

            objForLocalStorage.selectStatus2 = selectStatus2.value

            // console.log("ЗАПОЛНИЛИ объект перед сохранением в localStorage", objForLocalStorage)

            // --------------------- Теперь наш прежде пустой объект objForLocalStorage ЗАПОЛНЕН и имеет такой вид: 

            // let objForLocalStorage = {
            //     dataOfID2: 3
            //     dataTimeOfCreation2: "Заявка была заполнена в 10 час. 12 мин. 13 сек. - 19 10 2020 гг. "
            //     inputEmail2: "ruslan.astratov@yandex.ru"
            //     inputName2: "Мария Треногина"
            //     inputTelephone2: "+79186765060"
            //     selectProducts2: "Курс по JavaScript"
            //     selectStatus2: "Новые"
            // }

            console.log("сформированный объект, который попадёт в МАССИВ объектов", objForLocalStorage)

            // --------------------------- // ЗАПОЛНИЛИ ОБЪЕКТ данными с ФОРМЫ РЕДАКТИРОВАНИЯ ЗАЯВОК -----------------------------

            // в)  получаем МАССИВ объектов из localStorage - newArr, парсим его в МАССИВ js, перебираем на совпадения ID элемента с ID редактируемой заявки, 
            //     в условии   берём совпавший объект из newArr , меняем его свойства на свойства объекта objForLocalStorage
            //     МАССИВ объектов парсится в строку и перезаписывается в localStorage

            // Возможно, этот код потом поднимем выше ----  в самый верх файла !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            let receivedArrayOfObjectsFromLS = JSON.parse(localStorage.getItem("clients application")); 
            
            //---------------------------------- Структура каждого объекта item в МАССИВЕ объектов:

            // EmailValue: "ruslan.astratov@yandex.ru"
            // ID: 2
            // NameSurnameValue: "Руслан Астратов"
            // TelValue: "+79186765060"
            // selectValue: "Курс по верстке"
            // status: "Новые"
            // whenItWasFilled: "Заявка была заполнена в 10 час. 12 мин. 13 сек. - 19 10 2020 гг. "
            //   // Структура отдельного объекта в МАССИВЕ объекта:


            // ------------------------------ ВНОСИМ ИЗМЕНЕНИЯ В МАССИВ ОБЪЕКТОВ (как в js-объект) ---------------------
            // КОГДА совпадёт ID-шка item-а с ID-шкой созданного нами объекта objForLocalStorage, мы поменяем значения свойств itemа на значения свойств созданного ранее -- objForLocalStorage
            receivedArrayOfObjectsFromLS.forEach(function(item) {
                if(item.ID == objForLocalStorage.dataOfID2) {
                    item.EmailValue = objForLocalStorage.inputEmail2
                    item.NameSurnameValue = objForLocalStorage.inputName2
                    item.TelValue = objForLocalStorage.inputTelephone2
                    item.selectValue = objForLocalStorage.selectProducts2
                    item.status = "Архивные"
                    // item.status = objForLocalStorage.selectStatus2
                    item.whenItWasFilled = objForLocalStorage.dataTimeOfCreation2
                }
            })
            // ------------------------------//  ВНОСИМ ИЗМЕНЕНИЯ В МАССИВ ОБЪЕКТОВ (как в js-объект)--------------------- "Архивные"


            // --------------------------------- ОБНОВИМ МАССИВ ОБЪЕКТОВ В localStorage  ---------------------------
            // ----- ТЕПЕРЬ обновлённый МАССИВ ОБЪЕКТОВ преобразуем в JSON строку и добавим/перезапишем!!! в localStorage
            localStorage.setItem("clients application", JSON.stringify(receivedArrayOfObjectsFromLS));
            // --------------------------------- ОБНОВИМ МАССИВ ОБЪЕКТОВ В localStorage -----------------------------

            // --------------------------  ДЕЛАЕМ ТАБ "Архивные" АКТИВНЫМ ------------------------------------------
            //--------- Создадим ЗАПИСЬ в localStorage  - запись делается в случае клика по кнопке УДАЛИТЬ в архив -- и ПЕРЕХОДЕ на 2 страницу
            let isTransition = true

            localStorage.setItem("go to the second page after deleting it in the archive", isTransition);

            // Здесь сработает перенаправление на страницу 2 с таблицей заявок
            window.location.href = '02-crm-all-bids.html#forclick'

            // А уже на второй странице мы получим эту запись из localStorage (и в контроллере для второй страницы -  напишем код, который даст ТАБУ "Архивные" активный класс)
        }
        // ------- --------------------- // ОПИСАНА ФУНКЦИЯ , СРАБАТЫВАЮЩАЯ ПРИ КЛИКЕ НА КНОПКУ "УДАЛИТЬ В АРХИВ" ------------------------------------------













    }









    return {
        init: function(){               // Функция, запускающая программу, то есть запускающая прослушку
            setupEventListeners();
        }
    }

})(modelController, viewEditController);   // Передаём внутрь контроллера как аргументы: МОДЕЛЬ и ШАБЛОН

// Запускаем программу
editController.init();



