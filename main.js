/*global $*/
/*global _*/

    //jquery ready - DONE
    //jquery ajax plant ids - DONE
    //alert(data) - DONE


$(document).ready(function(){
    //ajax trees
    $.ajax({
        type: 'GET',
        url: '/api/v1/trees',
        dataType: 'json',
        
        success: function(data) {
            $.each(data, function(index) {
                
                let id = data[index].id;
                //alert(id);
                let name = data[index].name;
                let photo = data[index].photo;
                let height = data[index].height;
                let width = data[index].width;
                let sun = data[index].sun;
                let soil = data[index].soil;
                let descr = data[index].descr;
                let htmlBuilder = "<tr><td>" + name + "</td><td>" + photo + "</td><td>" + height + "</td><td>" + width + "</td><td>" + sun + "</td><td>" + soil + "</td><td>" + descr + "</td></tr>";
               
                $("#whwTreeData").append(htmlBuilder);
            });
        }
    });
    $("#tree").click(function(){
        $(".treeToggle").toggle();
    });
    //ajax shrubs
    $.ajax({
        type: 'GET',
        url: '/api/v1/shrubs',
        dataType: 'json',
        
        success: function(data) {
            $.each(data, function(index) {
                
                let id = data[index].id;
                //alert(id);
                let name = data[index].name;
                let photo = data[index].photo;
                let height = data[index].height;
                let width = data[index].width;
                let sun = data[index].sun;
                let soil = data[index].soil;
                let spacing = data[index].spacing;
                let descr = data[index].descr;
                let htmlBuilder = "<tr><td>" + name + "</td><td>" + photo + "</td><td>" + height + "</td><td>" + width + "</td><td>" + sun + "</td><td>" + soil + "</td><td>" + spacing + "</td><td>" + descr + "</td></tr>";
               
                $("#whwShrubData").append(htmlBuilder);
            });
        }
    });
    $("#shrub").click(function(){
        $(".shrubToggle").toggle();
    });
    //ajax ground cover
    $.ajax({
        type: 'GET',
        url: '/api/v1/grounds',
        dataType: 'json',
        
        success: function(data) {
            $.each(data, function(index) {
                
                let id = data[index].id;
                //alert(id);
                let name = data[index].name;
                let photo = data[index].photo;
                let width = data[index].width;
                let sun = data[index].sun;
                let soil = data[index].soil;
                let water = data[index].water;
                let descr = data[index].descr;
                let htmlBuilder = "<tr><td>" + name + "</td><td>" + photo + "</td><td>" + width + "</td><td>" + sun + "</td><td>" + soil + "</td><td>" + water + "</td><td>" + descr + "</td></tr>";
               
                $("#whwGroundData").append(htmlBuilder);
            });
        }
    });
    $("#ground").click(function(){
        $(".groundToggle").toggle();
    });
    return false;
});
  
/*$(document).ready(() => {  
  $("#tree").click(function() {
         $.get("/api/v1/trees", function(data){
        //$("#whwData").html(data);           
     });
  }); 
  $("#shrub").click(function() {
         $.get("/api/v1/shrubs", function(data){
        //$("#whwData").html(data);           
     });
  }); 
  $("#ground").click(function() {
         $.get("/api/v1/grounds", function(data){
        //$("#whwData").html(data);           
     });
  }); 
});*/

//Common lodash https://colintoh.com/blog/lodash-10-javascript-utility-functions-stop-rewriting
