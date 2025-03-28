//Létrehoztuk a Manager osztályt, aminek 5 darab privát tulajdonsága van.

/**
 *
 * @callback NextQuestionCallback //A nextQuestionCallbacket definiálom lentebb
 *  @param {String} question //ez a (Questionös)callbackekünk bemeneti paramétere lesz
 * @returns {void}// a callbackünk visszatérése void lesz
 * 
 * @callback NextAnswersCallback //a nextAnswerscallbacket definiálom lentebb
 * @param {String[]} valaszok //ez a (answerses) callbackekünk bemeneti paramétere lesz
 * @returns {void} // a callbackünk visszatérése void lesz
 * 
 * 
 * @callback FinishCallback //ez fogja felépíteni majd az eredménykijelzést
 * 
 * 
 * @param {Question}//az AddCallback bemeneti paramétere
 * @callback AddCallBack //definiáltuk az AddCallBack típust
 * @returns {void}// az AddCallBack visszatérése
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


    /**
     * @type {NextQuestionCallback}
     */
    #nextQuestionCallback;

    /**
     * @type {NextAnswersCallback}
    */
    #nextAnswersCallback;

    /**
     * @type {FinishCallback}
     */
    #finishCallback;

    /**
     * @type {AddCallBack} definiáltam egy privát tulajdonságot az AddCallbacknek
     */
    #addCallback;

    /**
     * A constructornak egy kötelező paramétere van ami Question tömb típusú és ez fogja majd az értéket adni a Manager osztályunk array privát tulajdonságának(kezdeti értéke üres tömb)
     * @param {Question[]} array 
     * 
     * beállítjuk a privát tulajdonságaink értékét a constructorban
     */
    constructor(array = []){
        this.#array = array;
        this.#currentQuestionNumber = 0;
        this.#selectedAnswer={};
        this.#addCallback = ()=>{};//Mivel az addCallbackhez tartozó setelő függvényt nem mindig valósítjuk meg, ezért a constructorban értékül adunk neki egy üres arrow functiont
    }

    //Létrehoztunk elsőkörben 3 callback settert,ami beállítja a callbackeket
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
        //definiáltunk egy publikus függvényt a Manager osztályunknak, amely beállítja a privát addCallback tulajdonság értékét
        this.#addCallback = callback;
    }

    //Létrehoztunk a Manager osztálynak egy új add függvényt, amely egy Question típusú paramétert vár és void a visszatérése

    /**
     * 
     * @param {Question} question
     * 
     * @returns {void} 
     */
    add(question){
        this.#array.push(question);//a függvénytörzsben hozzáfűzzük a paraméterként kapott új elemet az array privát tulajdonságunkhoz
        this.#addCallback(question);//meghívtuk az add függvényben a most létrehozott addCallBackünket, a question paraméterünkkel
    }

    /**illetve létrehoztunk egy nextQuestion függvényt is a Managernek, ennek 1 paramétere van egy answer, ami string
     * @param {string} answer 
     * 
     * akkor hívjuk meg majd, ha a felh. kattintott már egy válaszra és a kiválaszott elem tartalmát fogja tartalmazni
    */
    nextQuestion(answer){
        this.#selectedAnswer[this.#currentQuestionNumber] = answer;//a kapott válasznak értékül adjuk az answer bemeneti paramétert, (eltároljuk a kapott választ)
        this.#currentQuestionNumber++;//majd növeljük eggyel a currentQuestionNumber privát tulajdonságnak az értékét

        //ebben az elágazásban azt vizsgáljuk maradt-e még kérdés, tehát kisebb-e még a currentQuestionNumber értéke, mint a tömb hossza, ha kisebb
        if(this.#currentQuestionNumber < this.#array.length){
            this.#nextQuestionCallback(this.#array[this.#currentQuestionNumber].questionText);//akkor meghívjuk a nextQuestionCallbacket a tömbünk currentQuestionNumber indexű elemének questionText tulajdonságával 
            this.#nextAnswersCallback(this.#array[this.#currentQuestionNumber].answers);//akkor meghívjuk a nextAnswersCallbacket a tömbünk currentQuestionNumber indexű elemének answers tulajdonságával is
        }else{
            let counter = 0;//deklarálok egy változót, ami a helyes kérdések számlálója lesz és az értéke eleinte nulla
            for(const index in this.#array){//bejárom a tömb privát tulajdonságomat egy for of ciklussal
                if(this.#array[index].rightAnswer === this.#selectedAnswer[index]){//vizsgálom, hogy a tömböm valahanyadik elemének rightAnswer tulajdonsága megegyezik a selectedAnswer objektumunk ugyanannyiadik propertyjével
                    counter++; //ha igen növelem a helyes kérdések számlálóját eggyel
                }
            }
            this.#finishCallback(`A kérdéssor véget ért: ${this.#array.length}/${counter} válasz volt helyes.`);//majd a függvény végén meghívjuk a finishCallbacket egy stringgel, amiben visszaadjuk az összes kérdés közül mennyi volt helyes a helyes kérdések számlálójával 
        }
    }

    generateExportString(){//definiáltunk egy publikus függvényt a Manager osztályunknak
        let result = [];//deklarálok egy üres tömböt
        for(const question of this.#array){//végigiterálunk az array privát tulajdonságunkban levő tömbön egy for ofal
            result.push(`${question.questionText};${question.answers.join(';')};${question.rightAnswer}`); //minden egyes elemből létre hozunk egy ;-kel elválaszott sort, és ezt pusholjuk a result tömbünke, amit a függvény elején deklaráltunk
        }
        return result.join('\n');//majd minden egyes példány után beillesztünk egy sörtörést is, amivel visszatérünk
    }

    start(){//definiáltunk egy start függvényt is Manager osztálynak
        this.#nextQuestionCallback(this.#array[this.#currentQuestionNumber].questionText);//itt meghívtuk az array tulajdonságunk 0. elemének questionText tulajdonságával a nextQuestionCallback priv. tulajdonságunkat függvényként
        this.#nextAnswersCallback(this.#array[this.#currentQuestionNumber].answers);//majd meghívtuk az arrayünk 0. elemének answers tulajdonságával meghívtuk a nextAnswersCallback priv. tulajdonságunkat is függvényként.
    }
}