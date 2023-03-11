var thead = $("#placeholder-thead")[0]
var tbody = $("tbody")[0]

function returnFirst(list) {
    for (first in list) {
        return first
    }
}

addEventListener("load", function(e) {
    $.getJSON("/db/respostas", response => {
        let first = returnFirst(response)
        let tamanho = Object.keys(response[first]).length

        for (coluna in response) {
            let th = document.createElement("th")
            th.innerText = coluna
            thead.appendChild(th)
        }

        for (let linha = 0; linha < tamanho; linha++){
            let tr = document.createElement("tr")
            for (coluna in response) {
                let th = document.createElement("th")
                th.innerText = response[coluna][linha]
                tr.appendChild(th)
            }
            tbody.appendChild(tr)
        }
    }).fail(function(){return false})
})