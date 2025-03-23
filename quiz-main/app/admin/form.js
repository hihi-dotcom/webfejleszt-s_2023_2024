//Létrehoztuk a FormController osztályt

class FormController{

    /**
     * @type {Manager}
     */
    #manager;

    /**
     * @type {FormField[]}
     */
    #formFieldArray;

    /**
     * 
     * @param {Manager} manager 
     * 
     * */
    constructor(manager, formFieldarray){
        this.#manager = manager;//megadtuk a Formcontroller privát manager tulajdonságnak értékül a constructorban megkapott manager bemeneti paramétert 
        this.#formFieldArray = []//A formFieldArray privát tulajdonságunknak kezdetben üres tömb értéket adunk
        
        const form = document.createElement('form');
        document.body.appendChild(form);//Létrehozunk egy formot (HTMLElement) és hozzáfűzzük a HTML fájlunkhoz.

        for(const config of formFieldarray){//végigiteráltunk a formFieldarray tömbünkön egy for of ciklussal
            const formField = new FormField(config.id, config.label, config.type, config.optional);//majd minden iteráció alkalmával példányosítottunk egy FormFieldet, a megfelelő paraméterekkel
            this.#formFieldArray.push(formField);//a cikluson belül hozzáfűzzük a formFieldArray privát tulajdonságunkhoz a formField példányokat
            form.appendChild(formField.getDivElement());//még a cikluson belül a formField getDivElement függvényének visszatérését, ami ugyebár egy Div elem hozzáfűzzük a formunkhoz, amit még a constructorban hoztunk létre
        }
        const submitButton = document.createElement('button'); //Létrehozunk egy gombot(HTML button)
        submitButton.textContent = 'Hozzáadás';//tartalmának beállítjuk a hozzáadást
        form.appendChild(submitButton);//hozzáfűzzük a formunkhoz, amit fentebb hoztunk létre
        form.addEventListener('submit', this.#submitCallback());//létrehoztunk egy eventListenert a formunk submit eseményére, amelyben meghívjuk a submitCallback privát függvényt
    }

    #submitCallback(){//ez a submitCallback privát függvényünk tartalmazza a form eventListenerjének törzsét
        return (e)=>{//visszatérünk egy e paraméterű arrow functionnel
            e.preventDefault();//elsőként megakadályozza, hogy lefusson az alapértelmezett működés
            if (this.#validateFields()) {//elsőkörben ellenőrizzük,hogy a formunk fieldjei helyesen vannak e kitöltve a privát validateFields függvényünk meghívásával
                const value = this.#getValueObject();//eltároljuk a kulcs érték párjainkat egy változóban a privát getValueObject függvény segítségével
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
                ); //példányosítottunk egy questiont, a fentebb megkapott kulcsérték párok megfelelő tulajdonságaival
                this.#manager.add(question);//a managerhez hozzáadjuk a példányosított questionünket a manager add függvényével
                e.target.reset();//majd reseteljük a formot
            }
        }
    }

    #validateFields(){//létrehoztunk egy privát függvényt a FormControllernek, ami a validateFields nevet viseli
        let valid = true;//deklarálok egy boolean változót
        for(const formField of this.#formFieldArray){//végig iterálok a formFieldArray privát tuljadonságon egy for of ciklussal
            formField.error = '';//minden egyes iteráció során töröljük a formfield példányához tartozó errorfield tartalmát az error setter segítségével
            if(!formField.optional){//ha a formField példány optional tulajdonságának értéke null, akkor
                if(formField.value === ''){//ellenőrizzük,hogy az input beviteli mezőbe van-e valami írvaa value getterrel 
                    formField.error = 'A mező kitöltése kötelező';//ha pedig üres, akkor megjelenítjük ismételten az error setterét használva a hiba üzenetünket
                    valid = false;// a valid változó értékét pedig falsera állítjuk
                }
            }
        }
        return valid;//majd a végén visszatérünk a valid változó értékével, természetesen annak függvényében tér vissza igazzal vagy hamissal, hogy üres volt e a mező
    }

    #getValueObject(){//definiáltam a FormFieldControllernek egy getValueOBject privát függvényt
        const result = {};//létrehozunk egy üres result objektumot
        for(const formField of this.#formFieldArray){//végigiterálunk a formFieldArray privát tulajdonságban található tömbön a FormController osztályunknak
            result[formField.id] = formField.value;//majd a formField példány id-jával hozzárendeli az üres objektumhoz a formField példány értékét
        }
        return result;// majd visszatér vele
    }

}

//Létrehoztuk a FormField osztályt is
class FormField{

    /**
     * @type {string}
     */
    #id;

    /**
     * @type {HTMLInputElement}
     */
    #inputElement;

    /**
     * @type {HTMLLabelElement}
     */
    #labelElement;

    /**
     * @type {HTMLSpanElement}
     */
    #errorField;


    get id(){//definiáltunk egy id gettert
        return this.#id;
    }



    get value(){//definiáltunk egy value gettert, ami az inputElementben eltárolt elem value tulajdonságának értékét adja vissza
        return this.#inputElement.value;
    }

    /**
     * @param {string} value 
     */
    set error(value){//definiáltunk egy settert error néven, ami beállítja az errorField textContentjének(tartalmának) a bemeneti string paramétert
        this.#errorField.textContent=value;
    }

    /**
     * 
     * @param {string} id 
     * @param {string} labelContent 
     */
    constructor(id, labelContent){
        this.#id = id;//az id privát tulajdonság értéke az id bemeneti paraméter lett
        this.#labelElement = Gomszab.makeLabel(id, labelContent);//itt a bemeneti paraméterkétn kapott id lesz a label for tulajdonságához rendelve, a label tartalma pedig a labelContent lesz majd(eltároljuk a létrehozott label labelElementet a Formfield privát labelElement tulajdonságába)
        this.#inputElement = Gomszab.makeInput(id);//létrehozunk egy inputot is, amelynek az id-je a konstruktor bemeneti paramétere lesz, és ezt az inputot eltároljuk a FormField inputElement privát tulajdonságába
        this.#errorField = Gomszab.makeErrorField();//létrehoztunk egy span elemet az error osztályunkkal, amit értékül adtunk a FormField osztályunk errorField privát tulajdonságának
    }

    getDivElement(){//Létrehozutnk még egy publikus getDivElement függvényt is
        const div = Gomszab.makeDiv([this.#labelElement, this.#inputElement, this.#errorField]);//a függvény törzsében létrehoztunk egy div elementet, aminek megadtuk a labelElement tulajdonságban tárolt értéket, az inputElement tulajdonságban eltárolt értéket és az errorField tulajdonságban eltárolt értéket is
        return div;//majd visszatérünk ezzel a div elementtel
    }
}