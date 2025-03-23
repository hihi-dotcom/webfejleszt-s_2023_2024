class Question {
    #questionText;
    #answers;
    #rightAnswer;

    get rightAnswer(){
        return this.#rightAnswer;
    }

    get answers(){
        return this.#answers;
    }

    get questionText(){
        return this.#questionText
    }

    constructor(questionText, answers, rightAnswer){
        this.#questionText=questionText;
        this.#answers=answers;
        this.#rightAnswer = rightAnswer;
    }
}