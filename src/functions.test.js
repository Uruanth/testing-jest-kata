import {
    createEvent

} from './functions'

beforeAll(() => {
    global.Date.now = jest.fn(() => new Date('2020-04-07T10:20:30Z').getTime());
});


//Definir terminos iniciales
const weekday = 'mon';
const week = 1;
const openHour = 8;
const closeHour = 14;


//Funciones iniciales y constantes clase

const NUM_DAY = {
    'mon': 1,
    'tue': 2,
    'wed': 3,
    'thu': 4,
    'fri': 5,
    'sat': 6,
    'sun': 7
};

const numDayTest = NUM_DAY[weekday];
const currentDayTest = new Date().getDay();
const hour = new Date().getHours();

const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
};


function addDays(days) {
    return new Date(new Date().setDate(new Date().getDate() + days));
}

function getDateCalendar(numDay, currentDay) {
    if (numDay >= currentDay && parseInt(closeHour) >= hour) { //posterior a dia de la semana
        return addDays((numDay - currentDay) + 7 * (week - 1));
    }
    return addDays((numDay - currentDay) + 7 * (week - 1));
}


test('Validation a event title and content basic', () => {

    const result = createEvent(weekday, week, openHour, closeHour);

    //Lo que espero
    //toBe para cosas mas puntuales
    expect(result.title).toBe('[SOFKA U] Meeting Room');
    expect(result.description).toBe('Mentoring and Practice');
    //Equal es para comparar objetos 
    expect(result.duration).toEqual([6, 'hour']);
});


test('Validation start date', () => {

    const startDate = getDateCalendar(numDayTest, currentDayTest);
    const result = createEvent(weekday, week, openHour, closeHour);
    expect(result.start).toEqual(startDate);

});

test('Validation date', () => {
    //TODO: hacer las verificaciones

    const dateInit = getDateCalendar(numDayTest, currentDayTest);
    const dateTest = new Date(dateInit).toLocaleDateString('es-ES', options);
    const result = createEvent(weekday, week, openHour, closeHour);

    expect(result.date).toEqual(dateTest);

});



//Agrupar los test de los errores
describe('Validar errores', () => {
    it('Hora de cierre antes que hora de apertura', () => {

        const horaCierreMal = 7;
        const result = () => createEvent(weekday, week, openHour, horaCierreMal);
        expect(result).toThrow(Error);

    });

    it('Argumento semana incorrecto', () => {
        const weekError = -7;
        const result = () => createEvent(weekday, weweekErrorek, openHour, closeHour);
        expect(result).toThrow(Error);
    });

    it('Dia de la semana no valido', () => {
        const weekdayError = 'martesMiercoles';
        const result = () => createEvent(weekdayError, week, openHour, closeHour);
        expect(result).toThrow(Error);
    });

})


test('create an event list of at least 10 events', () => {

    //Hacer una lista con los datos
    const listTest = [{
            weekday: 'mon',
            week: 1,
            openHour: 8,
            closeHour: 10
        },
        {
            weekday: 'tue',
            week: 2,
            openHour: 8,
            closeHour: 9
        },
        {
            weekday: 'wed',
            week: 3,
            openHour: 8,
            closeHour: 16
        },
        {
            weekday: 'thu',
            week: 4,
            openHour: 12,
            closeHour: 13
        },
        {
            weekday: 'fri',
            week: 5,
            openHour: 16,
            closeHour: 22
        },
        {
            weekday: 'sat',
            week: 6,
            openHour: 18,
            closeHour: 20
        },
        {
            weekday: 'sun',
            week: 7,
            openHour: 10,
            closeHour: 23
        },
        {
            weekday: 'mon',
            week: 8,
            openHour: 8,
            closeHour: 20
        },
        {
            weekday: 'tue',
            week: 9,
            openHour: 9,
            closeHour: 14
        },
        {
            weekday: 'wed',
            week: 10,
            openHour: 10,
            closeHour: 14
        },
        {
            weekday: 'thu',
            week: 11,
            openHour: 11,
            closeHour: 14
        },
        {
            weekday: 'fri',
            week: 12,
            openHour: 13,
            closeHour: 14
        },
        {
            weekday: 'sat',
            week: 13,
            openHour: 14,
            closeHour: 23
        },
        {
            weekday: 'sun',
            week: 14,
            openHour: 15,
            closeHour: 23
        }
    ];

    listTest.map(evento => {

        const dayEvent = NUM_DAY[evento.weekday];
        const dateInit = getDateCalendar(dayEvent, currentDayTest);
        const result = createEvent(evento.weekday, evento.week, evento.openHour, evento.closeHour);
        const dateTest = new Date(dateInit).toLocaleDateString('es-ES', options);
        const title = "[SOFKA U] Meeting Room";
        const description = "Mentoring and Practice";

        expect(result.title).toBe(title);
        expect(result.description).toBe(description);
        expect(result.date).toEqual(dateTest);


    })

});