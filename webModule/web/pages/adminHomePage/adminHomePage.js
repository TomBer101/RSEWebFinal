/******************************************************************************/
var refreshRate = 2000; // milli seconds
var USER_LIST_SERVLET_URL = buildUrlWithContextPath("usersList");
var STOCK_LIST_SERVLET_URL = buildUrlWithContextPath("stocksList");
var CHAT_LIST_SERVLET_URL = buildUrlWithContextPath("chatList");
/******************************************************************************/
function refreshUsersList(users)
{
    $('#usersList').empty();

    $.each(users || [], function(index, user)
    {
        $('<li class="userOnline">' + user + '</li>')
            .appendTo($('#usersList'));
    });
}
/******************************************************************************/
function refreshStocksList(stocks)
{
    $('#stocksList').empty();

    $.each(stocks || [], function (index, stock)
    {
        $('<li id=' + stock.symbol + "  onclick='showStock(" + stock.symbol +")'>" + "Symbol: " + stock.symbol + "<br>" + "Company: " + stock.companyName + "<br> Value: "
            + stock.currValue + "<br> Cycle: " + stock. transactionsCycle + "</li>").appendTo($('#stocksList'));
    });
}
/******************************************************************************/
function refreshChatList(chatData)
{
    $('#chatarea').empty();
    $.each(chatData || [], appendChatEntry);

    var scroller = $("#chatarea");
    var height = scroller[0].scrollHeight - $(scroller).height();
    $(scroller).stop().animate({ scrollTop: height }, "slow");
}
/******************************************************************************/
function appendChatEntry(index, entry)
{
    var entryElement = createChatEntry(entry);
    $("#chatarea").append(entryElement).append("<br>");
}
/******************************************************************************/
function createChatEntry(entry)
{
    return $("<div class=\"msg\">").append(entry.userName + ":  " + entry.chatString);
}
/******************************************************************************/
function showStock(symbol)
{
    $.ajax({
        data: "symbol=" + symbol.getAttribute('id'),
        url:"http://localhost:8080/webModule_Web_exploded/pages/adminHomePage/StockInfoServlet",
        method: "GET",
        timeout: 2000,
        error: function(errorMassage)
        {
            console.log(errorMassage);
        },
        success: function (nextPageUrl)
        {
            window.location.replace(nextPageUrl);
        }
    });

    // By default - we will always return false
    return false;
}
/******************************************************************************/
function ajaxUsersList()
{
    $.ajax({
        url: USER_LIST_SERVLET_URL,
        success: function(users)
        {
            refreshUsersList(users);
        }
    })
}
/******************************************************************************/
function ajaxStocksList()
{
    $.ajax({
        url: STOCK_LIST_SERVLET_URL,
        dataType: 'json',
        success: function(stocks)
        {
            refreshStocksList(stocks);
        }
    })
}
/******************************************************************************/
function ajaxChatList()
{
    $.ajax({
        url: CHAT_LIST_SERVLET_URL,
        dataType: 'json',
        success: function(stocks)
        {
            refreshChatList(stocks);
        }
    })
}
/******************************************************************************/
$(function()
{
    ajaxUsersList();
    ajaxStocksList();
    ajaxChatList();
    setInterval(ajaxUsersList, refreshRate);
    setInterval(ajaxStocksList, refreshRate);
    setInterval(ajaxChatList, refreshRate);
});
/******************************************************************************/
$(function() { // onload...do
    //add a function to the submit event
    $("#chatform").submit(function() {
        $.ajax({
            data: $(this).serialize(),
            method: "POST",
            url: this.action,
            timeout: 2000,
            error: function()
            {
                console.error("Failed to submit");
            },
            success: function(r)
            {
                //do not add the user string to the chat area
                //since it's going to be retrieved from the server
                //$("#result h1").text(r);
            }
        });

        $("#userstring").val("");
        // by default - we'll always return false so it doesn't redirect the user.
        return false;
    });
});
/******************************************************************************/


