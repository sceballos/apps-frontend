export default function convertDate(dbDate){
    const date = new Date(dbDate);
    return `${date.getMonth() + 1}/${date.getDay()} at ${date.getHours()}:${date.getMinutes()}`;
}