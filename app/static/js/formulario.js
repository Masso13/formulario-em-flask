const types = {
    text: "value",
    checkbox: "checked",
    number: "value",
    textarea: "value"
}

var form = $("form")
form.submit(event => {
    event.preventDefault()
    if (validate()) {
        getData().then(data => {
            fetch("/formulario/enviar",
                {
                    "method": "POST",
                    "headers": {"Content-Type": "application/json"},
                    "body": JSON.stringify(data)
                }
            ).then(response => {
                if (response.ok) {
                    alert("Formulário enviado com sucesso")
                } else {
                    alert("Um formulário já foi preenchido por essa máquina")
                }
            })
        })
    }
})

async function getData() {
    let data = []
    for (let i = 1; i<=$(".questoes").length;i++) {
        let input = $("#questao"+(i))[0]
        let value_of = types[input.type]
        data.push(
            {
                name: $("label")[i-1].innerText, 
                value: input[value_of],
            }
        )
    }
    return data
}

function validate() {
    for (let i = 1; i<=$(".questoes").length;i++) {
        let input = $("#questao"+(i))[0]
        let value_of = types[input.type]
        if ((input[value_of] == "" || input[value_of].length > 120) && input.type != "checkbox") {
            alert("Preencha o campo vazio da questão "+ i)
            return false
        }
    }
    return true
}