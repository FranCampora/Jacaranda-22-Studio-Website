<script setup>
import { ref, onMounted } from 'vue';
import { reportesService } from '../services/reportesService';

// ============================================================================
// Estados Reactivos
// ============================================================================
const tipoSeleccionado = ref('general');
const reporte = ref(null);
const cargando = ref(false);
const mensajeError = ref('');

// ============================================================================
// Funciones Explícitas de Consulta de Reportes
// ============================================================================
async function cargarReporte(tipo) {
  tipoSeleccionado.value = tipo;
  cargando.value = true;
  mensajeError.value = '';

  try {
    const datos = await reportesService.obtenerPorTipo(tipo);
    reporte.value = datos;
  } catch (error) {
    mensajeError.value = error.message;
  } finally {
    cargando.value = false;
  }
}

onMounted(() => {
  cargarReporte('general');
});
</script>

<template>
  <section>
    <h2>Reportes del Estudio Jacarandá 22</h2>

    <!-- Selector de tipo de reporte -->
    <div style="margin-bottom: 1.5rem; display: flex; gap: 0.5rem; flex-wrap: wrap;">
      <button
        type="button"
        :class="{ 'boton-primario': tipoSeleccionado === 'general' }"
        @click="cargarReporte('general')"
      >
        Reporte General
      </button>
      <button
        type="button"
        :class="{ 'boton-primario': tipoSeleccionado === 'financiero' }"
        @click="cargarReporte('financiero')"
      >
        Financiero y Horas
      </button>
      <button
        type="button"
        :class="{ 'boton-primario': tipoSeleccionado === 'estado' }"
        @click="cargarReporte('estado')"
      >
        Por Estado
      </button>
      <button
        type="button"
        :class="{ 'boton-primario': tipoSeleccionado === 'genero' }"
        @click="cargarReporte('genero')"
      >
        Por Género
      </button>
    </div>

    <div v-if="mensajeError" class="alerta alerta-error">
      {{ mensajeError }}
    </div>

    <!-- NOTA ARQUITECTURA WEB:
         La transición entre "Cargando..." y la renderización del reporte mediante v-if / v-else
         sustituye nodos en el DOM. Esto desencadena un ciclo de Reflow (el navegador calcula el
         espacio de las tarjetas y tablas) y de Repaint (dibuja textos, bordes y fondos). -->
    <p v-if="cargando">Generando reporte...</p>

    <div v-else-if="reporte">
      <!-- Tarjetas de Métricas Financieras -->
      <article v-if="reporte.finanzas || reporte.tipo === 'financiero'" class="panel-detalle">
        <h3>Métricas Financieras y de Carga Horaria</h3>
        <div class="tarjetas-resumen">
          <div class="tarjeta">
            <div>Total de Proyectos</div>
            <div class="tarjeta-valor">
              {{ (reporte.finanzas || reporte.datos).total_proyectos || 0 }}
            </div>
          </div>
          <div class="tarjeta">
            <div>Total Horas Dedicadas</div>
            <div class="tarjeta-valor">
              {{ (reporte.finanzas || reporte.datos).total_horas || 0 }} h
            </div>
          </div>
          <div class="tarjeta">
            <div>Facturación Estimada</div>
            <div class="tarjeta-valor">
              ${{ (reporte.finanzas || reporte.datos).facturacion_estimada || 0 }}
            </div>
          </div>
          <div class="tarjeta">
            <div>Precio Promedio / Hora</div>
            <div class="tarjeta-valor">
              ${{ (reporte.finanzas || reporte.datos).promedio_precio_hora || 0 }}
            </div>
          </div>
        </div>
      </article>

      <!-- Tabla de Proyectos por Estado -->
      <article v-if="reporte.distribucionEstados || reporte.tipo === 'estado'" class="panel-detalle">
        <h3>Distribución de Proyectos por Estado</h3>
        <p v-if="reporte.totalProyectos !== undefined">
          <strong>Total proyectos analizados:</strong> {{ reporte.totalProyectos }}
        </p>
        <div class="contenedor-tabla">
          <table>
            <thead>
              <tr>
                <th>Estado</th>
                <th>Cantidad de Proyectos</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in (reporte.distribucionEstados || reporte.datos)" :key="item.estado">
                <td><strong>{{ item.estado }}</strong></td>
                <td>{{ item.cantidad }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </article>

      <!-- Tabla de Proyectos por Género -->
      <article v-if="reporte.distribucionGeneros || reporte.tipo === 'genero'" class="panel-detalle">
        <h3>Distribución de Proyectos por Género Musical</h3>
        <p v-if="reporte.totalProyectos !== undefined">
          <strong>Total proyectos analizados:</strong> {{ reporte.totalProyectos }}
        </p>
        <div class="contenedor-tabla">
          <table>
            <thead>
              <tr>
                <th>Género</th>
                <th>Cantidad de Proyectos</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in (reporte.distribucionGeneros || reporte.datos)" :key="item.genero">
                <td><strong>{{ item.genero }}</strong></td>
                <td>{{ item.cantidad }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </article>
    </div>
  </section>
</template>
