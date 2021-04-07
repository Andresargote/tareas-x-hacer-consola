const inquirer = require("inquirer");
const colors = require("colors");//importamos los colores

const preguntas = [
    {
        type: "list",
        name: "opcion",
        message: "¿Que deseas hacer?",
        choices: [
            {
                value: "1",
                name: `${"1.".green} Crear tarea`
            },
            {
                value: "2",
                name: `${"2.".green} Listar tareas`
            },
            {
                value: "3",
                name: `${"3.".green} Listar tareas completadas`
            },
            {
                value: "4",
                name: `${"4.".green} Listar tareas pendientes`
            },
            {
                value: "5",
                name: `${"5.".green} Completar tarea(s)`
            },
            {
                value: "6",
                name: `${"6.".green} Borrar tarea`
            },
            {
                value: "0",
                name: `${"0.".green} Salir`
            },
        ]
    }
];

const inquireMenu = async () => {
    console.clear();
    console.log(colors.rainbow("======================="));
    console.log(" Seleccione una opcion");
    console.log(colors.rainbow("=======================\n"));

    const { opcion } = await inquirer.prompt(preguntas);
    return opcion;

}

const pause = async () => {

    const question = [
        {
            type: "input",
            name: "enter",
            message: `Presione ${colors.green("ENTER")} para continuar`
        }
    ]

    console.log("\n")
    await inquirer.prompt(question);
}

const leerInput = async (message) => {

    const question = [
        {
            type: "input",
            name: "desc",
            massage: message,
            validate(value) {
                if (value.length === 0) {
                    return "Por favor ingrese un valor";
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);

    return desc;

}

const listadoTreasBorrar = async (tareas = []) => {
    const choices = tareas.map((tarea, index) => {

        const idx = `${index + 1}`.green;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }

    })

    choices.unshift({
        value: "0",
        name: "0".gren + " Cancelar"
    })

    const preguntas = [
        {
            type: "list",
            name: "id",
            message: "Borrar",
            choices
        }
    ]

    const { id } = await inquirer.prompt(preguntas);
    return id;


}

const confirmar = async (mensaje) => {

    const question = [
        {
            type: "confirm",
            name: "ok",
            message: mensaje
        }
    ];

    const {ok} = await inquirer.prompt(question);
    return ok;
}

const mostrarListadoCheckList = async (tareas = []) => {
    const choices = tareas.map((tarea, index) => {

        const idx = `${index + 1}`.green;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false,
        }

    })

    const pregunta = [
        {
            type: "checkbox",
            name: "ids",
            message: "Sellecione",
            choices
        }
    ]

    const { ids } = await inquirer.prompt(pregunta);
    return ids;


}

module.exports = {
    inquireMenu,
    pause,
    leerInput,
    listadoTreasBorrar,
    confirmar,
    mostrarListadoCheckList
}