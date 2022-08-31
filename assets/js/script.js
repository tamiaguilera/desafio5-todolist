const tareas = [{ id: 1, descripcion: "Este es un ejemplo", realizada: true }];

const mostrarTareas = () => {
  let template = "";
  tareas.forEach((tarea) => {
    template += ` 
      <tr>
        <td>${tarea.id}</td>
        <td class="descripcion">${tarea.descripcion}</td>
        <td>
          <input type="checkbox" ${tarea.realizada ? "checked" : ""} />
        </td>
        <td>
          <span>X</span>
        </td>
      </tr>
    `;
  });


  const tbody = document.querySelector("#tareas tbody");
  tbody.innerHTML = template;

  
  agregarEventoBorrar();
  manejarEstado();
  contarTareas();
};

const agregarEventoBorrar = () => {
  const eliminar = document.querySelectorAll("#tareas span");
  eliminar.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      tareas.splice(index, 1);
      mostrarTareas();
    });
  });
};

const manejarEstado = () => {
  const boxes = document.querySelectorAll("#tareas input[type='checkbox']");
  boxes.forEach((box, index) => {
    const row = document.querySelector(
      `#tareas tbody tr:nth-child(${index + 1})`
    );

    if (box.checked) {
      row.classList.add("bold");
    }

    box.addEventListener("click", () => {
      row.classList.toggle("bold");
      tareas[index].realizada = !tareas[index].realizada;

      contarTareas();
    });
  });
};

const contarTareas = () => {
  const total = tareas.length;
  const realizadas = tareas.filter((tarea) => tarea.realizada === true).length;

  const spanTotal = document.getElementById("total");
  const spanRealizadas = document.getElementById("realizadas");

  spanTotal.innerHTML = total;
  spanRealizadas.innerHTML = realizadas;
};

const btn = document.getElementById("btn");
btn.addEventListener("click", () => {
 
  const tarea = document.getElementById("tarea");

 
  tareas.push({
    id: tareas.length + 1,
    descripcion: tarea.value,
    realizada: false
  });


  tarea.value = "";

  
  mostrarTareas();
});


mostrarTareas();
