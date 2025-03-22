/**
 * Létrehoztuk az Area osztályt, amely   ősosztálya lesz másik kettő osztálynak
 * ,aminek elsőkörben egy privát tulajdonsága van, egy div
 */

class Area{
    #div;
    #manager;

    get manager(){
        return this.#manager;
    }

    
    get div(){//a div privát tulajdonságnak csináltunk egy gettert is
        return this.#div;
    }

    //a konstruktor egy paramétert vár(stringet), ami a CSS osztályt fogja tartalmazni
    constructor(cssClass, manager){
        this.#manager = manager;
        const container = this.#getContainer();//meghívjuk az osztály getContainer priv. függvényét a konstruktorban és elrakjuk egy változóba.
        this.#div = document.createElement('div');//létrehozunk egy div elemet, amit eltárolunk a div privát tulajdonságunkban
        this.#div.className = cssClass;//beállítjuk a paraméterként kapott css osztályt, a divünknek,(a className-el) amit az előbb hoztunk létre.
        container.appendChild(this.#div);//hozzácsatoljuk a containerünkhöz a privát tulajdonságot,ami ugye egy div.
        this.manager.setFinishCallback(this.#getFinishCallback(container))
    }

    #getFinishCallback(containerDiv){
        return (resultText) => {
            containerDiv.innerHTML = '';
            const resultDiv = document.createElement('div');
            resultDiv.className = 'result';
            resultDiv.textContent = resultText
            containerDiv.appendChild(resultDiv);
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
        super(cssClass, manager);//meghívtuk az ősosztály konstruktorát, és megadtuk neki a cssClass bemeneti paramétert elsőkörben 

        this.manager.setNextAnswersCallback(this. #getNextAnswerCallback())
    }

    #getNextAnswerCallback(){
        return (answers) => {
            this.div.innerHTML = '';
            for(const answer of answers){
                const answerCard = document.createElement('div');
                answerCard.className = 'item';
                answerCard.textContent = answer;
                answerCard.addEventListener('click', this.#clickOnAnswerCard(answer))
                this.div.appendChild(answerCard);
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
        super(cssClass, manager); //itt is meghívtuk az ősosztály konstruktorát, a cssClass bemeneti paraméterrel elsőkörben
        this.manager.setNextQuestionCallback(this.#getNextQuestionCallback())
    }

    #getNextQuestionCallback(){
        return (questionText) => {
            this.div.innerHTML = '';
            const questionCard = document.createElement('div');
            questionCard.textContent = questionText;
            this.div.appendChild(questionCard);
        }
    }
}