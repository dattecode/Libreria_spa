import { defineStore } from "pinia";

export const useLibroStore = defineStore("libro", {
  state: () => ({
    libros: [],
  }),

  getters: {
    getTotalLibros: (state) => state.libros.length,

    getLibroById: (state) => (id) =>
      state.libros.find((libro) => String(libro.id) === String(id)),
  },

  actions: {

    agregarLibro(libro) {
      this.libros.push(libro);
    },

    eliminarLibro(id) {
      this.libros = this.libros.filter((libro) => libro.id !== id);
    },

    editarLibro(libro) {
      const existente = this.libros.find(l => l.id === libro.id)

      if (existente) {
        existente.nombre = libro.nombre
        existente.descripcion = libro.descripcion
        existente.autor = libro.autor
      }
    }

  }
});