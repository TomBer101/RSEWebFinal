
$(function ()   // on load
{
    $('#loginForm').submit(function ()
    {
        var textFieldValue = document.getElementById('userNameTF');
        var brokerRadioValue = document.getElementById('bRadio');
        var adminRadioValue = document.getElementById('aRadio');

        if (textFieldValue.value.length === 0 || (!brokerRadioValue.checked && !adminRadioValue.checked))
        {
            $('#error-placeholder').empty().append("Missing information");
        }
        else
        {
            $.ajax({
                data: $(this).serialize(),
                url: this.action,
                timeout: 2000,
                error: function (errorObject)
                {
                    console.error("Failed to login!");
                    $("#error-placeholder").append(errorObject.responseText);
                },
                success: function(nextPageUrl)
                {
                    window.location.replace(nextPageUrl);
                }
            });
        }
        return false;
    });
});