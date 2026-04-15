<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useLibroStore } from "@/stores/libroStore";
import { useApuntesStore } from "@/stores/apuntesStore";
import ModalEditar from "@/components/Modal/ModalEditar.vue";
import ModalApuntes from "@/components/Modal/ModalApuntes.vue";
import CardApuntes from "@/components/CardApuntes.vue";
import ModalTag from "@/components/Modal/ModalTag.vue";
import { useTagStore } from "@/stores/tagStore";
import ModalSelectTag from "@/components/Modal/ModalSelectTag.vue";

//ruta
const route = useRoute();
const idLibro = route.params.id;

//libro
const libroStore = useLibroStore();
const libro = libroStore.getLibroById(idLibro);

//tags
const tagsStore = useTagStore();
const tags = computed(() => {
  if (!idLibro) return [];
  return tagsStore.getTagByLibroId(idLibro) || [];
});
const tieneTags = computed(() => tags.value.length > 0);
const tagActivo = computed(() => tagsStore.tagActivo);

const puedeCrearApunte = computed(() => {
  return tieneTags.value && tagActivo.value;
});

//apuntes por tag arreglar mañana 12.04.2026
const apuntesStore = useApuntesStore();

const apuntes = computed(() => {
  if (!tagActivo.value) return [];

  return apuntesStore.apuntes.filter((a) => a.tagId === tagActivo.value.id);
});

const cambiarTagActivo = (tag) => {
  tagsStore.cambiarTagActivo(tag);
};

//modals
const modalEditar = ref(false);
const modalCrearApuntes = ref(false);
const modalCrearTags = ref(false);
const modalSeleccionarTag = ref(false);

const toggleModalEditar = () => {
  modalEditar.value = !modalEditar.value;
};
const toggleModalCrearApuntes = () => {
  modalCrearApuntes.value = !modalCrearApuntes.value;
};
const toggleModalCrearTags = () => {
  modalCrearTags.value = !modalCrearTags.value;
};
const toggleModalSeleccionarTag = () => {
  modalSeleccionarTag.value = !modalSeleccionarTag.value;
};

onMounted(() => {
  if (!tagActivo.value && tags.value.length > 0) {
    cambiarTagActivo(tags.value[0]);
  }
});

onUnmounted(() => {
  tagsStore.resetTagActivo();
});
</script>

<template>
  <div class="md-page">
    <header class="page-header">
      <h2 class="page-header__title">Detalle</h2>
    </header>

    <section v-if="libro" class="md-card">
      <div class="md-card__content">
        <h3 class="md-card__title">{{ libro.nombre }}</h3>
        <p class="md-card__autor">{{ libro.autor }}</p>
        <p class="md-card__categoria">{{ libro.categoria }}</p>
        <p class="md-card__descripcion">{{ libro.descripcion }}</p>
      </div>
      <div class="md-card__actions">
        <button class="md-button md-button--filled" @click="toggleModalEditar">
          Editar libro
        </button>
        <button
          class="md-button md-button--filled"
          @click="toggleModalCrearTags"
        >
          Agregar tag
        </button>
      </div>
    </section>

    <!-- TAGS -->
    <section class="tags-section">
      <div class="tags-header">
        <h2 class="tags-header__title">Tags</h2>
        <button
          class="md-button md-button--filled"
          @click="toggleModalSeleccionarTag"
        >
          Seleccionar tag
        </button>
      </div>

      <!-- sin tags creados -->
      <div v-if="tags.length === 0" class="tags-empty">
        <span class="tags-empty__icon">🏷️</span>
        <p class="tags-empty__text">
          No hay tags aún. Creá al menos uno para poder agregar apuntes.
        </p>
      </div>

      <!-- con tags: muestra solo el activo -->
      <div v-else class="tags-active">
        <div v-if="!tagActivo" class="tags-active__hint">
          <span class="tags-active__hint-icon">👆</span>
          <p class="tags-active__hint-text">
            Seleccioná un tag para trabajar con sus apuntes.
          </p>
        </div>

        <div v-else class="tags-active__chip">
          <span class="tags-active__chip-dot"></span>
          <span class="tags-active__chip-nombre">{{ tagActivo.titulo }}</span>
        </div>
      </div>
    </section>

    <!-- APUNTES -->
    <section class="notes-section">
      <div class="notes-header">
        <h2 class="notes-header__title">Apuntes</h2>
        <button
          class="md-button md-button--filled"
          :class="{ 'md-button--disabled': !puedeCrearApunte }"
          :disabled="!puedeCrearApunte"
          :title="!tagActivo ? 'Selecciona un tag primero' : ''"
          @click="puedeCrearApunte && toggleModalCrearApuntes()"
        >
          Agregar apunte
        </button>
      </div>

      <div class="notes-list">
        <div v-if="apuntes.length === 0" class="notes-empty">
          <span class="notes-empty__icon">📝</span>
          <p class="notes-empty__text">No hay apuntes todavía.</p>
        </div>
        <div v-else class="notes-list__cards">
          <CardApuntes
            v-for="apunte in apuntes"
            :key="apunte.id"
            :apunte="apunte.id"
            :idLibro="idLibro"
          />
        </div>
      </div>
    </section>

    <!-- modal editar -->
    <div
      v-show="modalEditar"
      class="modal-overlay"
      @click.self="toggleModalEditar"
    >
      <div class="modal">
        <div class="modal__header">
          <h3 class="modal__title">Editar libro</h3>
          <button class="modal__close" @click="toggleModalEditar">✕</button>
        </div>
        <div class="modal__body">
          <ModalEditar :idLibro="idLibro" @close="toggleModalEditar" />
        </div>
      </div>
    </div>

    <!-- modal crear apuntes -->
    <div
      v-show="modalCrearApuntes"
      class="modal-overlay"
      @click.self="toggleModalCrearApuntes"
    >
      <div class="modal">
        <div class="modal__header">
          <h3 class="modal__title">Crear apunte</h3>
          <button class="modal__close" @click="toggleModalCrearApuntes">
            ✕
          </button>
        </div>
        <div class="modal__body">
          <ModalApuntes :idLibro="idLibro" @close="toggleModalCrearApuntes" />
        </div>
      </div>
    </div>

    <!-- modal crear tags -->
    <div
      v-show="modalCrearTags"
      class="modal-overlay"
      @click.self="toggleModalCrearTags"
    >
      <div class="modal">
        <div class="modal__header">
          <h3 class="modal__title">Crear tag</h3>
          <button class="modal__close" @click="toggleModalCrearTags">✕</button>
        </div>
        <div class="modal__body">
          <ModalTag :idLibro="idLibro" @close="toggleModalCrearTags" />
        </div>
      </div>
    </div>

    <!-- modal seleccionar tag -->
    <div
      v-show="modalSeleccionarTag"
      class="modal-overlay"
      @click.self="toggleModalSeleccionarTag"
    >
      <div class="modal">
        <div class="modal__header">
          <h3 class="modal__title">Seleccionar tag</h3>
          <button class="modal__close" @click="toggleModalSeleccionarTag">
            ✕
          </button>
        </div>
        <div class="modal__body">
          <ModalSelectTag
            :idLibro="idLibro"
            @close="toggleModalSeleccionarTag"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.md-page {
  background-color: var(--md-sys-color-background);
  min-height: 100vh;
  padding: 18px;
  font-family: "Roboto", sans-serif;
  color: var(--md-sys-color-on-surface);
  width: 100%;
}

.page-header {
  margin-bottom: 16px;
}

.page-header__title {
  font-size: var(--md-sys-typescale-display-small-size);
  font-weight: 400;
  color: var(--md-sys-color-on-surface);
  margin: 0;
}

/* CARD */
.md-card {
  background-color: var(--md-sys-color-surface);
  border-radius: var(--md-sys-shape-corner-extra-small);
  box-shadow: var(--md-sys-elevation-level1);
  border-left: 4px solid var(--md-sys-color-primary);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow: hidden;
  max-width: 800px;
}

.md-card__content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.md-card__title {
  font-size: 40px;
  font-weight: 500;
  margin: 0;
  color: var(--md-sys-color-on-surface);
}
.md-card__autor {
  font-size: var(--md-sys-typescale-title-large-size);
  color: var(--md-sys-color-primary);
  margin: 0;
}
.md-card__categoria {
  font-size: var(--md-sys-typescale-body-large-size);
  color: var(--md-sys-color-on-surface-variant);
  margin: 0;
}

.md-card__descripcion {
  font-size: var(--md-sys-typescale-body-large-size);
  color: var(--md-sys-color-on-surface);
  margin: 0;
  line-height: 1.6;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.md-card__actions {
  display: flex;
  gap: 8px;
  padding-top: 8px;
  border-top: 1px solid var(--md-sys-color-outline);
}

/* TAGS */
.tags-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 1000px;
  margin-top: 24px;
}

.tags-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-left: 4px solid var(--md-sys-color-primary);
  padding: 12px;
  border-bottom: 1px solid var(--md-sys-color-outline);
}

.tags-header__title {
  font-size: var(--md-sys-typescale-title-large-size);
  font-weight: 500;
  color: var(--md-sys-color-on-surface);
  margin: 0;
}

.tags-empty {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background-color: var(--md-sys-color-surface);
  border-radius: var(--md-sys-shape-corner-extra-small);
  box-shadow: var(--md-sys-elevation-level1);
  color: var(--md-sys-color-on-surface-variant);
}

.tags-empty__icon {
  font-size: 20px;
  flex-shrink: 0;
}
.tags-empty__text {
  font-size: var(--md-sys-typescale-body-medium-size);
  margin: 0;
  line-height: 1.5;
}

.tags-active {
  min-height: 48px;
  display: flex;
  align-items: center;
}

.tags-active__hint {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--md-sys-color-on-surface-variant);
}

.tags-active__hint-icon {
  font-size: 16px;
}

.tags-active__hint-text {
  font-size: var(--md-sys-typescale-body-medium-size);
  margin: 0;
}

.tags-active__chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  padding: 0 8px 0 12px;
  background-color: var(--md-sys-color-primary-container);
  border-radius: var(--md-sys-shape-corner-small);
}

.tags-active__chip-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--md-sys-color-primary);
  flex-shrink: 0;
}

.tags-active__chip-nombre {
  font-size: var(--md-sys-typescale-label-large-size);
  font-weight: 500;
  color: var(--md-sys-color-on-primary-container);
}

.tags-active__chip-clear {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  border-radius: 50%;
  font-size: 11px;
  color: var(--md-sys-color-on-primary-container);
  cursor: pointer;
  transition: background 150ms;
  flex-shrink: 0;
}

.tags-active__chip-clear:hover {
  background: rgba(0, 0, 0, 0.1);
}

/* APUNTES */
.notes-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 1000px;
  margin-top: 32px;
}

.notes-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-left: 4px solid var(--md-sys-color-primary);
  padding: 12px;
  border-bottom: 1px solid var(--md-sys-color-outline);
}

.notes-header__title {
  font-size: var(--md-sys-typescale-title-large-size);
  font-weight: 500;
  color: var(--md-sys-color-on-surface);
  margin: 0;
}

.notes-empty {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background-color: var(--md-sys-color-surface);
  border-radius: var(--md-sys-shape-corner-extra-small);
  box-shadow: var(--md-sys-elevation-level1);
  color: var(--md-sys-color-on-surface-variant);
}

.notes-empty__icon {
  font-size: 20px;
  flex-shrink: 0;
}
.notes-empty__text {
  font-size: var(--md-sys-typescale-body-medium-size);
  margin: 0;
}

.notes-list {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  max-height: 350px;
}

.notes-list::-webkit-scrollbar {
  width: 8px;
}
.notes-list::-webkit-scrollbar-track {
  background: transparent;
}
.notes-list::-webkit-scrollbar-thumb {
  background-color: var(--md-sys-color-outline);
  border-radius: 8px;
}
.notes-list::-webkit-scrollbar-thumb:hover {
  background-color: var(--md-sys-color-primary);
}

.notes-list__cards {
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: all 0.3s ease-in-out;
}

/* BUTTONS */
.md-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 0 24px;
  border: none;
  border-radius: var(--md-sys-shape-corner-full);
  font-size: var(--md-sys-typescale-label-large-size);
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition:
    box-shadow 200ms,
    opacity 200ms;
}

.md-button::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 200ms;
}

.md-button:hover::before {
  opacity: 0.08;
}
.md-button:active::before {
  opacity: 0.12;
}

.md-button--filled {
  background-color: var(--md-sys-color-primary);
  color: var(--md-sys-color-on-primary);
}
.md-button--filled::before {
  background: var(--md-sys-color-on-primary);
}
.md-button--filled:hover {
  box-shadow: var(--md-sys-elevation-level1);
}

.md-button--disabled {
  opacity: 0.38;
  cursor: not-allowed;
  pointer-events: none;
}

/* MODAL */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.32);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal {
  background: var(--md-sys-color-surface);
  border-radius: var(--md-sys-shape-corner-medium);
  box-shadow: var(--md-sys-elevation-level1);
  width: 600px;
  max-width: calc(100vw - 48px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px 0;
}

.modal__title {
  font-size: var(--md-sys-typescale-title-large-size);
  font-weight: 500;
  color: var(--md-sys-color-on-surface);
  margin: 0;
}

.modal__close {
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  border-radius: var(--md-sys-shape-corner-full);
  font-size: 16px;
  color: var(--md-sys-color-on-surface-variant);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 150ms;
}

.modal__close:hover {
  background: rgba(0, 0, 0, 0.08);
}

.modal__body {
  padding: 20px 24px 24px;
}
</style>
