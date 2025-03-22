const formFields = [
    { id: 'questionText', label: 'Kerdes' },
    { id: 'answer1', label: 'valasz1' },
    { id: 'answer2', label: 'valasz2' },
    { id: 'answer3', label: 'valasz3' },
    { id: 'answer4', label: 'valasz4' },
    { id: 'rightAnswer', label: 'helyes valasz' },
  ];

  const manager = new Manager();
  const table = new Table(manager);
  const form = new FormController(manager,formFields);

Gomszab.addFileUploader(fileResultString => {
  const fileLines = fileResultString.split('\n');
  for(const line of fileLines){
    const fields = line.split(';');
    const answers = [
      fields[1],
      fields[2],
      fields[3],
      fields[4]
    ]
    const rightAnswer = fields[5].trim();
    const question = new Question(fields[0], answers, rightAnswer);
    manager.add(question)
  }
})

const exportButton = document.createElement('button');
exportButton.textContent = 'Letöltés';
document.body.appendChild(exportButton);
exportButton.addEventListener('click', () => {
    const link = document.createElement('a');
    const content = manager.generateExportString();
    const file = new Blob([content])
    link.href = URL.createObjectURL(file);
    link.download = 'newdata.csv'
    link.click();
    URL.revokeObjectURL(link.href);
})