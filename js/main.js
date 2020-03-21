// from https://www.quora.com/How-do-I-get-the-number-of-days-between-two-dates-in-Javascript
function daysBetween(date1, date2 ) {   //Get 1 day in milliseconds
    var one_day=1000*60*60*24;    // Convert both dates to milliseconds
    var date1_ms = date1.getTime();   
    var date2_ms = date2.getTime();    // Calculate the difference in milliseconds  
     var difference_ms = date2_ms - date1_ms;        // Convert back to days and return   
    return Math.round(difference_ms/one_day); 
} 

async function forEachDateInRange(start, end, func) {
    var loop = new Date(start);
    while(loop <= end){
        await func(loop)
        var newDate = loop.setDate(loop.getDate() + 1);
        loop = new Date(newDate);
    }
}

window.addEventListener('load', function(){
    $('button').on('click', async function(){

        let shortBoardId = $('#shortBoardId').val()
        let board = await Trello.boards.get(shortBoardId)
        let fromDate = new Date($('#from').val())
        let untilDate = new Date($('#until').val())
        if(!confirm(`Are you sure you want to add ${daysBetween(fromDate, untilDate)} new lists to ${board.name} board?`)){
            return;
        }
        forEachDateInRange(fromDate, untilDate, (date) => {
            return Trello.post(`lists?name=${date.toDateString()}&idBoard=${board.id}&pos=top`)
        })
    });
});
