class Area{
    #div;

    get div(){
        return this.#div;
    };

    /**
     * 
     * @param {string} param1 
     */
    constructor(param1){
        const gettingContainer = this.#getContainer();

        const div_1 = document.createElement('div');

        div_1.classList.add(param1);

        this.#div = div_1;

        gettingContainer.appendChild(this.#div);
    };



    #getContainer(){
        let kontener = document.querySelector('.container');
        if(!kontener){
            kontener = document.createElement(`div`);
            kontener.classList.add('container');
            document.body.appendChild(kontener);
        };

        return kontener;
    };
};


class QuestionArea extends Area{

    /**
     * 
     * @param {string} classstring 
     */
    constructor(classstring){
        super(classstring);
    }
};


class AnswerArea extends Area{

    /**
     * 
     * @param {string} osztalystring 
     */
    constructor(osztalystring){
        super(osztalystring);
    };
};