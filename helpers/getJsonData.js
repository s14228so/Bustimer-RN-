import { get } from '../plugins/axios';



export const getTimeTable = async () => {
    return await get("b/timeTable.json");
}

export const getHolidays = async () => {
    return await get("/static/holidays.json");
}
