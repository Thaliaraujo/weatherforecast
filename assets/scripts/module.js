export const weekDayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];

export const mothNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
];

//Retorna dados no formato: Sunday 10, Jan
export const getDate = (dateUnix, timeZone) => {
    const date = new Date((dateUnix + timeZone) * 1000);
    const weekDayName = weekDayNames[date.getUTCDay()];
    const mothName = mothNames[date.getUTCMonth()];

    return `${weekDayName} ${date.getUTCDate()}, ${mothName}`;
}

//Função para converter timestamp em hora e minutos
export const getTime = (timeUnix, timeZone) => {
    const date = new Date((timeUnix + timeZone) * 1000);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';

    return `${hours % 12 || 12}:${minutes < 10 ? '0' : ''}${minutes} ${period}`;
};

export const getHours = (timeUnix, timeZone) => {
    const date = new Date((timeUnix + timeZone) * 1000);
    const hours = date.getUTCHours();
    const period = hours >= 12 ? 'PM' : 'AM';

    return `${hours % 12 || 12} ${period}`;
};