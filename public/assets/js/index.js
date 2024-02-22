

/*function init() {
  $("#frm").on("submit", (e) => {
    RegistroAsistencia(e);
  });
}

$().ready(() => {
  tiposacceso();
});

var RegistroAsistencia = (e) => {
  e.preventDefault();
  var formulario = new FormData($("#frm")[0]);
  alert("aqui");
  $.ajax({
    url: "controllers/usuario.controllers.php?op=unoconCedula",
    type: "post",
    data: formulario,
    processData: false,
    contentType: false,
    cache: false,
    success: (respuesta) => {
      console.log(respuesta);
    },
  }).done((usuarioId) => {
    usuarioId = JSON.parse(usuarioId);
    formulario.append("usuariosId", usuarioId.idUsuarios);
    $.ajax({
      url: "controllers/accesos.controllers.php?op=insertar",
      type: "post",
      data: formulario,
      processData: false,
      contentType: false,
      cache: false,
      success: (respuesta) => {
        console.log(respuesta);
        respuesta = JSON.parse(respuesta);
        if (respuesta == "ok") {
          //Swal.fire(Titulo, texto, tipo de alerta)
          Swal.fire("Registro de Asistencia", "Se guardo con éxito", "success");
        } else {
          Swal.fire(
            "Registro de Asistencia",
            "Hubo un error al guardar",
            "danger"
          );
        }
      },
    });
  });
};

var tiposacceso = () => {
  return new Promise((resolve, reject) => {
    var html = `<option value="0">Seleccione una opción</option>`;
    $.post("controllers/tipoacceso.controllers.php?op=todos", async (lista) => {
      lista = JSON.parse(lista);
      $.each(lista, (index, tipo) => {
        html += `<option value="${tipo.IdTipoAcceso}">${tipo.Detalle}</option>`;
      });
      await $("#tipo").html(html);
      resolve();
    }).fail((error) => {
      reject(error);
    });
  });
};
init();

document.addEventListener("DOMContentLoaded", (e) => {
  const video = document.getElementById("video");
  let stream;
  navigator.mediaDevices
    .getUserMedia({
      video: true,
    })
    .then((mediaStream) => {
      stream = mediaStream;
      video.srcObject = mediaStream;
    })
    .catch((error) => {
      alert("Error al acceder a la camara web");
    });
});*/
document.addEventListener("DOMContentLoaded", (e) => {
  const video = document.getElementById("video");
  let stream;

  // Obtener el contexto del canvas
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");

  navigator.mediaDevices
    .getUserMedia({
      video: true,
    })
    .then((mediaStream) => {
      stream = mediaStream;
      video.srcObject = mediaStream;
      video.onloadedmetadata = function (e) {
        video.play();
      };
    })
    .catch((error) => {
      alert("Error al acceder a la cámara web");
    });

  // Evento para capturar la imagen y realizar la detección
  document.getElementById("acceptBtn").addEventListener("click", function () {
    context.drawImage(video, 300, 300, 0, 0);
    const imageData = canvas.toDataURL("image/jpeg");

    // Aquí deberías realizar la detección facial y la clasificación utilizando la imagen capturada en 'imageData'
    // Luego, podrías llamar a la función 'RegistroAsistencia' con los resultados de la detección y clasificación
    RegistroAsistencia(imageData);
  });

});

var RegistroAsistencia = (imageData) => {
  // Envía la imagen capturada al servidor para procesarla y guardarla en la tabla Recofacial
  const formData = new FormData();
  formData.append("image", imageData);

  // Enviar la imagen al servidor usando AJAX
  $.ajax({
    url: "usuario.controllers.php", // Ruta del archivo PHP para guardar la imagen
    type: "post",
    data: formData,
    processData: false,
    contentType: false,
    success: (response) => {
      console.log("Imagen guardada correctamente en la base de datos");
      console.log(response); // Puedes imprimir la respuesta del servidor si lo necesitas
      // Aquí podrías realizar otras acciones después de guardar la imagen
    },
    error: (error) => {
      console.error("Error al guardar la imagen en la base de datos:", error);
    }
  });
};
