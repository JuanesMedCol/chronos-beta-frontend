// Material Dashboard 2 React Examples
import DataTable from "examples/Tables/DataTable";

import listCarnet from "layouts/tables/data/listadocarnets.json";
import verDetallesImg from "assets/images/ver_detalles.svg";

export default function UserListCarnet() {
  //const { id, dni, nombre, apellido, fecha_de_generacion, ultima_descarga, vigencia, copias } =
  //listCarnet.carnets;

  const userCarnets = listCarnet.carnets;

  return (
    <DataTable
      table={{
        columns: [
          { Header: "dni", accessor: "dni", width: "25%" },
          { Header: "nombre", accessor: "nombre", width: "30%" },
          { Header: "fecha de generación", accessor: "fecha_de_generacion" },
          { Header: "ultima descarga", accessor: "ultima_descarga", width: "12%" },
          { Header: "vigencia", accessor: "vigencia", width: "12%" },
          { Header: "copias", accessor: "copias", width: "12%" },
          { Header: "ver detalles", accessor: "ver", width: "12%" },
        ],
        rows: userCarnets.map((carnet) => {
          return {
            id: carnet.id,
            dni: carnet.dni,
            nombre: `${carnet.nombre} ${carnet.apellido}`,
            fecha_de_generacion: carnet.fecha_de_generacion,
            ultima_descarga: carnet.ultima_descarga,
            vigencia: carnet.vigencia,
            copias: carnet.copias,
            ver: (
              <a href="#">
                <img src={verDetallesImg} />
              </a>
            ),
          };
        }),
      }}
      canSearch={true}
      //pagination={listCarnet}
      isSorted={false}
      entriesPerPage={false}
      showTotalEntries={true}
    />
  );
}
