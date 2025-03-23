//Beillesztettük a formhoz tartozó adatstruktúrát az adminban lévő main.js-be

const formFields = [
    { id: 'questionText', label: 'Kerdes' },
    { id: 'answer1', label: 'valasz1' },
    { id: 'answer2', label: 'valasz2' },
    { id: 'answer3', label: 'valasz3' },
    { id: 'answer4', label: 'valasz4' },
    { id: 'rightAnswer', label: 'helyes valasz' },
  ];

  const manager = new Manager();//példányosítottuk a managert az admin mappában lévő main.js-ben
  const table = new Table(manager);//módosítottuk a Table osztályunk példányosítását, megadtuk neki a manager példányunkat paraméterként
  const form = new FormController(manager,formFields);//példányosítottuk a FormController osztályunkat, amelynek az egyik paramétere a manager a másik pedig a formFields tömbünk, amelyet beágyaztunk

Gomszab.addFileUploader(fileResultString => {
  const fileLines = fileResultString.split('\n');//eltároljuk a soronként letördelt stringünket egy const változóban ezek lesznek a sorai a fájlunknak
  for(const line of fileLines){//bejárjuk ezeket a sorokat egy for of ciklus segítségével
    const fields = line.split(';');//majd ezeket az aktuális ciklusváltozóra meghívott split segítségével tovább tördeljük a sorokat ;-ként és ezek lesznek a fieldjeink
    const answers = [// az egyes filedjeink lesznek az egyes elemek  az answers tömbben
      fields[1],
      fields[2],
      fields[3],
      fields[4]
    ]
    const rightAnswer = fields[5].trim();// a trim metódus segítségével az üres spaceket eltávolítjuk a helyes válaszról
    const question = new Question(fields[0], answers, rightAnswer);//példányosítjuk a megfelelő paraméterek megadásával a question osztályunkat, minden egyes ciklus iterációban
    manager.add(question)//a question példányokat hozzáadjuk egyesével a managerünkhöz minden iteráció során a manager példányunk add függvényének segítségével
  }
})

const exportButton = document.createElement('button');//Létrehoztunk egy új gombot(HTMLElement)
exportButton.textContent = 'Letöltés';//a gomb tartalmának megadtuk a Letöltés stringet
document.body.appendChild(exportButton);//majd hozzáfűztük a gombot a HTMl dokumentumunkhoz
exportButton.addEventListener('click', () => {//létrehoztunk a gombunk click eseményére egy eventlistenert
    const link = document.createElement('a');//amelyben létrehoztunk egy HTML linket és elraktuk egy változóban
    const content = manager.generateExportString();//majd meghívtuk a manager példányunk generateExportString függvényét
    const file = new Blob([content])//majd eltároltuk egy változóban a Blob osztályunk egy példányát, aminek megadtuk egy tömbbe csomagolva a manager osztályunk generateExportString függvényének visszatérését
    link.href = URL.createObjectURL(file);//a HTML link href tulajdonságának(céljának) megadtuk az URL osztály createObjectURL függvényének visszatérési értékét a fileunkkal
    link.download = 'newdata.csv'//a link download tulajdonságának megadtunk egy tetszőleges stringet, amely majd a letöltött fájl nevünk lesz
    link.click();//meghívjuk a HTML link click függvényét
    URL.revokeObjectURL(link.href);//meghívjuk az URL.revokObjectURL függvényt, hogy töröljük a memóriából a létrehozott linket és megadtuk a paraméterként a link href tulajdonságát
})