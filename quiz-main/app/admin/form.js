class FormController{
    #manager;
    #formFieldArray;

    constructor(manager, formFieldarray){
        this.#manager = manager;
        this.#formFieldArray = []
        
        const form = document.createElement('form');
        document.body.appendChild(form);

        for(const config of formFieldarray){
            const formField = new FormField(config.id, config.label, config.type, config.optional);
            this.#formFieldArray.push(formField);
            form.appendChild(formField.getDivElement());
        }
        const submitButton = document.createElement('button');
        submitButton.textContent = 'Hozzáadás';
        form.appendChild(submitButton);
        form.addEventListener('submit', this.#submitCallback());
    }

    #submitCallback(){
        return (e)=>{
            e.preventDefault();
            if (this.#validateFields()) {
                const value = this.#getValueObject();
                const answers = [
                    value.answer1,
                    value.answer2,
                    value.answer3,
                    value.answer4,
                ];
                const question = new Question(
                    value.questionText,
                    answers,
                    value.rightAnswer
                );
                this.#manager.add(question);
                e.target.reset();
            }
        }
    }

    #validateFields(){
        let valid = true;
        for(const formField of this.#formFieldArray){
            formField.error = '';
            if(!formField.optional){
                if(formField.value === ''){
                    formField.error = 'A mező kitöltése kötelező';
                    valid = false;
                }
            }
        }
        return valid;
    }

    #getValueObject(){
        const result = {};
        for(const formField of this.#formFieldArray){
            result[formField.id] = formField.value;
        }
        return result;
    }

}

class FormField{
    #id;
    #inputElement;
    #labelElement;
    #errorField;

    get id(){
        return this.#id;
    }



    get value(){
        return this.#inputElement.value;
    }

    set error(value){
        this.#errorField.textContent=value;
    }

    constructor(id, labelContent){
        this.#id = id;
        this.#labelElement = Gomszab.makeLabel(id, labelContent);
        this.#inputElement = Gomszab.makeInput(id);
        this.#errorField = Gomszab.makeErrorField();
    }

    getDivElement(){
        const div = Gomszab.makeDiv([this.#labelElement, this.#inputElement, this.#errorField]);
        return div;
    }
}