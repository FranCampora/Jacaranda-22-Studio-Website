<script setup>
import { ref, onMounted } from 'vue';
import { integrantesService } from '../services/integrantesService';


const listaIntegrantes = ref([]);
const cargando = ref(false);
const mensajeExito = ref('');
const mensajeError = ref('');

// Estado del formulario 
const editandoId = ref(null);
const formulario = ref({
  nombre: '',
  rol: '',
  email: '',
  telefono: ''
});

// Detalle del integrante con sus proyectos vinculados
const integranteSeleccionado = ref(null);

//funciones CRUD

// Carga la lista de integrantes desde el endpoint GET /api/v1/integrantes
async function cargarIntegrantes() {
  cargando.value = true;
  mensajeError.value = '';
  try {
    const datos = await integrantesService.obtenerTodos();
    listaIntegrantes.value = datos;
  } catch (error) {
    mensajeError.value = error.message;
  } finally {
    cargando.value = false;
  }
}

// Resetea los campos del formulario y el modo de edición
function limpiarFormulario() {
  editandoId.value = null;
  formulario.value = {
    nombre: '',
    rol: '',
    email: '',
    telefono: ''
  };
}

// Toma un integrante de la tabla y carga sus valores en el formulario
function seleccionarParaEditar(integrante) {
  editandoId.value = integrante.id;
  formulario.value = {
    nombre: integrante.nombre || '',
    rol: integrante.rol || '',
    email: integrante.email || '',
    telefono: integrante.telefono || ''
  };
  mensajeError.value = '';
  mensajeExito.value = '';
}

// Envía la petición POST o PUT construyendo el objeto explícitamente
async function guardarIntegrante() {
  mensajeError.value = '';
  mensajeExito.value = '';

  const datosAEnviar = {
    nombre: formulario.value.nombre,
    rol: formulario.value.rol,
    email: formulario.value.email,
    telefono: formulario.value.telefono
  };

  try {
    if (editandoId.value) {
      await integrantesService.actualizar(editandoId.value, datosAEnviar);
      mensajeExito.value = 'Integrante actualizado con éxito';
    } else {
      await integrantesService.crear(datosAEnviar);
      mensajeExito.value = 'Integrante creado con éxito';
    }
    limpiarFormulario();
    await cargarIntegrantes();
  } catch (error) {
    mensajeError.value = error.message;
  }
}

// Elimina un integrante mediante petición DELETE
async function borrarIntegrante(id) {
  const confirmacion = window.confirm(`¿Estás seguro de que deseas eliminar al integrante ID ${id}?`);
  if (!confirmacion) return;

  mensajeError.value = '';
  mensajeExito.value = '';

  try {
    await integrantesService.eliminar(id);
    mensajeExito.value = 'Integrante eliminado con éxito';
    if (integranteSeleccionado.value && integranteSeleccionado.value.id === id) {
      integranteSeleccionado.value = null;
    }
    await cargarIntegrantes();
  } catch (error) {
    mensajeError.value = error.message;
  }
}

// Abre el panel de detalle trayendo los proyectos asignados a este integrante
async function verDetalle(id) {
  mensajeError.value = '';
  try {
    const integrante = await integrantesService.obtenerPorId(id);
    integranteSeleccionado.value = integrante;
  } catch (error) {
    mensajeError.value = error.message;
  }
}

function cerrarDetalle() {
  integranteSeleccionado.value = null;
}

onMounted(() => {
  cargarIntegrantes();
});
//las alertas por v-if producen reflow y repaint. 
// v-show se usa para elementos que se muestran/ocultan frecuentemente sin alterar la estructura del DOM.
</script>

<template>
  <section>
    <h2>Gestión de Integrantes</h2>

    <div v-if="mensajeExito" class="alerta alerta-exito">
      {{ mensajeExito }}
    </div>
    <div v-if="mensajeError" class="alerta alerta-error">
      {{ mensajeError }}
    </div>

    <!-- Formulario de Integrantes -->
    <form @submit.prevent="guardarIntegrante">
      <h3>{{ editandoId ? 'Editar Integrante (ID: ' + editandoId + ')' : 'Nuevo Integrante' }}</h3>

      <div class="fila-formulario">
        <div class="campo">
          <label for="nombre-integrante">Nombre completo *</label>
          <input id="nombre-integrante" v-model="formulario.nombre" type="text" required placeholder="Ej: Francisco Gómez" />
        </div>

        <div class="campo">
          <label for="rol-integrante">Rol general *</label>
          <input id="rol-integrante" v-model="formulario.rol" type="text" required placeholder="Ej: Productor, Artista, Sesionista" />
        </div>
      </div>

      <div class="fila-formulario">
        <div class="campo">
          <label for="email-integrante">Correo Electrónico</label>
          <input id="email-integrante" v-model="formulario.email" type="email" placeholder="ejemplo@jacaranda22.com" />
        </div>

        <div class="campo">
          <label for="telefono-integrante">Teléfono de contacto</label>
          <input id="telefono-integrante" v-model="formulario.telefono" type="tel" placeholder="Ej: +54 11 1234-5678" />
        </div>
      </div>

      <div class="acciones-formulario">
        <button type="submit" class="boton-primario">
          {{ editandoId ? 'Guardar Cambios' : 'Crear Integrante' }}
        </button>
        <button v-if="editandoId" type="button" @click="limpiarFormulario" class="boton-secundario">
          Cancelar Edición
        </button>
      </div>
    </form>

    <article v-if="integranteSeleccionado" class="panel-detalle">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
        <h3 style="margin: 0;">Proyectos de: {{ integranteSeleccionado.nombre }} (ID: {{ integranteSeleccionado.id }})</h3>
        <button type="button" @click="cerrarDetalle" class="boton-secundario">Cerrar Detalle</button>
      </div>

      <p><strong>Rol:</strong> {{ integranteSeleccionado.rol }} | <strong>Email:</strong> {{ integranteSeleccionado.email || '-' }} | <strong>Teléfono:</strong> {{ integranteSeleccionado.telefono || '-' }}</p>

      <h4>Proyectos Asignados</h4>
      <div class="contenedor-tabla">
        <table>
          <thead>
            <tr>
              <th>ID Proyecto</th>
              <th>Nombre del Proyecto</th>
              <th>Tipo</th>
              <th>Estado</th>
              <th>Rol en Proyecto</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="integranteSeleccionado.proyectos.length === 0">
              <td colspan="5">Este integrante aún no tiene proyectos asignados.</td>
            </tr>
            <tr v-for="proyecto in integranteSeleccionado.proyectos" :key="proyecto.id">
              <td>{{ proyecto.id }}</td>
              <td>{{ proyecto.nombre }}</td>
              <td>{{ proyecto.tipo }}</td>
              <td>{{ proyecto.estado }}</td>
              <td>{{ proyecto.rol_en_proyecto || 'Sin especificar' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </article>

    <!-- Listado de Integrantes -->
    <h3>Listado de Integrantes</h3>
    <p v-if="cargando">Cargando integrantes...</p>
    <div v-else class="contenedor-tabla">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Rol</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="listaIntegrantes.length === 0">
            <td colspan="6">No hay integrantes registrados.</td>
          </tr>
          <tr v-for="integrante in listaIntegrantes" :key="integrante.id">
            <td>{{ integrante.id }}</td>
            <td>{{ integrante.nombre }}</td>
            <td>{{ integrante.rol }}</td>
            <td>{{ integrante.email || '-' }}</td>
            <td>{{ integrante.telefono || '-' }}</td>
            <td class="acciones-tabla">
              <button type="button" @click="verDetalle(integrante.id)">
                Ver Proyectos
              </button>
              <button type="button" @click="seleccionarParaEditar(integrante)">
                Editar
              </button>
              <button type="button" @click="borrarIntegrante(integrante.id)" class="boton-peligro">
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
