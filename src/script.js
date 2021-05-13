
const Modal = {
    open() {
        //abrir modal
        //adicionar a class active ao modal
        document.
            querySelector('.modal-overlay')
            .classList
            .add('active')


    },
    close() {
        //fechar o modal
        //remover a class active do modal
        document.
            querySelector('.modal-overlay')
            .classList
            .remove('active')
    }
}

const transactions = [
    {

        description: 'Agua',
        amount: -30000,
        date: '23/02/2021',
    },
    {

        description: 'Website',
        amount: 500000,
        date: '23/01/2021',
    },
    {

        description: 'Internet',
        amount: -2000,
        date: '23/01/2021',
    },
]

const Transaction = {
    all: transactions,
    add(transaction) {
        Transaction.all.push(transaction)


        App.reload()

    },

    remove(index) {
        Transaction.all.splice(index, 1)
        App.reload()

    },
    incomes() {
        //somar as entradas
        let income = 0;
        Transaction.all.forEach(transaction => {
            if (transaction.amount > 0) {
                income += transaction.amount;
            }

        })
        return income;
    },
    expenses() {
        //somar as saidas
        let expense = 0;
        Transaction.all.forEach((transaction) => {
            if (transaction.amount < 0) {
                expense += transaction.amount;
            }

        })
        return expense;
    },
    total() {
        //entradas - saidas
        return Transaction.incomes() + Transaction.expenses();
    }
}

// substituir os dados do HTML com os dados do JS

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),
    addTransaction(transaction, index) {

        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)

        DOM.transactionsContainer.appendChild(tr)


    },


    innerHTMLTransaction(transaction) {
        const CSSclasses = transaction.amount > 0 ? "income" : "expense"
        const amount = Utils.formatCurrency(transaction.amount)




        const html = `
        <td class="description">${transaction.description}</td>
                        <td class=${CSSclasses}>${amount}</td>
                        <td class="date">${transaction.date}</td>
                        <td>
                            <img src="./assets/minus.svg" alt='Remover transação'>
                        </td>
                    `
        return html
    },

    updabeBalance() {
        document.getElementById('incomeDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.incomes())
        document.getElementById('expenseDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.expenses())
        document.getElementById('totalDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.total())
    },

    clearTransactions() {
        DOM.transactionsContainer.innerHTML = ""
    }
}

const Utils = {
    formatAmount(value) {
       value = Number(value) * 100 
       return value
    },
    formatDate(date) {
        const splitedDate = date.split("-")
        return `${splitedDate[2]}/${splitedDate[1]}/${splitedDate[0]}`

    },
    formatCurrency(value) {
        const signal = Number(value) < 0 ? '-' : ""
        value = String(value).replace(/\D/g, "")
        value = Number(value) / 100
        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })
        return signal + value
    }
}

const Form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),
    
    getValues() {
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },

    
    validateFields() {
        const { amount, date, description } = Form.getValues()
        if(description.trim() === "" || amount.trim() === "" || date.trim() === "") {
            throw new Error("Por favor preencha todos os campos")
        } 
    },

    formatValues() {
        let { amount, date, description } = Form.getValues()
        amount = Utils.formatAmount(amount)
        date = Utils.formatDate(date)
        return { amount, date, description }


    },
    
    clearFields(){
        Form.description.value = ""
        Form.amount.value = ""
        Form.date.value = ""
    },

    
    
    
    submit(event){
    event.preventDefault()
        try {
            Form.validateFields()
            const transaction = Form.formatValues()

    //verificar se todas as informções foram preenchidas
   
    // formatar dados para salvar 
    
    // salvar 
    Transaction.add(transaction)
    // apagar dados do formulario
    Form.clearFields()
    //fechar modal
    // atualizar a aplicação
            
        } catch (error) {
            alert(error.message)
            
        }



    
    


}
}

const App = {
    init() {
        Transaction.all.forEach(transaction => {
            DOM.addTransaction(transaction)

        })


    },


    reload() {
        DOM.clearTransactions()
        App.init()
    },
}

App.init()



