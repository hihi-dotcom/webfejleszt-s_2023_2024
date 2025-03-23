class Table{//létrehoztunk egy Table osztályt
    
    /**
     * @type {Manager}
     */
    #manager;

    /**
     * 
     * @param {Manager} manager 
     */
    constructor(manager){
        this.#manager = manager;//értékül adjuk a constructor bemeneti paraméterét a manager privát tulajdonságunknak
        const tbody = Gomszab.makeTableWithHeader(['Kérdés', 'válasz1', 'válasz2', 'válasz3', 'válasz4', 'helyes válasz']);//a Table osztály constructorába létrehoztunk egy 6 oszlopos táblázatot, amelynek fejlécei a a stringek.
        this.#manager.setAddCallback(this.#addCallback(tbody))//meghívtuk a manager osztály setAddcallback függvényét, amelynek paraméterül adtuk az addCallback függvény visszatérési értékét a tbody paraméter esetén
    }

    #addCallback(tbodyElement){//definiáltam az addCallback függvényt, amelynek egy paramétere van, ami egy HTMLELement

       return (question) => {//a függvény egy callbackkel tér vissza, amely egy question értéket vár
        const tableRow = document.createElement('tr');//Létrehozunk mindig egy sort a question példány alapján
        tbodyElement.appendChild(tableRow);//hozzáfűzzük a most létrehozott sort a függvény paraméteréhez, ami egy HTMLELement
        
        Gomszab.makeCellToRow(tableRow, question.questionText); //csináltunk egy cellát, a paraméterben megadott tartalommal és hozzáfűztük a paraméterben szereplő parenthez, ami most a tr sorunk, amit most hoztunk létre.
        for(const answer of question.answers){//bejárjuk egy for ofal a callback paraméterében megkapott question példányunk answers tulajdonságát, ami egy tömb
            Gomszab.makeCellToRow(tableRow, answer); //minden egyes iteráció során létrehozunk egy cellát és hozzáfűzzük az általunk átadott parenthez, ami most jelen esetben a most létrehozott sorunk
        }
        Gomszab.makeCellToRow(tableRow, question.rightAnswer);//ismételten csinálunk egy cellát, amelyben a callback paraméterében szereplő question példányunk rightAnswer tulajdonsága fog kerülni és az általunk csinált tableRowhoz lesz hozzáfűzve
      }
    }
}