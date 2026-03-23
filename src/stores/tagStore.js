import { defineStore } from "pinia";

export const useTagStore = defineStore("tag", {
  state: () => ({
    tags: [],
  }),

  getters: {
    getTotalTags: (state) => state.tags.length,
    getTagById: (state) => 
      (id) => state.tags.find((tag) => tag.id === id),
    getTagByLibroId: (state) =>
      (idLibro) => state.tags.find((tag) => tag.idLibro === idLibro),
  },

  actions: {
    addTag(tag) {
      this.tags.push(tag);
    },
  },
});

const structureTag = {
  id: tag.id,
  titulo: tag.titulo,
  idLibro: tag.idLibro,
  apuntesId: [],
};
