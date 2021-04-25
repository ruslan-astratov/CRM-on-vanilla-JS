

// ------------------------------------------------------------------  МОДЕЛЬ  ------------------------------------------------
var modelController = (function() {
    var allData = {
        // Чуть позже в [] мы будем пушить сформированные объекты-заявки со введёнными пользователем данными из ФОРМЫ ЗАЯВОК. По умолчанию [] пустой!!!
        applicationFormData: []  //Сюда по очереди пушатся заявки из Формы заявок
    }


    //------------------------------------------ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ ПОЛУЧАЕМ ДАННЫЕ ИЗ localStorage------------------------------
    // При загрузке страницы смотрим - есть ли что-нибудь в localStorage.  Если есть, это значит, что ранее мы уже создавали и добавляли туда заявки.
    // Если в localStorage что то есть,  В таком случае - попробуем получить массив объектов из localStorage, преобразовать его в JS-массив и подставить его в качестве  содержимого allDataForSite.applicationFormData[] (а allDataForSite.applicationFormData  у нас описан в самом низу МОДЕЛИ)

    // Здесь опишем инструкцию, которая при загрузке/перезагрузке страницы пытается забрать массив объектов из localStorage. Если ей удаётся это сделать, функция перезапишет тот allDataForSite.applicationFormData[], что вверху модуля 

    // Пытаемся ПОЛУЧИТЬ данные из localStorage при загрузке/перезагрузке страницы. Данные получаем в виде JSON строки
    var arrayOfObjectsFromLocalStorage = localStorage.getItem("clients application"); 

    if(arrayOfObjectsFromLocalStorage) { // Если в  localStorage что-то будет, тогда  и только тогда функция отработает и выведет на экран сохранённые ранее задачи

            // Распарсим данные из localStorage в массив arrFromLocalStorage/ Сделаем JSON-строку обычным массивом, с которым далее можно будет работать в МОДУЛЕ
            var arrFromLocalStorage = JSON.parse(arrayOfObjectsFromLocalStorage);

            // Ищем МАССИВ объектов в модуле и меняем его содержимое на то, что получили из localStorage
            allData.applicationFormData = arrFromLocalStorage;

            console.log("Т.к. в localStorage что то было, при загрузке/перезагрузке страницы мы забрали оттуда эти данные", allData.applicationFormData)
    }


    // -------- Описана функция:  при КЛИКЕ на УДАЛИТЬ ВСЕ ЗАЯВКИ - берём данные localStorage и удаляем их все -------------------------------
    
    function deleteAllAppFromLocalStorage() {
        localStorage.removeItem("clients application");
    }

    
    // -------- Описана функция:  при КЛИКЕ на УДАЛИТЬ ВСЕ ЗАЯВКИ - берём данные localStorage и удаляем их все -------------------------------



    //------------------------------------------// ПРИ ЗАГРУЗКЕ СТРАНИЦЫ ПОЛУЧАЕМ ДАННЫЕ ИЗ localStorage------------------------------



    //-------------------------------------------Описываем функцию - ПРИСВОЕНИЯ ID каждому объекту в массиве ----------------------
    //  В качестве аргумента функция принимает массив объектов
    function setIDtoObjectsInArray(arr) {
        // В самом начале наш счётчик = 0
        let counter = 0;

        // В цикле каждой заявке, добавленной в массив объектов, будет присвоено новое свойство - уникальный ID. Значение ID будет равно увеличивающемуся счетчику
        for(i=0; i < arr.length; i++) {
            counter++
            arr[i].ID = counter
        }

        // console.log("ОБЩИЙ массив объектов-заявок allDataForSite.applicationFormData", allDataForSiteApplicationFormData);
    }
    //------------------------------------------- // Описываем функцию - ПРИСОВЕНИЯ ID каждому объекту в массиве ----------------------


    
    //------------------------------------------------- Опишем функцию, которая СОЗДАЁТ ОБЪЕКТ с данными -------------------------------------------
    //  на основе тех значений, которые были введёны пользователем в inputы ФОРМЫ ЗАЯВОК,
    //  и сохраняет его в общий объект allData в поле applicationFormData, то есть в allData.applicationFormData

    //  Функция  принимает аргументы (Общий объект с данными и пользовательские значения из инпутов).
    function saveDataFromApplicationForm(allDataForSite, inputNameSurnameValue, inputTelValue, inputEmailValue, selectValue) {

        // Текущая дата. Получаем объект со всей информацией о времени
        let nowDate = new Date();         // Получаем объект со ВСЕЙ информацией о времени

        // Часы, минуты, секунды 
        let currentHour = nowDate.getHours();        // Часы
        let currentMinutes = nowDate.getMinutes();   // Минуты
        let currentSeconds = nowDate.getSeconds();   // Секунды


        let today = nowDate.getDate()                // Сегодняшний день -  15 число
        let month = nowDate.getUTCMonth()            // Сегодняшний месяц по календарю -  10,  ноябрь
        let year = nowDate.getFullYear()             // Нынешний год -  2020

        // Формируем строку с текущей датой, для того, чтобы эта строка попала в ЗАЯВКУ --  applicationObj  -- в качестве одного из его свойств
        let whenItWasFilled = `Заявка была заполнена в ${currentHour} час. ${currentMinutes} мин. ${currentSeconds} сек. - ${today} ${month} ${year} гг. `

        // console.log(currentHour,currentMinutes, currentSeconds )

        //---------------------------------------СОЗДАЁМ объект - ЗАЯВКУ из Формы заявок -- и наполняем его данными из инпутов---------------------------------------
        var applicationObj = {
            status: "Новые",
            whenItWasFilled: whenItWasFilled,
            NameSurnameValue: inputNameSurnameValue,
            TelValue: inputTelValue,
            EmailValue: inputEmailValue,
            selectValue: selectValue,
        };

        // ------------------------------------ ------  Проверка на ДУБЛИРОВАНИЕ заявок в массиве объектов allDataForSite.applicationFormData[]: -----------------

        // В случае, если пользователь ввёл данные в форму заявок, затем нажал "Оформить заявку", а затем тут же снова нажал "Оформить заявку", нам нужно сделать так, чтобы данные не дублировались

        //То есть ЕСЛИ массив объектов УЖЕ содержит в себе заявку с именем - "Руслан Астратов", то при повторном нажатии на кнопку "Оформить заявку" дубликат (с тем же именем) сначала попадёт в массив объектов, но затем будет тут же удалён 

        //---------------------- Если массив объектов НЕ пустой и в нём хоть что-то есть, то проверяем объекты внутри него на ДУБЛИРОВАНИЕ
        if(allDataForSite.applicationFormData.length > 0) {
            // Пушим заявку в объект. И тут У нас МОЖЕТ образоваться дублирование 
            allDataForSite.applicationFormData.push(applicationObj);


            // -------------------------------------------- Здесь будет  функция , которая УДАЛЯЕТ ДУБЛИКАТЫ

            //  Описана функция, которая удаляет копии объектов-заявок.
            function arrayContains(arr, val, equals) {
                var i = arr.length;
                while (i--) {
                    if ( equals(arr[i], val) ) {
                        return true;
                    }
                }
                return false;
            }

            function removeDuplicates(arr, equals) {
                var originalArr = arr.slice(0);
                var i, len, j, val;
                arr.length = 0;

                for (i = 0, len = originalArr.length; i < len; ++i) {
                    val = originalArr[i];
                    if (!arrayContains(arr, val, equals)) {
                        arr.push(val);
                    }
                }
            }

            // Вместо NameSurnameValue, TelValue, EmailValue, selectValue  - подставляем те свойства, которые хотим проверить на совпадение.

            // То есть, в случае, если значения ВСЕХ этих четырёх свойств (созданного и добавленного в массив объекта) СОВПАДУТ (со свойствами объекта, который уже был в массиве) - то копия удалится, а в массиве объектов останется лишь один, уникальный объект
            function thingsEqual(thing1, thing2) {
                return thing1.NameSurnameValue === thing2.NameSurnameValue
                    && thing1.TelValue === thing2.TelValue
                    && thing1.EmailValue === thing2.EmailValue
                    && thing1.selectValue === thing2.selectValue;
            }

            //  NameSurnameValue, TelValue, EmailValue, selectValue - этих свойств в нашей функции может быть больше или меньше! Все зависит от конкретной задачи. Например, мы можем проверить на совпадения всего по двум свойствам  - NameSurnameValue и selectValue

            // Вызываем функцию, передавая в качестве первого аргумента МАССИВ объектов  -  который и проверяем на дубликаты
            removeDuplicates(allDataForSite.applicationFormData, thingsEqual);

            console.log("Результат работы функции removeDuplicates - прежний массив объектов allDataForSite.applicationFormData, но очищенный от дублей",
             allDataForSite.applicationFormData);

            // -------------------------------------------------------//  функция , которая УДАЛЯЕТ ДУБЛИКАТЫ -------------------------------------------------




            //---------------------------------------- Вызываем функцию ПРИСВОИТЬ ID ВСЕМ СОЗДАННЫМ ЗАЯВКАМ
            setIDtoObjectsInArray(allDataForSite.applicationFormData)

            // -------- СРАБАТЫВАЕТ ПЛАГИН  --- ВСПЛЫВАЮЩЕЕ УВЕДОМЛЕНИЕ
            swal('Ваша заявка сохранена!','Благодарим Вас за то, что пользуетесь услугами нашей компании!', "success")
        //---------------------- // Если массив объектов НЕ пустой и в нём хоть что-то есть, то проверяем объекты внутри него на ДУБЛИРОВАНИЕ //


          //---------------------- Если же массив объектов был ПУСТ, то спокойно пушим в него самую ПЕРВУЮ созданную заявку applicationObj...
        } else {  

            allDataForSite.applicationFormData.push(applicationObj);

            // -------- СРАБАТЫВАЕТ ПЛАГИН  --- ВСПЛЫВАЮЩЕЕ УВЕДОМЛЕНИЕ
            swal('Ваша заявка сохранена!','Благодарим Вас за то, что пользуетесь услугами нашей компании!', "success")
            //--------------------  ... и Вызываем функцию - ПРИСВОИТЬ ID ВСЕМ СОЗДАННЫМ ЗАЯВКАМ.  Первой и пока единственной заявке будет присвоен ID
            setIDtoObjectsInArray(allDataForSite.applicationFormData)

        }
    }


    // --------------------------------------  Сохраняем готовый МАССИВ объектов-заявок в localStorage ------------------------

    // Описана Функция, сохраняющая данные в localStorage. Принимает в себя МАССИВ объектов(с заявками)
    function saveDataToLocalStorage(saveDataFromApplication) {
        //                                  Ключ                          Содержимое        -- парсим в JSON-строку массив объектов
        localStorage.setItem("clients application", JSON.stringify(saveDataFromApplication));

        // console.log("Этот массив объектов должен сохраниться в localStorage -- ", saveDataFromApplication)
    }
    // ---------------------------------------------------------- // localStorage ---------------------------------------------------------



    //--------------------------------    Возвращаем наружу МЕТОДЫ модели, для дальнейшего их использования в контроллере 
    return {

        deleteAllAppFromLocalStorage: deleteAllAppFromLocalStorage,  // При клике на кнопку УДАЛИТЬ ЗАЯВКИ - удаляет все данные из localStorage
        getAllData: function() {                                     // Функция возвращает объект СО ВСЕМИ ДАННЫМИ, чтобы использовать этот объект в контроллере
            return allData;             
        },
        saveDataFromApplicationForm: saveDataFromApplicationForm, // Функция возвращает контроллеру метод СОХРАНЕНИЯ данных в ОБЩИЙ объект СО ВСЕМИ данными
        saveDataToLocalStorage: saveDataToLocalStorage            // - Сохраняем готовый МАССИВ объектов-заявок в localStorage
    }

})();

