class Question{

    /**
     * @type {string}
     */
    #questionText;

    /** 
     * @type {string[]}
    */
    #answers;
    
    /**
     * @type {string}
     */
    #rightAnswers;

    get questionText(){
        return this.#questionText;
    };

    get answers(){
        return this.#answers;
    };

    get rightAnswers(){
        return this.#rightAnswers;
    };

    /**
     * 
     * @param {string} questionText 
     * @param {string} valaszok 
     * @param {string} helyesvalaszok 
     */

    constructor(questionText, valaszok = [], helyesvalaszok){
        this.#questionText = questionText;
        this.#answers = valaszok;
        this.#rightAnswers = helyesvalaszok;
    };
};