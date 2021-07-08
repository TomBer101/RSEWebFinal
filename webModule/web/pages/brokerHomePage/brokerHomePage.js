/******************************************************************************/
var refreshRate = 2000; // milli seconds
var USER_LIST_SERVLET_URL = buildUrlWithContextPath("usersList");
var STOCK_LIST_SERVLET_URL = buildUrlWithContextPath("stocksList");
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
       $('<li id=' + stock.symbol + ">" + "Symbol: " + stock.symbol + "<br>" + "Company: " + stock.companyName + "<br> Value: "
           + stock.currValue + "<br> Cycle: " + stock.transactionCycle + "</li>").appendTo($('#stocksList'));
    });
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
            refreshStocksList(users);
        }
    })
}
/******************************************************************************/
$(function()
{
    setInterval(ajaxUsersList, refreshRate);
    setInterval(ajaxStocksList, refreshRate);
});
/******************************************************************************/
function revelForm ()  {
    $("#issueStockHolder").hidden = false;
}
/******************************************************************************/
$(function(){
    $("#issueStockForm").submit(function(){

        var symbol = document.getElementsByName("symbol");
        var companyName = document.getElementsByName("companyName");
        var stockAmount = document.getElementsByName("stockAmount");
        var companyVal = document.getElementById("companyValue");

        if(symbol.value.length === 0 || companyVal.value.length === 0 ||
            companyName.value.length === 0 || stockAmount.value.length === 0)
            $('error-holder').append("Missing Information");
        // Check we got integers where is needed. TODO
        if(stockAmount.value == 0)
            $('error-holder').append("Amount of stocks should be grater then zero");

        else{
            $.ajax({
                data:$(this).serialize(),
                url:this.action,
                timeout:2000,
                error: function(errorObject)
                {
                    console.error("Failed to add Stock!");
                    $("#error-holder").append(errorObject.responseText);
                },
                success:function()
                {
                    $('#issueStockHolder').hidden = true;
                }
            });
        }

    })
    }
)
/******************************************************************************/
function cancelForm()
{
    $('#issueStockHolder').hidden = true;
}
/******************************************************************************/