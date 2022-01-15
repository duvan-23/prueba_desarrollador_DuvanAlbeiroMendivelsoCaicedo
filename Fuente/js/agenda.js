$(document).ready(function () {
  listarUsuarios();
  $("#btncontacto").addClass("visually-hidden");
  $("#btnAgregar").click(function (e) {
    insertarUsuarios();
  });
  $("#btnCancelar").click(function (e) {
    limpiarCampos()
  });
  $("#btnCancelar2").click(function (e) {
    limpiarCampos()
  });
  $("#btnAgregar2").click(function (e) {
    insertarContactos();
  });
  $("#btnAgregar").removeClass("visually-hidden");
  $("#btnAgregar2").removeClass("visually-hidden");
  
});
let formularioUsuarios = $("#formularioUsuarios");
let formularioContactos = $("#formularioContactos");

function listarUsuarios() {
  $("#users").empty();
  $.getJSON("./php/instruccion.php", function (registros) {
    var usuarios = [];
    
    $.each(registros, function (llave, valor) {
      if (llave >= 0) {
        var template = "<tr>";
        template += '<td > <input class="btn btn-info" style="background:#3F888F; color: #fff" type="button" onclick="mostrarInfoUsuario(' + valor.id_usuarios + ')" value="' + valor.nombre + " " + valor.apellido + '" /></td>';
        template += "</tr>";
        usuarios.push(template);
      }
      
    });
    $("#users").append(usuarios.join(""));
  });
}


function insertarUsuarios() {
  if (
    $("#nombreusuario").val() &&
    $("#apellidousuario").val() &&
    $("#documentousuario").val() &&
    $("#fechausuario").val() &&
    $("#generousuario").val()
  ) {
    var datos = new FormData();
    datos.append("nombre", $("#nombreusuario").val());
    datos.append("apellido", $("#apellidousuario").val());
    datos.append("documento", $("#documentousuario").val());
    datos.append("fecha", $("#fechausuario").val());
    datos.append("genero", $("#generousuario").val());

    limpiarCampos();
    cerrar();
    $.ajax({
      type: "post",
      url: "./php/instruccion.php?accion=insertarUsuario",
      data: datos,
      processData: false,
      contentType: false,
      success: function (response) {
          $("#btnAgregar").removeClass("visually-hidden");
          $("#btnEditar").addClass("visually-hidden");
          $("#btnCancelar").removeClass("visually-hidden");
        const res_Json=response;
        const res = JSON.parse(res_Json);
        if(res.estado==false){
          
          $("#mensajeError").removeClass("visually-hidden");
          setTimeout(()=>$("#mensajeError").addClass("visually-hidden"), 5000);
        }else{
          $("#mensajeError").addClass("visually-hidden");
          $("#mensajeExito").removeClass("visually-hidden");
          setTimeout(()=>$("#mensajeExito").addClass("visually-hidden"), 5000);
        }
        listarUsuarios();
      },
    });
  }
}

function mostrarInfoUsuario(id) {
  $("#btncontacto").removeClass("visually-hidden");
  $("#usuario").empty();
  $.getJSON("./php/instruccion.php?mostrarUsuarios=" + id, function (registros) {
    var usuarios = [];
    $.each(registros, function (llave, valor) {
      if (llave >= 0) {
        $("#idusuario2").val(valor.id_usuarios);
        var template = "<tr class='text-muted'>";
        template += "<td id='valorId'class='visually-hidden'>" + valor.id_usuarios + "</td>";
        template += "<td>" + valor.nombre + "</td>";
        template += "<td>" + valor.apellido + "</td>";
        template += "<td>" + valor.documento + "</td>";
        template += "<td>" + valor.fecha_nacimiento + "</td>";
        template += "<td>" + valor.genero + "</td>";
        template +=
          '<td> <input class="btn" style="background:#3F888F; color: #fff"type="button" onclick="seleccionarUsuario(' +
          valor.id_usuarios +
          ')" value="Editar" />';
        template +=
          '<input class="btn btn-danger" type="button" onclick="borrarUsuario(' +
          valor.id_usuarios +
          ')" value="Borrar" /></td>';
        template += "</tr>";

        usuarios.push(template);
        listarContactos(valor.id_usuarios);
      }
    });

    $("#usuario").append(usuarios.join(""));
  });
}

function seleccionarUsuario(id) {
  $.getJSON(
    "./php/instruccion.php?consultarUsuario=" + id,
    function (registros) {
      $("#idusuario").val(registros[0]["id_usuarios"]);
      $("#nombreusuario").val(registros[0]["nombre"]);
      $("#apellidousuario").val(registros[0]["apellido"]);
      $("#documentousuario").val(registros[0]["documento"]);
      $("#fechausuario").val(registros[0]["fecha_nacimiento"]);
      $("#generousuario").val(registros[0]["genero"]);
      showPopupUser();
      $("#btnAgregar").addClass("visually-hidden");
      $("#btnEditar").removeClass("visually-hidden");
      $("#btnCancelar").removeClass("visually-hidden");
    }
  );
}

function listarContactos(id) {
  $("#contactos").empty();
  $.getJSON(
    "./php/instruccion.php?mostrarContactos=" + id,
    function (registros) {
      var usuarios = [];
      $.each(registros, function (llave, valor) {
        //llave-indice
        if (llave >= 0) {
          var template = "<tr id='tabla'class='text-muted'>";
          template += "<td class='visually-hidden'>" + valor.id_contactos + "</td>";
          template += "<td>" + valor.nombre + "</td>";
          template += "<td>" + valor.apellido + "</td>";
          template += "<td>" + valor.numero_contacto + "</td>";
          template += "<td>" + valor.tipo_numero + "</td>";
          template += "<td>" + valor.parentesco + "</td>";
          template +=
            "<td class='visually-hidden'>" + valor.id_usuarios + "</td>";
          template +=
            '<td> <input class="btn" style="background:#3F888F; color: #fff"type="button" onclick="seleccionarcontacto(' +
            valor.id_contactos +
            ')" value="Editar" />';
          template +=
            '<input class="btn btn-danger" type="button" onclick="borrarContactos(' +
            valor.id_contactos +
            ')" value="Borrar" /></td>';
          template += "</tr>";

          usuarios.push(template);
        }
      });
      $("#contactos").append(usuarios.join(""));
    }
  );
}

function showPopupUser() {
  $(".pop-up").addClass("show");
  $(".pop-up-wrap").addClass("show");
}

function showPopupCont() {
  $(".pop-up-contactos").addClass("show");
  $(".pop-up-wrap-contactos").addClass("show");
}

function cerrar() {
  $(".pop-up").removeClass("show");
  $(".pop-up-wrap").removeClass("show");
  $(".pop-up-contactos").removeClass("show");
  $(".pop-up-wrap-contactos").removeClass("show");
}
// $("#insertar").click(showPopup);
function limpiarCampos() {
  $("#btnAgregar").removeClass("visually-hidden");
  $("#btnEditar").addClass("visually-hidden");

  $("#btnAgregar2").removeClass("visually-hidden");
  $("#btnEditar2").addClass("visually-hidden");

  
  $("#nombreusuario").val("");
  $("#apellidousuario").val("");
  $("#documentousuario").val("");
  $("#fechausuario").val("");
  $("#generousuario").val("");

  $("#idcontacto").val("");
  $("#nombrecontacto").val("");
  $("#apellidocontacto").val("");
  $("#numerocontacto").val("");
  $("#tipocontacto").val("");
  $("#parentescocontacto").val("");
  cerrar();
}

function editarUsuario() {
$("#btnAgregar").removeClass("visually-hidden");
$("#btnEditar").addClass("visually-hidden");

  var datos = new FormData();
  datos.append("id", $("#idusuario").val());
  datos.append("nombre", $("#nombreusuario").val());
  datos.append("apellido", $("#apellidousuario").val());
  datos.append("documento", $("#documentousuario").val());
  datos.append("fecha", $("#fechausuario").val());
  datos.append("genero", $("#generousuario").val());

  $.ajax({
    type: "post",
    url: "./php/instruccion.php?actualizarUsuario=1",
    data: datos,
    processData: false,
    contentType: false,
    success: function (response) {
      mostrarInfoUsuario($("#idusuario").val());
      listarUsuarios();
      limpiarCampos();
      cerrar();
    },
  });
}

function borrarUsuario(id) {
  var confirmacionBorrado = confirm("¿Esta seguro de eliminar Usuario?");
  if (confirmacionBorrado) {
    $.get("./php/instruccion.php?borrarUsuario=" + id, function () {
      borrarContactos(id);
      mostrarInfoUsuario(id);
      listarUsuarios();
      $("#btncontacto").addClass("visually-hidden");
      $("#tabla").remove();
    });
  }
}

// Contactos

function insertarContactos() {

  if ($("#tipocontacto").val()     &&
    $("#parentescocontacto").val() &&
    $("#nombrecontacto").val()     &&
    $("#apellidocontacto").val()   &&  
    $("#numerocontacto").val()    
    ) {
    var datos = new FormData();
    datos.append("id", $("#idusuario2").val());
    datos.append("nombre", $("#nombrecontacto").val());
    datos.append("apellido", $("#apellidocontacto").val());
    datos.append("contacto", $("#numerocontacto").val());
    datos.append("tipo", $("#tipocontacto").val());
    datos.append("parentesco", $("#parentescocontacto").val());
    let x = $("#idusuario2").val();
    $.ajax({
      type: "post",
      url: "./php/instruccion.php?accion1=insertarContactos",
      data: datos,
      processData: false,
      contentType: false,
      success: function (response) {
        $("#btnAgregar2").removeClass("visually-hidden");
        $("#btnEditar2").addClass("visually-hidden");

        const res_Json=response;
        const res = JSON.parse(res_Json);
        if(res.estado==false){
          
          $("#mensajeErrorContacto").removeClass("visually-hidden");
          setTimeout(()=>$("#mensajeErrorContacto").addClass("visually-hidden"), 5000);
        }else{
          $("#mensajeErrorContacto").addClass("visually-hidden");
          $("#mensajeExitoContacto").removeClass("visually-hidden");
          setTimeout(()=>$("#mensajeExitoContacto").addClass("visually-hidden"), 5000);
        }
      },
    });
    mostrarInfoUsuario(x);
    limpiarCampos();
  }
    
}

function editarContactos() {
  $("#btnAgregar2").removeClass("visually-hidden");
$("#btnEditar2").addClass("visually-hidden");
  var datos = new FormData();
  datos.append("id", $("#idcontacto").val());
  datos.append("nombre", $("#nombrecontacto").val());
  datos.append("apellido", $("#apellidocontacto").val());
  datos.append("contacto", $("#numerocontacto").val());
  datos.append("tipo", $("#tipocontacto").val());
  datos.append("parentesco", $("#parentescocontacto").val());

  $.ajax({
    type: "post",
    url: "./php/instruccion.php?actualizarContactos=1",
    data: datos,
    processData: false,
    contentType: false,
    success: function (response) {
      listarContactos($("#idusuario2").val());
      limpiarCampos();
      cerrar();
    },
  });
}

function seleccionarcontacto(id) {

  $.getJSON(
    "./php/instruccion.php?consultarContactos=" + id,
    function (registros) {
      $("#idcontacto").val(registros[0]["id_contactos"]);
      $("#nombrecontacto").val(registros[0]["nombre"]);
      $("#apellidocontacto").val(registros[0]["apellido"]);
      $("#numerocontacto").val(registros[0]["numero_contacto"]);
      $("#tipocontacto").val(registros[0]["tipo_numero"]);
      $("#parentescocontacto").val(registros[0]["parentesco"]);
      $("#idusuario2").val(registros[0]["id_usuarios"]);
      showPopupCont();
      $("#btnAgregar2").addClass("visually-hidden");
      $("#btnEditar2").removeClass("visually-hidden");
      $("#btnCancelar2").removeClass("visually-hidden");
    }
  );
}

function borrarContactos(id) {
  var confirmacionBorrado = confirm("¿Esta seguro de eliminar Contacto?");
  if (confirmacionBorrado) {
    $.get("./php/instruccion.php?borrarContactos=" + id, function () {
      listarContactos($("#idusuario2").val());
    });
  }
}