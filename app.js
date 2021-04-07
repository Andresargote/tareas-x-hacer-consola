const { guardarDB, leerDB } = require("./helpers/guardarArchivo");
const { inquireMenu, pause, leerInput, listadoTreasBorrar, confirmar, mostrarListadoCheckList } = require("./helpers/inquirer");
const Tarea = require("./models/tarea");
const Tareas = require("./models/tareas");

const main = async () => {

    let opt = "";
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if(tareasDB) {//cargar tareas
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        //imprimir el menu de seleccion
        opt = await inquireMenu();

        switch (opt) {
            case "1":
                //lee la entreada de la tarea
                const desc = await leerInput("Descripcion:");
                //a la instancia tarea le agregamos una nueva
                tareas.crearTarea(desc);
            break;

            case "2":  
                //imprimimos las tareas
                tareas.listadoCompleto(tareas.listadoArr);

            break;

            case "3":  
                tareas.listarPendientesCompletadas(true);

            break;

            case "4":  
                tareas.listarPendientesCompletadas(false);

            break;

            case "5":  
                const ids = await mostrarListadoCheckList(tareas.listadoArr);
                tareas.toggleCompletadas(ids);

            break;

            case "6":  
                const id = await listadoTreasBorrar(tareas.listadoArr);
                if(id !== "0"){
                    const ok = await confirmar("¿Estas seguro?");
                    //preguntar si esta seguro
                    if(ok){
                        tareas.borrarTarea(id);
                        console.log();
                        console.log("Tarea borrada".green);
                    }
                }
                

            break;


        }

        guardarDB(tareas.listadoArr);

        await pause();

    } while (opt !== "0")

}

main(); 