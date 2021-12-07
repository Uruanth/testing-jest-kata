import {
    createEvent
    
} from './functions'

beforeAll(() => {
    global.Date.now = jest.fn(() => new Date('2020-04-07T10:20:30Z').getTime());
});


//Definir terminos iniciales
const weekday = "mon";
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
const hourTest = new Date().getHours();
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

    const result = createEvent(weekday, week, openHour, closeHour);
    const startDate = getDateCalendar(numDayTest, currentDayTest);

        expect(result.date).toBe(startDate);

});

test('Validation date', () => {
    //TODO: hacer las verificaciones
});


test('Validation illegal arguments', () => {
    //TODO: hacer las verificaciones
});


test('create an event list of at least 10 events', () => {
    //TODO: hacer las verificaciones
});