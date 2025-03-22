/**
 * Segédfüggvények tömkelege
 */
const Gomszab = {
    /**
     * 
     * Létrehoz egy fileinput mezőt és hozzácsatolja a bodyhoz.
     * A callback segítségével feltudjuk dolgozni a {@link FileReader#result} tartalmát ami mivel textként
     * olvastuk be a szöveget, egy string lesz. A callback a fájl beolvasása után fut le, a load eseményen
     * belül van meghívva bővebb infó: {@link FileReader}
     * 
     * @param {function(string):void} fileProcessCallback a bemeneti paramétere a callbacknek a beolvasott fájl tartalma, ami egy összefüggő string 
     */
    addFileUploader: (fileProcessCallback)=>{
        const fileUploader = document.createElement('input');
        fileUploader.type = 'file';
        fileUploader.addEventListener('change', (e) => {
            const file = e.target.files[0];
            const fileReader = new FileReader();
            fileReader.onload = () => {
                fileProcessCallback(fileReader.result)
            }
            fileReader.readAsText(file);
        });
        document.body.appendChild(fileUploader);
    },
    /**
     * 
     * Létrehoz egy label-t a magadott id-jú inputhoz egy szöveggel.
     * 
     * @param {String} id az input id-je amihez létrehozzuk a labelt. 
     * @param {String} label a label tartalma  
     * @returns {HTMLLabelElement} a létrehozott label
     */
    makeLabel: (id, label) =>{
        const labelEl = document.createElement('label');
        labelEl.htmlFor = id;
        labelEl.textContent = label;
        return labelEl;
    },
    /**
     * 
     * Létrehoz egy inputot a megadott típussal és id-val
     * 
     * @param {string} id az input azonosítója
     * @param {string} type az input típusa
     * @returns {HTMLInputElement} a létrehozott input elemünk
     */
    makeInput: (id, type='text') =>{
        const inputField = document.createElement('input');
        inputField.id = id;
        inputField.type= type;
        return inputField;
    },

    /**
     * 
     * Létrehoz egy span-t és ellátja az error osztállyal.
     * 
     * @returns {HTMLSpanElement} a létrehozott errorspan
     */
    makeErrorField: () => {
        const errorField = document.createElement('span');
        errorField.className = 'error';
        return errorField;
    },
    /**
     * 
     * A bemeneti paramétereket beleteszi egy div-be és sortöréssel választja el az elemeket
     * 
     * @param {Node[]} htmlElementList az elemek, amiket be akarunk pakolászni
     * @returns {HTMLDivElement} a div ami tartalmayya az elemeinket
     */
    makeDiv(htmlElementList){
        const div = document.createElement('div');
        for(const element of htmlElementList){
            div.appendChild(element);
            div.appendChild(document.createElement('br'))
        }
        return div;
    },

    /**
     * 
     * Létrehoz egy táblázatot egy headerrel, és visszatér a tbody-val
     * 
     * @param {string[]} headerTextlist a fejléc cellák tartalma
     * @returns {HTMLTableSectionElement} a táblázat törzse.
     */
    makeTableWithHeader(headerTextlist){
        const table = document.createElement('table');
        document.body.appendChild(table)
        const header = document.createElement('thead');
        table.appendChild(header);
        const theadRow = document.createElement('tr');
        header.appendChild(theadRow);
        for(const text of headerTextlist){
            const th = document.createElement('th');
            th.innerText = text;
            theadRow.appendChild(th);
        }
        const tbody = document.createElement('tbody');
        table.appendChild(tbody);
        return tbody;
    },

    /**
     * 
     * Csinál egy cellát a megadott tartalommal és hozzáfűzi a megadott ttáblázatsorhoz
     * 
     * @param {HTMLTableCellElement} tableRow a táblázat sora, amihez fűzzük az elemet
     * @param {string} content a cella tartalma
     */
    makeCellToRow: (tableRow, content) => {
        const tableCellAnswer = document.createElement('td');
        tableCellAnswer.textContent = content;
        tableRow.appendChild(tableCellAnswer);
    }
}