<script setup>
import { ref } from 'vue';
import ProyectosView from './components/ProyectosView.vue';
import IntegrantesView from './components/IntegrantesView.vue';
import ReportesView from './components/ReportesView.vue';
import logoUrl from './assets/logo.png';

const seccionActual = ref('proyectos');

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

    <main class="contenido-principal">
      <ProyectosView v-if="seccionActual === 'proyectos'" />
      <IntegrantesView v-if="seccionActual === 'integrantes'" />
      <ReportesView v-if="seccionActual === 'reportes'" />
    </main>
  </div>
</template>
