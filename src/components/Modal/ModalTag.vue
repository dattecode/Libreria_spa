<script setup>
import { useTagStore } from "@/stores/tagStore";
import { useLibroStore } from "@/stores/libroStore";
import { v4 as uuidv4 } from "uuid";
import FormInput from "../FormInput.vue";
import { ref } from "vue";

const props = defineProps({
  idLibro: String,
});

const emit = defineEmits(["close"]);

const refTag = ref({
  id: null,
  idLibro: props.idLibro,
  titulo: "",
});

const tagStore = useTagStore();

const crearTagForm = () => {
  if (!refTag.value.titulo.trim()) {
    alert("El tag necesita un título");
    return;
  }

  refTag.value.id = uuidv4();
  tagStore.agregarTag({ ...refTag.value});

  refTag.value.titulo = "";
  refTag.value.id = null;

  emit("close");
};
</script>

<template>
  <div class="modal-tag">
    <div class="modal-tag__fields">
      <FormInput nombre="Titulo" v-model="refTag.titulo" tipo="text" />
    </div>

    <div class="modal-tag__footer">
      <button class="modal-tag__btn" @click="crearTagForm">Guardar</button>
    </div>
  </div>
</template>

<style scoped>
.modal-tag {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.modal-tag__fields {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 20px;
}

.modal-tag__footer {
  display: flex;
  justify-content: flex-end;
  padding-top: 12px;
  border-top: 1px solid var(--md-sys-color-outline);
}

.modal-tag__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 0 24px;
  background-color: var(--md-sys-color-primary);
  color: var(--md-sys-color-on-primary);
  border-radius: var(--md-sys-shape-corner-full);
  border: none;
  font-size: var(--md-sys-typescale-label-large-size);
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: box-shadow 200ms;
}

.modal-tag__btn::before {
  content: "";
  position: absolute;
  inset: 0;
  background: var(--md-sys-color-on-primary);
  opacity: 0;
  transition: opacity 200ms;
}

.modal-tag__btn:hover::before {
  opacity: 0.08;
}
.modal-tag__btn:active::before {
  opacity: 0.12;
}
</style>
