import * as XLSX from 'xlsx';
import eventsList from './events.json';

((title = 'Eventos', arrayOfObjects = eventsList) => {
  // Obtenemos los headers
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
})();