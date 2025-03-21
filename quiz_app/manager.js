class Manager{

    /**
     * @typedef {Question[]}
     */
    #array;

    /**
     * @type {number}
     */
    #currentQuestion;

    /**
     * @type {Object}
     */
    #selectedAnswer;

    /**
     * @type {string[]:void}
     */
    #nextquestioncallback;

    /**
     * @type {string[]:void}
     */
    #nextanswerscallback;

    #finishCallback;

    /**
     * 
     * @param {Question[]} tombparam 
     */
    constructor(tombparam){
        this.#array = tombparam;
        this.#currentQuestion = 0;
        this.#selectedAnswer = {};

        this.#nextquestioncallback = () => {};

        this.#nextanswerscallback = () => {};

        this.#finishCallback = () => {};
    };


    setNextQuestionCallback(callback){
        this.#nextquestioncallback = callback;
    };

    setNextAnswerCallback(callback){
        this.#nextanswerscallback = callback;
    };

    setFinischCallback(callback){
        this.#finishCallback = callback;
    };
    /**
     * 
     * @param {string} answer 
     */
    nextQuestion(answer){
        answer = this.#selectedAnswer[this.#currentQuestion];

        this.#currentQuestion++;

        if(this.#currentQuestion < this.#array.length){
            this.#nextquestioncallback(this.#array[this.#currentQuestion].questionText);
            this.#nextanswerscallback(answer);
        }

        else{
           let counter = 0;
            for(const index in this.#array){
                if(this.#array[index].rightAnswers === this.#selectedAnswer[index]){
                    counter++;
                }
            };

            this.#finishCallback(`A kérdéssornak vége van a helyes válaszok száma az összesből:  ${this.#array.length}/ ${counter}.`)
        }
    };

    start(){
        this.#nextquestioncallback(this.#array[this.#currentQuestion]);
        this.#nextanswerscallback(this.#array[this.#currentQuestion]);
    };
};