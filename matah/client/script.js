$( document ).ready(function() {
    getData();
});

function getData () {
    $.get("../server/pokedex.json", function(data, status){
        renderData(data);
    });
}

function renderData (data) {
    let fiveArray = (getFiveRandomNumbers(getExcludeArray()));
    $(".pokemonTableContent").html("");
    $(".pokemonDetails").html("");
    $(".pokemonTableContent").append(
        $("<tr></tr>",{class:"tableHead"}).append(
            $("<th></th>",),
            $("<th></th>",{text:"Pokemon"}),
        )
    );
    for (let index = 0; index < fiveArray.length; index++) {
        $(".pokemonTableContent").append(
            $("<tr></tr>",{class:"tableBody"}).append(
                $("<td></td>",).append(
                    $("<img>",{class:"pokemonImg",src:"../server/thumbnails/"+("000"+data[fiveArray[index]].id).slice(-3)+".png"})
                ),
                $("<td></td>",{class:"pokemonName",text:data[fiveArray[index]].name.english,"data-id":data[fiveArray[index]].id,onclick:"showSingleDetail(this)"}),
            )
        );
        renderDetails(data[fiveArray[index]]);
        
    }
    
}

function getFiveRandomNumbers(excludeArray) {
    var arr = [];
    while(arr.length < 5){
        var r = Math.floor(Math.random() * 809) + 1;
        if (excludeArray.includes(r)){
            var r = Math.floor(Math.random() * 809) + 1;
        }
        if(arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
}

function getExcludeArray() {
    var arr = [];
    $('.pokemonName').each(function(index) {
        arr[index] = $(this).attr("data-id");
   });
   return arr;
}
function renderDetails(details){
    $(".pokemonDetails").append(
        $("<div></div>",{class:"pokemonSingleDetail pokemonId"+details.id}).append(
            $("<div></div>",{class:"singlePokemon"}).append(
                $("<div></div>").append(
                    $("<img>",{class:"pokemonBigImg",src:"../server/images/"+("000"+details.id).slice(-3)+".png"})
                ),
                $("<div></div>",{class:"singlePokemonDetails"}).append(
                    $("<div></div>",{text:"Name: " + details.name.english}),
                    $("<div></div>",{text:"Type: " + details.type}),
                    $("<div></div>",{text:"Base: ",class:"baseDetails"}).append(
                        $("<div></div>",{text:"HP: " + details.base.HP}),
                        $("<div></div>",{text:"Attack: " + details.base.Attack}),
                        $("<div></div>",{text:"Defense: " + details.base.Defense}),
                        $("<div></div>",{text:"Sp. Attack: " + details.base["Sp. Attack"]}),
                        $("<div></div>",{text:"Sp. Defense: " + details.base["Sp. Defense"]}),
                        $("<div></div>",{text:"Speed: " + details.base.Speed}),
                    )
                )
            ),
            $("<button></button>",{text:"Back",class:"backBtn",onclick:"backToHome()"})
        )   
    );
}

function showSingleDetail(elem){
    $(".pokemonSingleDetail").css("display","none");
    $(".homeContent").css("display","none");
    $(".pokemonSingleDetail.pokemonId" + $(elem).attr("data-id")).css("display","block");
}

function backToHome(){
    $(".pokemonSingleDetail").css("display","none");
    $(".homeContent").css("display","block");

}