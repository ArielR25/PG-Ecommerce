import { useSelector } from "react-redux";

export function ordernar(orden, catalogo) {
 
    if (orden === "A-Z") {
      catalogo.sort((a, b) => {
        if (a.titulo < b.titulo) {
          return -1;
        }
        if (a.titulo > b.titulo) {
          return 1;
        }
        return 0;
      });
    }
    if (orden === "Z-A") {
      catalogo.sort((b, a) => {
        if (a.titulo < b.titulo) {
          return -1;
        }
        if (a.titulo > b.titulo) {
          return 1;
        }
        return 0;
      });
    }
    if (orden === "Mayor_Precio") {
      catalogo.sort((b, a) => {
        if (a.precio < b.precio) {
          return -1;
        }
        if (a.precio > b.precio) {
          return 1;
        }
        return 0;
      });
    }
    if (orden === "Menor_Precio") {
      catalogo.sort((a, b) => {
        if (a.precio < b.precio) {
          return -1;
        }
        if (a.precio > b.precio) {
          return 1;
        }
        return 0;
      });
    }
 
    return catalogo
  }

export function useCambio (){
  const cambios = useSelector((state) => state.filteredAllBooks);
  return cambios
}