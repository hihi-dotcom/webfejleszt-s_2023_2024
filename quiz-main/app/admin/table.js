class Table{
    #manager;

    constructor(manager){
        this.#manager = manager;
        const tbody = Gomszab.makeTableWithHeader(['Kérdés', 'válasz1', 'válasz2', 'válasz3', 'válasz4', 'helyes válasz']);
        this.#manager.setAddCallback(this.#addCallback(tbody))
    }

    #addCallback(tbodyElement){
       return (question) => {
        const tableRow = document.createElement('tr');
        tbodyElement.appendChild(tableRow);
        
        Gomszab.makeCellToRow(tableRow, question.questionText)
        for(const answer of question.answers){
            Gomszab.makeCellToRow(tableRow, answer)
        }
        Gomszab.makeCellToRow(tableRow, question.rightAnswer)
      }
    }
}