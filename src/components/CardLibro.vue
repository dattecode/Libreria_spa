<script setup>
import { useLibroStore } from '@/stores/libroStore';
import { useRouter } from 'vue-router';


const props = defineProps({
  libro: {
    type: Object,
    required: true,
  },
});

const libroStore = useLibroStore();
const eliminarLibro = (id) => libroStore.eliminarLibro(id);

const route = useRouter();
const verLibro = (id) => route.push(`/detalle/${id}`);

</script>

<template>
  <article class="card">
    <!-- ZONA 1: HEADER -->
    <div class="card__header">
      <h2 class="card__title">{{ libro.nombre }}</h2>

      <span class="card__chip">{{ libro.categoria }}</span>
    </div>

    <!-- ZONA 2: CONTENT -->
    <div class="card__content">
      <p class="card__description">{{ libro.descripcion }}</p>

      <p class="card__editor">{{ libro.editor }}</p>
    </div>

    <!-- ZONA 3: ACTIONS -->
    <div class="card__actions">
      <button 
      class="card__btn card__btn--edit"
      @click="verLibro(libro.id)"
       >Editar</button>
      <button 
      class="card__btn card__btn--delete"
      @click="eliminarLibro(libro.id)"
       >Eliminar</button>
    </div>
  </article>
</template>

<style scoped>
/* ─────────────────────────────────────────────
   CARD BASE
───────────────────────────────────────────── */
.card {
  background-color: var(--md-sys-color-surface);
  border-radius: var(--md-sys-shape-corner-extra-small);
  box-shadow: var(--md-sys-elevation-level1);
  border-left: var(--md-sys-shape-corner-extra-small) solid var(--md-sys-color-primary);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: box-shadow 200ms cubic-bezier(0.2, 0, 0, 1);
  overflow: hidden;
  position: relative;
}

.card:hover {
  box-shadow:
    0px 1px 2px rgba(0, 0, 0, 0.3),
    0px 2px 6px 2px rgba(0, 0, 0, 0.15);
}

/* ─────────────────────────────────────────────
   HEADER
───────────────────────────────────────────── */
.card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
}

.card__title {
  font-size: var(--md-sys-typescale-title-large-size);
  font-weight: 500;
  line-height: 1.3;
  color: var(--md-sys-color-on-surface);
  margin: 0;
}

/* ─────────────────────────────────────────────
   CHIP
───────────────────────────────────────────── */
.card__chip {
  display: inline-flex;
  align-items: center;
  height: 32px;
  padding: 0 12px;
  border: 1px solid var(--md-sys-color-outline);
  border-radius: var(--md-sys-shape-corner-small);
  font-size: var(--md-sys-typescale-label-large-size);
  font-weight: 500;
  color: var(--md-sys-color-on-surface-variant);
  white-space: nowrap;
  flex-shrink: 0;
}

/* ─────────────────────────────────────────────
   CONTENT
───────────────────────────────────────────── */
.card__content {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-bottom: 12px; /* ← espacio visual antes de actions */
}

.card__description {
  font-size: var(--md-sys-typescale-body-medium-size);
  font-weight: 400;
  line-height: 1.5;
  color: var(--md-sys-color-on-surface-variant);
  margin: 0;

  /* Limita el texto largo */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card__editor {
  font-size: var(--md-sys-typescale-body-small-size);
  font-weight: 400;
  color: var(--md-sys-color-on-surface-variant);
  margin: 0;
}

/* ─────────────────────────────────────────────
   ACTIONS
───────────────────────────────────────────── */
.card__actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding-top: 4px;
  border-top: 1px solid var(--md-sys-color-outline);
}

/* ─────────────────────────────────────────────
   BUTTON BASE
───────────────────────────────────────────── */
.card__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 0 12px;
  border: none;
  border-radius: var(--md-sys-shape-corner-full);
  font-size: var(--md-sys-typescale-label-large-size);
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  background: transparent;
  position: relative;
  overflow: hidden;
  transition: background-color 200ms;
}

/* STATE LAYER */
.card__btn::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 200ms;
  border-radius: inherit;
}

.card__btn:hover::before {
  opacity: 0.08;
}

.card__btn:active::before {
  opacity: 0.12;
}

/* EDIT BUTTON */
.card__btn--edit {
  color: var(--md-sys-color-primary);
}

.card__btn--edit::before {
  background-color: var(--md-sys-color-primary);
}

/* DELETE BUTTON */
.card__btn--delete {
  color: #b3261e;
}

.card__btn--delete::before {
  background-color: #b3261e;
}
</style>
