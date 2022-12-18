var textHosts = [
    {
        id: 1,
        text: "РПГ",
        options: [
            {
                text: "Начать",
                nextText: "2",
            },
        ],
    },
    {
        id: "2",
        text: "Поздно вечером вы возвращайтесь домой ваши действия",
        options: [
            {
                text: "Пойти через людный тротуар",
                nextText: "Win",
            },
            {
                text: "Остаться на ночь у знакомого",
                nextText: "3(a)",
            },
            {
                text: "Сократить дорогу через темный переулок",
                nextText: "3(b)",
            },
        ],
    },
    {
        id: "3(b)",
        text: "Подойдя к дому, позади вы заметили странную личность",
        options: [
            {
                text: "Забежать в подъезд",
                nextText: "4.1(b)",
            },
            {
                text: "Уйти в соседний двор",
                nextText: "4.2(b)",
            },
        ],
    },
    {
        id: "4.1(b)",
        text: "Маньяк оказался быстрее и настиг вас у двери",
        options: [
            {
                text: "Вы убиты \n Game Over",
                nextText: 1,
            },
        ],
    },
    {
        id: "4.2(b)",
        text: "Вы забежали в подъезд за семейной парой",
        options: [
            {
                text: "Выжидать",
                nextText: "5.2(b)",
            },
            {
                text: "Попросить помощи",
                nextText: "Win",
            },
        ],
    },
    {
        id: "5.2(b)",
        text: "Маньяк попал в подьезд и убил вас",
        options: [
            {
                text: "Вы убиты \n Game Over",
                nextText: 1,
            },
        ],
    },

    {
        id: "3(a)",
        text: "Друг приютил вас на ночь. Вы решили попить чай и придумать план на вечер",
        options: [
            {
                text: "Вы решили выпить",
                nextText: "4.1(a)",
            },
            {
                text: "Вы решили пойти прогуляться",
                nextText: "4.2(a)",
            },
            {
                text: "Вы решили лечь спать",
                nextText: "Win",
            },
        ],
    },
    {
        id: "4.1(a)",
        text: "У вас закончился алкоголь",
        options: [
            {
                text: "Сходить до магазина",
                nextText: "4.1(a)GO",
            },
            {
                text: "Лечь спать",
                nextText: "Win",
            },
        ],
    },
    {
        id: "4.1(a)GO",
        text: "По возращению домой вас поджидал маньяк",
        options: [
            {
                text: "Вы убиты \n Game Over",
                nextText: 1,
            },
        ],
    },
    {
        id: "4.2(a)",
        text: "Взяв с собой собаку вы вышли на вечернюю прогулку",
        options: [
            {
                text: "Все славно",
                nextText: "Win",
            },
        ],
    },
    {
        id: "Win",
        text: "Вы успешно добрались до дома",
        options: [
            {
                text: "Победа",
                nextText: 1,
            },
        ],
    },
];