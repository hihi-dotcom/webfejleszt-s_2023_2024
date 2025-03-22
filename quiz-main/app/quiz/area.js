/**
 * Létrehoztuk az Area osztályt, amely   ősosztálya lesz másik kettő osztálynak
 * ,aminek 2 privát tulajdonsága van,    egy div és egy manager
 * 
 */

class Area{

    /**
     * @type {HTMLElement}
     */
    #div;

    /**
     * @type {Manager}
     */
    #manager;

    get manager(){// a manager privát tulajdonságnak is csináltunk egy gettert
        return this.#manager;
    }

    
    get div(){//a div privát tulajdonságnak csináltunk egy gettert is
        return this.#div;
    }

    //a konstruktor két paramétert vár(stringet és egy managert), ami a CSS osztály és a Manager osztály egy példánya lesz
    constructor(cssClass, manager){
        //értékül adjuk a manager priv. tulajdonságunknak a constructor bemeneti paraméterét(manager)
        this.#manager = manager;
        const container = this.#getContainer();//meghívjuk az osztály getContainer priv. függvényét a konstruktorban és elrakjuk egy változóba.
        this.#div = document.createElement('div');//létrehozunk egy div elemet, amit eltárolunk a div privát tulajdonságunkban
        this.#div.className = cssClass;//beállítjuk a paraméterként kapott css osztályt, a divünknek,(a className-el) amit az előbb hoztunk létre.
        container.appendChild(this.#div);//hozzácsatoljuk a containerünkhöz a privát tulajdonságot,ami ugye egy div.
        this.manager.setFinishCallback(this.#getFinishCallback(container))//beállítjuk a finishCallback értékét a setFinishCallbackkel, amiben meghívjuk a getFinishCallbacket, a containerünkkel
    }
/**
 * 
 * @param {HTMLElement} containerDiv 
 * @returns 
 */
    #getFinishCallback(containerDiv){//létrehozzuk a getFinischCallback függvényt, aminek egy paramétere van a containerünk

        //visszatérünk egy arrow functionnel
        return (resultText) => {//a callbackünknek egy bemeneti paramétere van(string)
            containerDiv.innerHTML = '';//töröljük a megkapott containerünk tartalmát
            const resultDiv = document.createElement('div');//majd létrehozunk egy divet 
            resultDiv.className = 'result';//a most létrehozott divnek megadjuk a result css Class-t
            resultDiv.textContent = resultText// a most létrehozott div textContent tulajdonságának megadjuk a callback paraméterét
            containerDiv.appendChild(resultDiv);//majd a getter függvény paramétereként megkapott containerünkhöz hozzáfűzzük a most létrehozott divet.
        }
    }


    //az osztálynak létrehoztuk a getContainer privát függvényt
    #getContainer(){
        let container = document.querySelector('.container');//megkeressük, van e már container osztállyal rendelkező div
        if(!container){//ha nincs tehát null az értéke, akkor létrehozunk egyet és hozzáfűzzük a HTMLhez
            container = document.createElement('div');
            container.className = 'container';
            document.body.appendChild(container);
        }
        return container;//majd a végén visszatérünk a létrehozott objektummal
    }
}

//Leszármaztunk az Area osztályból egy AnswersArea osztályt
//ez fogja majd tartalmazni a válaszokat
class AnswersArea extends Area{

    //a konstruktorban megadtuk a cssClasst, bemeneti paraméterként

    /**
     * 
     * @param {string} cssClass 
     * @param {Manager} manager 
     */
    constructor(cssClass, manager){
        super(cssClass, manager);//meghívtuk az ősosztály konstruktorát, és megadtuk neki a cssClass bemeneti paramétert és a managert is 

        this.manager.setNextAnswersCallback(this. #getNextAnswerCallback()); //a setNextAnswersCallback segítségével megadtuk mi történjen ha lefut a manager nextAnswerCallbackje(meghívjuk a NextAnswerCallback getterét)
    }

    #getNextAnswerCallback(){
        //a callback visszatérése egy arrowfunction
        return (answers) => {//a callback paraméter egy string tömböt tartalmaz ez az answers
            this.div.innerHTML = ''; //töröljük a div tartalmát
            for(const answer of answers){//majd egy for of ciklussal bejárjuk az answers string tömböt
                const answerCard = document.createElement('div');//minden egyes iteráció során létrehozunk egy divet
                answerCard.className = 'item';//ennek a divnek megadjuk az item cssClass-t
                answerCard.textContent = answer;//majd megadjuk az div textContentjének az answers tömb 1 elemét 
                answerCard.addEventListener('click', this.#clickOnAnswerCard(answer)); //a létrehozott divünknek csinálunk egy eseménykezelőt a click eseményre, amiben meghívjuk a clickonAnswerCard függvényt az aktuális ciklusváltozóval
                this.div.appendChild(answerCard);//majd a megörökölt divhez(aminek a tartalmát az elején töröltük), hozzáfűzzük a most létrehozott divünket.
            }
        }
    }

    #clickOnAnswerCard(answer){
        return () => {
            this.manager.nextQuestion(answer);
        }
    }
}

//Leszármaztunk az Area osztályból és létrehoztuk a QuestionArea osztályt
//ez fogja majd tartalmazni az aktuális kérdés szövegét
class QuestionArea extends Area{

    //itt is természetesen megcsináltuk hogy egy bemeneti paramétert várjon, ami a cssClass(string)
    /**
     * 
     * @param {string} cssClass 
     * @param {Manager} manager 
     */
    constructor(cssClass, manager){
        super(cssClass, manager); //itt is meghívtuk az ősosztály konstruktorát, a cssClass és a Manager bemeneti paraméterrel 
        this.manager.setNextQuestionCallback(this.#getNextQuestionCallback());//A setNextQuestionCallback segítségével beállítjuk mi történjen, ha meghívjuk a getnextQuestionCallbacket a manager osztályban
    }

    #getNextQuestionCallback(){
        return (questionText) => {//itt egy string bemeneti paramétert tartalmaz, ami a questionText
            this.div.innerHTML = '';//először itt is töröltük a megörökölt div tartalmát
            const questionCard = document.createElement('div');//majd létrehotunk egy új divet(HTMLElement)

            questionCard.className = 'question';//aztán beállítjuk neki a question osztályt
            questionCard.textContent = questionText;//majd az újonnan létrehozott div textContent tulajdonságának megadtuk a callback paraméterében található stringet(questionText)
            this.div.appendChild(questionCard);//majd a megörökölt divhez,(aminek a tartalmát töröltük), hozzáfűzzük a most létrehozott divet
        }
    }
}