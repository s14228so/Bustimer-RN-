const makeDateObj = (date) => {
    //このdateにはnew Date()が毎300msごと入ってくる
    const yearStr = date.getFullYear();
    const monthStr = (`00${date.getMonth() + 1}`).slice(-2);
    const dayStr = (`00${date.getDate()}`).slice(-2);
    const hourStr = (`00${date.getHours()}`).slice(-2);
    const minuteStr = (`00${date.getMinutes()}`).slice(-2);
    const secondStr = (`00${date.getSeconds()}`).slice(-2);
    const dateTimeStr = `${yearStr}-${monthStr}-${dayStr}T${hourStr}:${minuteStr}`;
    // console.log(dateTimeStr) => 2019-11-19T18:27
    const dayOfWeek = date.getDay();
    const dayOfWeekStr = ["日", "月", "火", "水", "木", "金", "土"][dayOfWeek];
    return {
        dateTimeStr,
        dayOfWeek,
        dayOfWeekStr,
        monthStr,
        dayStr,
        hourStr,
        minuteStr,
        secondStr,
        month: parseInt(monthStr, 10),
        day: parseInt(dayStr, 10),
        hour: parseInt(hourStr, 10),
        minute: parseInt(minuteStr, 10),
        second: parseInt(secondStr, 10),
    }
    //parseIntで第二引数は何進数で変換するか。一応デフォで10進数。
}

const dateObj = makeDateObj(new Date());

//オブジェクトの方をobject export
export { dateObj };

//関数の方をdefaulte export
export default makeDateObj;
