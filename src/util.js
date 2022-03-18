export default function convertDate(dbDate){
    const date = new Date(dbDate);
    return `${date.getMonth()}/${date.getDay()} at ${date.getHours()}:${date.getMinutes()}`;
}