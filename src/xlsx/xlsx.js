import XLSX from 'xlsx';
import eventsList from './events.json';
import path from 'path';

const createXLSX = (title = 'Eventos', arrayOfObjects) => {
  let headers = Object.keys(arrayOfObjects[0]);
  // Ordernamos para que el header "date" esté primero
  headers.sort((_, b) => (b == 'date') ? 1 : -1);
  console.warn('descargando excel... esto puede demorar un poco')
  // Generamos la data
  const workSheet = XLSX.utils.json_to_sheet(arrayOfObjects, { header: headers });
  // Generamos un libro dentro del excel
  const workBook = XLSX.utils.book_new();
  // Asignamos + titulo de el libro
  XLSX.utils.book_append_sheet(workBook, workSheet, title);
  // Cambiamos la primera key desde el origin A1 por "fecha", es decir: date por Fecha
  XLSX.utils.sheet_add_aoa(workSheet, [["Fecha"]], { origin: "A1" });
  // Name of file
  const excelFileNameTemplate = 'events.xlsx';
  // Download that file
  XLSX.writeFile(workBook, excelFileNameTemplate);
  console.info('excel descargado en el directorio raíz del proyecto')
};

const readXLSX = (filePath) => {
  const fileData = XLSX.readFile(filePath);
  const sheets = fileData.SheetNames;
  let data = [];

  for (let i = 0; i < sheets.length; i++) {
    const temp = XLSX.utils.sheet_to_json(fileData.Sheets[fileData.SheetNames[i]]);
    temp.forEach((r) => data.push(r))

  }
  return data;
}

const filePath = path.join("2BB-IPI-07.xlsx");
const inclinometerData = readXLSX(filePath);

const compareInclinometer = data => {
  const firstData = Object.values(data[0])
  const lastData = Object.values(data[data.length - 1])
  const [firstDate, ...firstvalues] = firstData;
  const [lastDate, ...lastValues] = lastData;

  const deltas = lastValues.map((lv, i) => lv - firstvalues[i]);
  const [anclaje1, anclaje2, ...restDeltas1] = deltas;
  let superior = getSuperior(anclaje1, anclaje2, restDeltas1)
  // console.log(superior)
  // const 
  const [anclaje3, anclaje4, ...restDeltas2] = deltas.reverse();
  let inferior = getInferior(anclaje3, anclaje4, restDeltas2).reverse();
  console.log({inferior, superior})
};

const getSuperior = (anclaje1, anclaje2, restDeltas1) => {
  let anclajeSuperior = [anclaje1, anclaje2];

  restDeltas1.forEach((delta, i) => anclajeSuperior.push(anclajeSuperior[i] + delta));

  return anclajeSuperior
}

const getInferior = (anclaje1, anclaje2, restDeltas1) => {
  let anclajeSuperior = [anclaje1, anclaje2];

  restDeltas1.forEach((delta, i) => anclajeSuperior.push(anclajeSuperior[i] + delta));

  return anclajeSuperior
}

compareInclinometer(inclinometerData);