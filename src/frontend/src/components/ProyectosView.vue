<script setup>
import { ref, onMounted } from 'vue';
import { proyectosService } from '../services/proyectosService';
import { integrantesService } from '../services/integrantesService';

// ============================================================================
// Estados Reactivos
// Cada variable representa explícitamente una parte del estado de la interfaz.
// ============================================================================
const listaProyectos = ref([]);
const listaIntegrantesDisponibles = ref([]);
const cargando = ref(false);
const mensajeExito = ref('');
const mensajeError = ref('');

// Control del formulario (modo creación o edición según editandoId)
const editandoId = ref(null);
const formulario = ref({
  nombre: '',
  tipo: '',
  estado: '',
  fecha_inicio: '',
  fecha_fin_estimada: '',
  fecha_fin: '',
  genero: '',
  descripcion: '',
  precio_por_hora: 0,
  cantidad_horas: 0
});

// Panel de detalle e integrantes vinculados
const proyectoSeleccionado = ref(null);
const nuevoIntegranteId = ref('');
const nuevoRolEnProyecto = ref('');

// ============================================================================
// Funciones Explícitas del Ciclo de Vida y CRUD
// ============================================================================

// Carga la lista inicial de proyectos desde la API
async function cargarProyectos() {
  cargando.value = true;
  mensajeError.value = '';
  try {
    const datos = await proyectosService.obtenerTodos();
    listaProyectos.value = datos;
  } catch (error) {
    mensajeError.value = error.message;
  } finally {
    cargando.value = false;
  }
}

// Carga los integrantes para el selector de asignación
async function cargarIntegrantesDisponibles() {
  try {
    const datos = await integrantesService.obtenerTodos();
    listaIntegrantesDisponibles.value = datos;
  } catch (error) {
    console.error('Error al cargar integrantes disponibles:', error);
  }
}

// Limpia el formulario y resetea el modo edición
function limpiarFormulario() {
  editandoId.value = null;
  formulario.value = {
    nombre: '',
    tipo: '',
    estado: '',
    fecha_inicio: '',
    fecha_fin_estimada: '',
    fecha_fin: '',
    genero: '',
    descripcion: '',
    precio_por_hora: 0,
    cantidad_horas: 0
  };
}

// Carga los datos de una fila en el formulario para editar
function seleccionarParaEditar(proyecto) {
  editandoId.value = proyecto.id;
  formulario.value = {
    nombre: proyecto.nombre || '',
    tipo: proyecto.tipo || '',
    estado: proyecto.estado || '',
    fecha_inicio: proyecto.fecha_inicio || '',
    fecha_fin_estimada: proyecto.fecha_fin_estimada || '',
    fecha_fin: proyecto.fecha_fin || '',
    genero: proyecto.genero || '',
    descripcion: proyecto.descripcion || '',
    precio_por_hora: proyecto.precio_por_hora !== null ? proyecto.precio_por_hora : 0,
    cantidad_horas: proyecto.cantidad_horas !== null ? proyecto.cantidad_horas : 0
  };
  mensajeError.value = '';
  mensajeExito.value = '';
}

// Guarda (crea o actualiza) un proyecto construyendo el payload explícitamente
async function guardarProyecto() {
  mensajeError.value = '';
  mensajeExito.value = '';

  const datosAEnviar = {
    nombre: formulario.value.nombre,
    tipo: formulario.value.tipo,
    estado: formulario.value.estado,
    fecha_inicio: formulario.value.fecha_inicio,
    fecha_fin_estimada: formulario.value.fecha_fin_estimada,
    fecha_fin: formulario.value.fecha_fin,
    genero: formulario.value.genero,
    descripcion: formulario.value.descripcion,
    precio_por_hora: formulario.value.precio_por_hora,
    cantidad_horas: formulario.value.cantidad_horas
  };

  try {
    if (editandoId.value) {
      await proyectosService.actualizar(editandoId.value, datosAEnviar);
      mensajeExito.value = 'Proyecto actualizado con éxito';
    } else {
      await proyectosService.crear(datosAEnviar);
      mensajeExito.value = 'Proyecto creado con éxito';
    }
    limpiarFormulario();
    await cargarProyectos();
  } catch (error) {
    mensajeError.value = error.message;
  }
}

// Elimina un proyecto previa confirmación
async function borrarProyecto(id) {
  const confirmacion = window.confirm(`¿Estás seguro de que deseas eliminar el proyecto ID ${id}?`);
  if (!confirmacion) return;

  mensajeError.value = '';
  mensajeExito.value = '';

  try {
    await proyectosService.eliminar(id);
    mensajeExito.value = 'Proyecto eliminado con éxito';
    if (proyectoSeleccionado.value && proyectoSeleccionado.value.id === id) {
      proyectoSeleccionado.value = null;
    }
    await cargarProyectos();
  } catch (error) {
    mensajeError.value = error.message;
  }
}

// Abre el detalle de un proyecto y consulta sus integrantes relacionados
async function verDetalle(id) {
  mensajeError.value = '';
  try {
    const proyecto = await proyectosService.obtenerPorId(id);
    proyectoSeleccionado.value = proyecto;
    await cargarIntegrantesDisponibles();
  } catch (error) {
    mensajeError.value = error.message;
  }
}

function cerrarDetalle() {
  proyectoSeleccionado.value = null;
  nuevoIntegranteId.value = '';
  nuevoRolEnProyecto.value = '';
}

// Vincula un integrante al proyecto seleccionado (POST a la tabla intermedia)
async function asignarNuevoIntegrante() {
  if (!nuevoIntegranteId.value) {
    mensajeError.value = 'Debes seleccionar un integrante para asignar';
    return;
  }

  mensajeError.value = '';
  try {
    await proyectosService.asignarIntegrante(
      proyectoSeleccionado.value.id,
      nuevoIntegranteId.value,
      nuevoRolEnProyecto.value
    );
    nuevoIntegranteId.value = '';
    nuevoRolEnProyecto.value = '';
    await verDetalle(proyectoSeleccionado.value.id);
  } catch (error) {
    mensajeError.value = error.message;
  }
}

// Desvincula al integrante del proyecto (DELETE en tabla intermedia)
async function desvincularIntegrante(integranteId) {
  const confirmacion = window.confirm('¿Deseas desvincular a este integrante del proyecto?');
  if (!confirmacion) return;

  mensajeError.value = '';
  try {
    await proyectosService.desvincularIntegrante(proyectoSeleccionado.value.id, integranteId);
    await verDetalle(proyectoSeleccionado.value.id);
  } catch (error) {
    mensajeError.value = error.message;
  }
}

onMounted(() => {
  cargarProyectos();
});
</script>

<template>
  <section>
    <h2>Gestión de Proyectos</h2>

    <!-- NOTA ARQUITECTURA WEB:
         v-if inserta y remueve elementos del árbol DOM. Al cambiar la condición,
         el navegador recalcula geometría y posiciones (Reflow o Layout)
         y posteriormente redibuja los píxeles en pantalla (Repaint). -->
    <div v-if="mensajeExito" class="alerta alerta-exito">
      {{ mensajeExito }}
    </div>
    <div v-if="mensajeError" class="alerta alerta-error">
      {{ mensajeError }}
    </div>

    <!-- Formulario para Alta y Modificación de Proyectos -->
    <form @submit.prevent="guardarProyecto">
      <h3>{{ editandoId ? 'Editar Proyecto (ID: ' + editandoId + ')' : 'Nuevo Proyecto' }}</h3>

      <div class="fila-formulario">
        <div class="campo">
          <label for="nombre">Nombre *</label>
          <input id="nombre" v-model="formulario.nombre" type="text" required placeholder="Ej: Álbum Acústico" />
        </div>

        <div class="campo">
          <label for="tipo">Tipo *</label>
          <input id="tipo" v-model="formulario.tipo" type="text" required placeholder="Ej: single, EP, disco, beat" />
        </div>

        <div class="campo">
          <label for="estado">Estado *</label>
          <input id="estado" v-model="formulario.estado" type="text" required placeholder="Ej: nuevo, grabacion, mezcla" />
        </div>
      </div>

      <div class="fila-formulario">
        <div class="campo">
          <label for="fecha_inicio">Fecha Inicio *</label>
          <input id="fecha_inicio" v-model="formulario.fecha_inicio" type="date" required />
        </div>

        <div class="campo">
          <label for="fecha_fin_estimada">Fecha Estimada</label>
          <input id="fecha_fin_estimada" v-model="formulario.fecha_fin_estimada" type="date" />
        </div>

        <div class="campo">
          <label for="fecha_fin">Fecha Fin Real</label>
          <input id="fecha_fin" v-model="formulario.fecha_fin" type="date" />
        </div>
      </div>

      <div class="fila-formulario">
        <div class="campo">
          <label for="genero">Género Musical</label>
          <input id="genero" v-model="formulario.genero" type="text" placeholder="Ej: Rock, Trap, Pop" />
        </div>

        <div class="campo">
          <label for="precio_por_hora">Precio por Hora ($)</label>
          <input id="precio_por_hora" v-model.number="formulario.precio_por_hora" type="number" step="any" min="0" />
        </div>

        <div class="campo">
          <label for="cantidad_horas">Cantidad de Horas</label>
          <input id="cantidad_horas" v-model.number="formulario.cantidad_horas" type="number" step="any" min="0" />
        </div>
      </div>

      <div class="fila-formulario">
        <div class="campo">
          <label for="descripcion">Descripción</label>
          <textarea id="descripcion" v-model="formulario.descripcion" rows="2" placeholder="Detalles u observaciones del proyecto"></textarea>
        </div>
      </div>

      <div class="acciones-formulario">
        <button type="submit" class="boton-primario">
          {{ editandoId ? 'Guardar Cambios' : 'Crear Proyecto' }}
        </button>
        <button v-if="editandoId" type="button" @click="limpiarFormulario" class="boton-secundario">
          Cancelar Edición
        </button>
      </div>
    </form>

    <!-- NOTA ARQUITECTURA WEB:
         El panel de detalle se inserta dinámicamente con v-if="proyectoSeleccionado".
         Su aparición o cierre provoca un Reflow (redimensionamiento del contenedor principal)
         seguido del Repaint de todos los nuevos nodos en pantalla. -->
    <article v-if="proyectoSeleccionado" class="panel-detalle">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
        <h3 style="margin: 0;">Detalle: {{ proyectoSeleccionado.nombre }} (ID: {{ proyectoSeleccionado.id }})</h3>
        <button type="button" @click="cerrarDetalle" class="boton-secundario">Cerrar Detalle</button>
      </div>

      <p><strong>Tipo:</strong> {{ proyectoSeleccionado.tipo }} | <strong>Estado:</strong> {{ proyectoSeleccionado.estado }} | <strong>Género:</strong> {{ proyectoSeleccionado.genero || '-' }}</p>
      <p><strong>Fechas:</strong> Inicio: {{ proyectoSeleccionado.fecha_inicio }} | Estimada: {{ proyectoSeleccionado.fecha_fin_estimada || '-' }} | Fin: {{ proyectoSeleccionado.fecha_fin || '-' }}</p>
      <p><strong>Presupuesto:</strong> {{ proyectoSeleccionado.cantidad_horas }} h a ${{ proyectoSeleccionado.precio_por_hora }}/h (Total estimado: ${{ proyectoSeleccionado.cantidad_horas * proyectoSeleccionado.precio_por_hora }})</p>
      <p><strong>Descripción:</strong> {{ proyectoSeleccionado.descripcion || 'Sin descripción' }}</p>

      <h4>Integrantes Asignados</h4>
      <div class="contenedor-tabla">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Rol General</th>
              <th>Rol en Proyecto</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="proyectoSeleccionado.integrantes.length === 0">
              <td colspan="5">No hay integrantes asignados a este proyecto.</td>
            </tr>
            <tr v-for="integrante in proyectoSeleccionado.integrantes" :key="integrante.id">
              <td>{{ integrante.id }}</td>
              <td>{{ integrante.nombre }}</td>
              <td>{{ integrante.rol }}</td>
              <td>{{ integrante.rol_en_proyecto || 'Sin especificar' }}</td>
              <td>
                <button type="button" @click="desvincularIntegrante(integrante.id)" class="boton-peligro">
                  Desvincular
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Asignación de Integrante al Proyecto -->
      <form @submit.prevent="asignarNuevoIntegrante" style="margin-top: 1rem; background-color: #fafafa;">
        <h4 style="margin-top: 0;">Asignar Integrante al Proyecto</h4>
        <div class="fila-formulario">
          <div class="campo">
            <label for="select-integrante">Integrante</label>
            <select id="select-integrante" v-model="nuevoIntegranteId" required>
              <option value="" disabled>Seleccione un integrante</option>
              <option v-for="i in listaIntegrantesDisponibles" :key="i.id" :value="i.id">
                {{ i.nombre }} ({{ i.rol }})
              </option>
            </select>
          </div>
          <div class="campo">
            <label for="rol-proyecto">Rol específico en este proyecto</label>
            <input id="rol-proyecto" v-model="nuevoRolEnProyecto" type="text" placeholder="Ej: Grabación de voz, Mezcla" />
          </div>
        </div>
        <button type="submit" class="boton-primario">Asignar Integrante</button>
      </form>
    </article>

    <!-- Tabla Principal de Proyectos -->
    <h3>Listado de Proyectos</h3>
    <p v-if="cargando">Cargando proyectos...</p>
    <div v-else class="contenedor-tabla">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Estado</th>
            <th>Fecha Inicio</th>
            <th>Género</th>
            <th>Horas</th>
            <th>Precio/h</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="listaProyectos.length === 0">
            <td colspan="9">No hay proyectos registrados.</td>
          </tr>
          <tr v-for="proyecto in listaProyectos" :key="proyecto.id">
            <td>{{ proyecto.id }}</td>
            <td>{{ proyecto.nombre }}</td>
            <td>{{ proyecto.tipo }}</td>
            <td>{{ proyecto.estado }}</td>
            <td>{{ proyecto.fecha_inicio }}</td>
            <td>{{ proyecto.genero || '-' }}</td>
            <td>{{ proyecto.cantidad_horas }}</td>
            <td>${{ proyecto.precio_por_hora }}</td>
            <td class="acciones-tabla">
              <button type="button" @click="verDetalle(proyecto.id)">
                Ver / Integrantes
              </button>
              <button type="button" @click="seleccionarParaEditar(proyecto)">
                Editar
              </button>
              <button type="button" @click="borrarProyecto(proyecto.id)" class="boton-peligro">
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
