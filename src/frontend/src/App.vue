<script setup>
import { ref } from 'vue';
/*Traigo los componentes de View para poder usarlos*/
import ProyectosView from './components/ProyectosView.vue';
import IntegrantesView from './components/IntegrantesView.vue';
import ReportesView from './components/ReportesView.vue';
import logoUrl from './assets/logo.png';

// Estado reactivo para determinar la sección visualizada osea para que vaya sabiendo cual es la secciona actual
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
        <img :src="logoUrl" alt="Jacarandá 22 Studio" class="logo" /><!--La imagen esta en la carptea de assets-->
        <span class="titulo-sitio">Jacarandá 22 Studio</span>
      </div>

      <!-- Navegación por pestañas -->
      <nav class="navegacion">
        <button
          type="button"
          :class="['pestaña', { activa: seccionActual === 'proyectos' }]"
          @click="cambiarSeccion('proyectos')"
        >
          Proyectos
        </button>
        <button
          type="button"
          :class="['pestaña', { activa: seccionActual === 'integrantes' }]"
          @click="cambiarSeccion('integrantes')"
        >
          Integrantes
        </button>
        <button
          type="button"
          :class="['pestaña', { activa: seccionActual === 'reportes' }]"
          @click="cambiarSeccion('reportes')"
        >
          Reportes
        </button>
      </nav>
    </header>

    <!-- cambiar de vista mediante v-if -->
    <!--lleva a un reflow y repaint completo del contenedor principal <main> -->
    
    
    <main class="contenido-principal">
      <ProyectosView v-if="seccionActual === 'proyectos'" />
      <IntegrantesView v-if="seccionActual === 'integrantes'" />
      <ReportesView v-if="seccionActual === 'reportes'" />
    </main>
  </div>
</template>
