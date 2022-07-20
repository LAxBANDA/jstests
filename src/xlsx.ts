import * as XLSX from 'xlsx';
import * as eventsList from '../events.json';

const events: any = <any>eventsList;

(() => {

  // Obtenemos los headers
  let headers = Object.keys(eventsList[0]);
  // Ordernamos para que el header "date" esté primero
  headers.sort((a, b) => (b == 'date') ? 1 : -1);

  // Generamos la data
  const workSheet = XLSX.utils.json_to_sheet(events['default'], { header: headers });
  // Generamos un libro dentro del excel
  const workBook = XLSX.utils.book_new();
  // Asignamos + titulo de el libro
  XLSX.utils.book_append_sheet(workBook, workSheet, 'Eventos');
  // Cambiamos la primera key desde el origin A1 por "fecha", es decir: date por Fecha
  XLSX.utils.sheet_add_aoa(workSheet, [["Fecha"]], { origin: "A1" });
  // Name of file
  const excelFileNameTemplate = 'events.xlsx';
  // Download that file
  XLSX.writeFile(workBook, excelFileNameTemplate);
})();