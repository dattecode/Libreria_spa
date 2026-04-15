<script setup>
import { computed } from "vue";
import { useTagStore } from "@/stores/tagStore";

const props = defineProps({
  idLibro: String,
});

const emit = defineEmits(["close"]);

const tagsStore = useTagStore();

const tags = computed(() => tagsStore.getTagByLibroId(props.idLibro) || []);
const tagActivo = computed(() => tagsStore.tagActivo);

const seleccionar = (tag) => {
  tagsStore.cambiarTagActivo(tag);
  emit("close");
};

</script>

<template>
  <div class="modal-select-tag">
    <div v-if="tags.length === 0" class="modal-select-tag__empty">
      <span>🏷️</span>
      <p>No hay tags creados para este libro.</p>
    </div>

    <div v-else class="modal-select-tag__list">
      <button
        v-for="tag in tags"
        :key="tag.id"
        class="modal-select-tag__item"
        :class="{ 'modal-select-tag__item--active': tagActivo?.id === tag.id }"
        @click="seleccionar(tag)"
      >
        <span class="modal-select-tag__check">✓</span>
        <p class="modal-select-tag__title">
          {{ tag.titulo }}
        </p>
      </button>
    </div>
  </div>
</template>

<style scoped>
.modal-select-tag {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.modal-select-tag__empty {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 0;
  color: var(--md-sys-color-on-surface-variant);
  font-size: var(--md-sys-typescale-body-medium-size);
}

.modal-select-tag__empty p {
  margin: 0;
}

.modal-select-tag__list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.modal-select-tag__item {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 48px;
  padding: 0 16px;
  border: none;
  border-radius: var(--md-sys-shape-corner-extra-small);
  background: transparent;
  font-size: var(--md-sys-typescale-body-large-size);
  font-family: inherit;
  font-weight: 400;
  color: var(--md-sys-color-on-surface);
  cursor: pointer;
  text-align: left;
  position: relative;
  overflow: hidden;
  transition: background 150ms;
}

.modal-select-tag__item::before {
  content: "";
  position: absolute;
  inset: 0;
  background: var(--md-sys-color-primary);
  opacity: 0;
  transition: opacity 150ms;
}

.modal-select-tag__item:hover::before {
  opacity: 0.08;
}
.modal-select-tag__item:active::before {
  opacity: 0.12;
}

.modal-select-tag__item--active {
  background-color: var(--md-sys-color-primary-container);
  color: var(--md-sys-color-on-primary-container);
  font-weight: 500;
}

.modal-select-tag__check {
  font-size: 16px;
  color: var(--md-sys-color-primary);
  opacity: 0;
  flex-shrink: 0;
  width: 20px;
}

.modal-select-tag__item--active .modal-select-tag__check {
  opacity: 1;
}
</style>
