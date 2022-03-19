export default function convertDate(dbDate){
    const date = new Date(dbDate);
    return `${date.getMonth() + 1}/${date.getDate()} at ${date.getHours()}:${date.getMinutes()}`;
}