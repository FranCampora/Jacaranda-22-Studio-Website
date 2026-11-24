<script setup>
import { ref } from 'vue';
import ProyectosView from './components/ProyectosView.vue';
import IntegrantesView from './components/IntegrantesView.vue';
import ReportesView from './components/ReportesView.vue';
import logoUrl from './assets/logo.png';

// Sección activa de navegación
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
        <div class="marca-info">
          <span class="titulo-sitio">Jacarandá 22</span>
          <span class="subtitulo-sitio">Recording & Mixing Studio</span>
        </div>
      </div>

      <!-- Navegación por consolas/módulos -->
      <nav class="navegacion" aria-label="Consola de navegación">
        <button
          type="button"
          :class="['pestaña', { activa: seccionActual === 'proyectos' }]"
          @click="cambiarSeccion('proyectos')"
        >
          <span>🎙️</span> Sesiones & Proyectos
        </button>
        <button
          type="button"
          :class="['pestaña', { activa: seccionActual === 'integrantes' }]"
          @click="cambiarSeccion('integrantes')"
        >
          <span>🎚️</span> Equipo & Músicos
        </button>
        <button
          type="button"
          :class="['pestaña', { activa: seccionActual === 'reportes' }]"
          @click="cambiarSeccion('reportes')"
        >
          <span>📊</span> Reportes & Métricas
        </button>
      </nav>
    </header>

    <!-- Contenido principal según consola seleccionada -->
    <main class="contenido-principal">
      <ProyectosView v-if="seccionActual === 'proyectos'" />
      <IntegrantesView v-if="seccionActual === 'integrantes'" />
      <ReportesView v-if="seccionActual === 'reportes'" />
    </main>

    <footer class="footer-estudio">
      <span>Jacarandá 22 Studio</span>
      <span>Panel</span>
    </footer>
  </div>
</template>
