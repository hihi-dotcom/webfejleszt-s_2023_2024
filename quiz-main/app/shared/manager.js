//Létrehoztuk a Manager osztályt, aminek 5 darab privát tulajdonsága van.

/**
 * 
 * @typedef {{questionText: String, answers: String[], rightAnswer:String}} Question //létrehoztam egy Question objektum definicióját a question.js alapján
 * @param {Question[]} questions //ezzel defináltam a Manager osztály array priv. tulajdonságának a típusát
 * 
 * @callback 
 * 
 * 
 */


class Manager{

    /**
     * @type {Question[]}
     */
    #array;

    /**
     * @type {number}
     */
    #currentQuestionNumber;

    /**
     * @type {Object}
     */
    #selectedAnswer;

    #nextQuestionCallback;

    #nextAnswersCallback;

    #finishCallback;

    #addCallback;

    constructor(array = []){
        this.#array = array;
        this.#currentQuestionNumber = 0;
        this.#selectedAnswer={};
        this.#addCallback = ()=>{};
    }

    setNextQuestionCallback(callback){
        this.#nextQuestionCallback = callback;
    }

    setNextAnswersCallback(callback){
        this.#nextAnswersCallback = callback;
    }

    setFinishCallback(callback){
        this.#finishCallback = callback;
    }

    setAddCallback(callback){
        this.#addCallback = callback;
    }

    add(question){
        this.#array.push(question);
        this.#addCallback(question);
    }

    nextQuestion(answer){
        this.#selectedAnswer[this.#currentQuestionNumber] = answer;
        this.#currentQuestionNumber++;
        if(this.#currentQuestionNumber < this.#array.length){
            this.#nextQuestionCallback(this.#array[this.#currentQuestionNumber].questionText);
            this.#nextAnswersCallback(this.#array[this.#currentQuestionNumber].answers);
        }else{
            let counter = 0;
            for(const index in this.#array){
                if(this.#array[index].rightAnswer === this.#selectedAnswer[index]){
                    counter++;
                }
            }
            this.#finishCallback(`A kérdéssor véget ért: ${this.#array.length}/${counter} válasz volt helyes.`);
        }
    }

    generateExportString(){
        let result = [];
        for(const question of this.#array){
            result.push(`${question.questionText};${question.answers.join(';')};${question.rightAnswer}`)
        }
        return result.join('\n');
    }

    start(){
        this.#nextQuestionCallback(this.#array[this.#currentQuestionNumber].questionText);
        this.#nextAnswersCallback(this.#array[this.#currentQuestionNumber].answers);
    }
}