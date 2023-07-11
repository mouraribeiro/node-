// modulos externos

const inquirer = require("inquirer")
const chalk = require("chalk")

//modulos internos

const fs = require("fs")

console.log("iniciamos o account")
operation()

function operation(){
    inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "O que deseja fazer?",
            choices: [
                "Criar Conta",
                "Consultar saldo",
                "Depositar",
                "Sacar",
                "Sair"
            ]
        }
    ]).then((answer) => {
    
        const action = answer['action']
        if (action === "Criar Conta"){
            createAccount()
        }
    })
    .catch((err => console.log(err)))

}

function createAccount(){
    console.log(chalk.bgGreen.black("Parabéns por escolher nosso banco!"))
    console.log(chalk.green("Defina as opções da sua conta a seguir: "))
    buildAccount()
}


function buildAccount(){
    inquirer.prompt([
        {
            name: "accountName",
            message: "Digite um nome para sua conta: "
        }
    ]).then((answer) => {
        console.log(answer)
    })
    .catch((err) => console.log(err))
}