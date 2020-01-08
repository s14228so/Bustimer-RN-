import { get } from '../plugins/axios';



export const getTimeTable = async () => {
    return await get("/api/timeTable.json");
}

export const getHolidays = async () => {
    return await get("/api/holidays.json");
}
