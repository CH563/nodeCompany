$(function () {
    var baseUrl = 'http://localhost:8888'
    $('#register').on('click', function (e) {
        e.preventDefault();
        var userName = $('#name').val();
        var password = $('#password').val();
        $.ajax({
            type: "post",
            url: baseUrl + "/register",
            dataType: "json",
            data: {
                username: userName,
                password: password
            },
            success: function (response) {
                console.log(response);
            }
        });
    })
});
