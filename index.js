$(function() {
    loadrecipes();
    $(".recipes").on("click", ".btn-danger", handledelete);
    $(".recipes").on("click", ".btn-warning", handleupdate);
    $(".addrecipe").click(addrecipe);
    $(".savechanges").click(function() {
        var id = $(".updateid").val();
        var title = $(".updatetitle").val();
        var body = $(".updatebody").val();
        $.ajax({
            url: "https://usman-recipes.herokuapp.com/api/recipes/" + id,
            method: "PUT",
            data: { title, body },
            success: function(response) {
                console.log(response);
                loadrecipes();
                $("#updatemodel").modal("hide");
            }



        })

    })
});

function handleupdate() {

    var btn = $(this);
    var parentdiv = btn.closest("#divs");
    let id = parentdiv.attr("data-id");
    $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/recipes/" + id,
        method: "GET",
        success: function(response) {
            $(".updateid").val(response._id);
            $(".updatetitle").val(response.title);
            $(".updatebody").val(response.body);
            $("#updatemodel").modal("show");
        }
    });

}

function addrecipe() {
    var title = $("#title").val();
    var body = $("#body").val();
    $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/recipes",
        method: "POST",
        data: { title, body },
        success: function(response) {
            console.log(response);
            loadrecipes();
        }
    });
}



function handledelete() {
    var btn = $(this);
    var parentdiv = btn.closest("#divs");
    let id = parentdiv.attr("data-id");


    console.log(id);
    $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/recipes/" + id,
        method: "DELETE",
        success: function() {
            loadrecipes();
        }
    });

}


function loadrecipes() {
    $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/recipes",
        method: "GET",
        error: function(response) {
            var recipes = $(".recipes");
            recipes.html("An error has occured");
        },
        success: function(response) {
            console.log(response);
            var recipes = $(".recipes");
            recipes.empty();
            for (var i = 0; i <= response.length; i++) {
                var rec = response[i];
                recipes.append(`<div id="divs" data-id="${rec._id}"><h3 > ${ rec.title }</h3><p> ${rec.body}</p><button class="btn btn-warning btn-sm float-right">Edit</button><button class="btn btn-danger btn-sm float-right">Delete</button></div >`);
            }

        }

    });
}