$(function ()
{
    $('loginForm').submit(function ()
    {
        $.ajax({
            data: $(this).serialize(),
            url: this.action,
            timeout: 2000,
            error: function (errorObject)
            {
                console.error("Failed to login!");
                $("#error-placeholder").append(errorObject.responseText)
            },
            success: function(nextPageUrl)
            {
                window.location.replace(nextPageUrl);
            }
        });
        return false;
    });
});