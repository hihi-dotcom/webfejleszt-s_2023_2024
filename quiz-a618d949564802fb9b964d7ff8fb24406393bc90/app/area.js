class Area{
    #div;

    get div(){
        return this.#div;
    }

    constructor(cssClass, manager){
        const container = this.#getContainer();
        this.#div = document.createElement('div');
        this.#div.className = cssClass;
        container.appendChild(this.#div);
        manager.setFinishCallback((resultText) => {
            container.innerHTML = '';
            const resultDiv = document.createElement('div');
            resultDiv.className = 'result';
            resultDiv.textContent = resultText
            container.appendChild(resultDiv);
        })
    }

    #getContainer(){
        let container = document.querySelector('.container');
        if(!container){
            container = document.createElement('div');
            container.className = 'container';
            document.body.appendChild(container);
        }
        return container;
    }
}

class AnswersArea extends Area{
    constructor(cssClass, manager){
        super(cssClass, manager)

        manager.setNextAnswersCallback((answers) => {
            this.div.innerHTML = '';
            for(const answer of answers){
                const answerCard = document.createElement('div');
                answerCard.className = 'item';
                answerCard.textContent = answer;
                answerCard.addEventListener('click', () => {
                    manager.nextQuestion(answer);
                })
                this.div.appendChild(answerCard);
            }
        })
    }
}

class QuestionArea extends Area{
    constructor(cssClass, manager){
        super(cssClass, manager)
        manager.setNextQuestionCallback((questionText) => {
            this.div.innerHTML = '';
            const questionCard = document.createElement('div');
            questionCard.textContent = questionText;
            this.div.appendChild(questionCard);
        })
    }
}