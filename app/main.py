from flask import Flask, render_template, request, abort, send_from_directory
from pandas import DataFrame, read_csv, concat
from os.path import exists, join
import sys

app = Flask(__name__)

@app.route("/<page>")
def template(page):
    return render_template(f"{page}.html")

@app.route("/formulario/enviar", methods=["POST"])
def form():
    base = {c:request.form[c] for c in request.form}
    base.update({"IP":request.remote_addr})
    if exists("{}.csv".format(request.args["form"])):
        data = read_csv("{}.csv".format(request.args["form"]))
        if len(data[data["IP"] == base["IP"]]) > 0:
            return "Formulário preenchido por esta maquina"
        data = concat([data, DataFrame([base])])
    else:
        data = DataFrame([base])

    data.to_csv("{}.csv".format(request.args["form"]), index=False)
    
    return "Enviado com sucesso"

@app.route("/db/<table>", methods=["GET"])
def planilha(table):
    if exists(f"{table}.csv"):
        return read_csv(f"{table}.csv").to_json(force_ascii=False)
    else:
        abort(404)

@app.route('/favicon.ico') 
def favicon(): 
    return send_from_directory(join(app.root_path, 'static'), 'favicon.ico', mimetype='img/favicon-32x32.png')

if __name__ == "__main__":
    app.run(debug=True, host=sys.argv[1], port=sys.argv[2])