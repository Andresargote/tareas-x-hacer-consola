const colors = require("colors");
const Tarea = require("./tarea");

class Tareas {

    _listado = {};

    get listadoArr(){

        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        })


        return listado;
    }

    constructor() {

        this._listado = {}
        
    }

    borrarTarea(id = ""){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    cargarTareasFromArray(tareas = []){

        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        })

    }

    crearTarea(desc = ""){

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;

    }

    listadoCompleto(){

        console.log();
        this.listadoArr.forEach((tarea, index) => {
        
            const idx = colors.green(index + 1);
            const {desc, completadoEn} = tarea; 
            const completado = completadoEn === null ? "Pendiente".red : "Completada".green;

            console.log(`${idx}. ${desc} :: ${completado}`);

        })

    }

    listarPendientesCompletadas(completadas = true){

            console.log();
            this.listadoArr.forEach((tarea, index) => {
                    const idx = colors.green(index + 1);
                    const {desc, completadoEn} = tarea; 
                    const completado = completadoEn === null ? "Pendiente".red : "Completada".green;

                    if(completadas){
                        tarea.completadoEn && console.log(`${idx}. ${desc} :: ${completado}`);
                    }else{
                        tarea.completadoEn === null && console.log(`${idx}. ${desc} :: ${completado}`);
                    }
            })
        }

    toggleCompletadas(ids = []){

        ids.forEach(id => {
            const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach(tarea => {
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }
}


module.exports = Tareas;