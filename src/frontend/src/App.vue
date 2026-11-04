<script setup>
import { ref } from 'vue';
import ProyectosView from './components/ProyectosView.vue';
import IntegrantesView from './components/IntegrantesView.vue';
import ReportesView from './components/ReportesView.vue';
import logoUrl from './assets/logo.png';

// Estado reactivo para determinar la sección visualizada
const seccionActual = ref('proyectos');

// Función explícita para cambiar de pestaña
function cambiarSeccion(nuevaSeccion) {
  seccionActual.value = nuevaSeccion;
}
</script>

<template>
  <div class="app-contenedor">
    <header class="barra-superior">
      <div class="marca">
        <img :src="logoUrl" alt="Jacarandá 22 Studio" class="logo" />
        <span class="titulo-sitio">Jacarandá 22 Studio</span>
      </div>

      <!-- Navegación por pestañas -->
      <nav class="navegacion">
        <button
          type="button"
          :class="['pestana', { activa: seccionActual === 'proyectos' }]"
          @click="cambiarSeccion('proyectos')"
        >
          Proyectos
        </button>
        <button
          type="button"
          :class="['pestana', { activa: seccionActual === 'integrantes' }]"
          @click="cambiarSeccion('integrantes')"
        >
          Integrantes
        </button>
        <button
          type="button"
          :class="['pestana', { activa: seccionActual === 'reportes' }]"
          @click="cambiarSeccion('reportes')"
        >
          Reportes
        </button>
      </nav>
    </header>

    <!-- NOTA ARQUITECTURA WEB (Reflow y Repaint):
         Al alternar entre ProyectosView, IntegrantesView y ReportesView mediante v-if,
         el navegador destruye el subárbol DOM anterior e inserta el nuevo componente.
         Esto provoca un Reflow (Layout) completo del contenedor principal <main> y
         un posterior Repaint para renderizar la nueva vista en pantalla. -->
    <main class="contenido-principal">
      <ProyectosView v-if="seccionActual === 'proyectos'" />
      <IntegrantesView v-if="seccionActual === 'integrantes'" />
      <ReportesView v-if="seccionActual === 'reportes'" />
    </main>
  </div>
</template>
