<script setup>
import CardLibro from "@/components/CardLibro.vue";
import { useLibroStore } from "@/stores/libroStore";

const libroStore = useLibroStore();

</script>

<template>
  <div class="md-page">

    <header class="md-page-header">
      <h1 class="page-title">Lista de Libros</h1>
      <p class="page-subtitle">
        {{ libroStore.libros.length }}
        {{ libroStore.libros.length === 1 ? 'libro' : 'libros' }} en tu biblioteca
      </p>
    </header>

  
    <main v-if="libroStore.libros.length > 0" class="card-grid">
      <CardLibro
        v-for="item in libroStore.libros"
        :key="item.id"
        :libro="item"
      />
    </main>


    <div v-else class="empty-state">
      <span class="empty-state__icon">📚</span>
      <h2 class="empty-state__title">Tu biblioteca está vacía</h2>
      <p class="empty-state__description">
        Agregá categorías y libros desde la pantalla de inicio.
      </p>
    </div>

  </div>
</template>

<style scoped>

.md-page {
  background-color: var(--md-sys-color-background);
  min-height: 100vh;
  padding: 24px;
  font-family: 'Roboto', sans-serif;
  color: var(--md-sys-color-on-surface);
}

.md-page-header {
  margin-bottom: 24px;
}

.page-title {
  font-size: var(--md-sys-typescale-display-small-size); /* 36px */
  font-weight: 400;
  line-height: 1.2;
  color: var(--md-sys-color-on-surface);
  margin: 0 0 4px 0;
}

.page-subtitle {
  font-size: var(--md-sys-typescale-body-large-size); /* 16px */
  font-weight: 400;
  color: var(--md-sys-color-on-surface-variant);
  margin: 0;
}



.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  align-items: start;
}



.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  text-align: center;
  gap: 12px;
}

.empty-state__icon {
  font-size: 56px;
  line-height: 1;
}

.empty-state__title {
  font-size: var(--md-sys-typescale-title-large-size); /* 22px */
  font-weight: 500;
  color: var(--md-sys-color-on-surface);
  margin: 0;
}

.empty-state__description {
  font-size: var(--md-sys-typescale-body-medium-size); /* 14px */
  color: var(--md-sys-color-on-surface-variant);
  margin: 0;
  max-width: 300px; /* limita el ancho para mejor legibilidad */
}
</style>