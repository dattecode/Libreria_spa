import { defineStore } from "pinia";

export const useTagStore = defineStore("tag", {
  state: () => ({
    tags: [],
    tagActivo: null,
  }),

  getters: {
    getTotalTags: (state) => state.tags.length,
    getTagById: (state) => (id) => state.tags.find((tag) => tag.id === id),
    getTagByLibroId: (state) => (idLibro) =>
      state.tags.filter((tag) => tag.idLibro === idLibro),
  },

  actions: {
    agregarTag(tag) {
      this.tags.push(tag);
    },

    cambiarTagActivo(tag) {
      this.tagActivo = tag;
    },

    resetTagActivo() {
      this.tagActivo = null;
    },
  },
});

const structureTag = {
  id: null,
  titulo: "",
  idLibro: null,
};
