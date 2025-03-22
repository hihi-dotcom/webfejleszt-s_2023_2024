/**
 * Létrehoztuk a Question osztályt, ami 3 privát tulajdonságot tartalmaz
 */

class Question {
    #questionText;
    #answers;
    #rightAnswer;

    //majd mindegyik privát tulajdonságnak létrehoztunk egy gettert is
    get rightAnswer(){
        return this.#rightAnswer;
    }

    get answers(){
        return this.#answers;
    }

    get questionText(){
        return this.#questionText
    }

    //az osztály konstruktora 3 kötelező paramétert vár, és ezek a paraméterek adnak értéket a 3 privát tulajdonságnak.
    constructor(questionText, answers, rightAnswer){
        this.#questionText=questionText;
        this.#answers=answers;
        this.#rightAnswer = rightAnswer;
    }
}