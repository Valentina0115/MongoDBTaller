const express = require('express');
const Series = require('../Models/serieModels');
const router = express.Router();

// Crear un proyecto
router.post('/', async (req, res) => {
    try {
      const nuevoProyecto = new Series(req.body);
      const proyectoGuardado = await nuevoProyecto.save();
      res.status(201).json(proyectoGuardado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  // Obtener todos los proyectos
  router.get('/', async (req, res) => {
    try {
      const proyectos = await Series.find();
      res.status(200).json(proyectos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  // Obtener un proyecto por ID
  router.get('/:id', async (req, res) => {
    try {
      const proyecto = await Series.findById(req.params.id);
      if (!proyecto) return res.status(404).json({ error: 'Proyecto no encontrado' });
      res.status(200).json(proyecto);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  // Actualizar un proyecto
  router.put('/:id', async (req, res) => {
    try {
      const proyectoActualizado = await Series.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
      if (!proyectoActualizado) return res.status(404).json({ error: 'Proyecto no encontrado' });
      res.status(200).json(proyectoActualizado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  // Eliminar un proyecto
  router.delete('/:id', async (req, res) => {
    try {
      const proyectoEliminado = await Series.findByIdAndDelete(req.params.id);
      if (!proyectoEliminado) return res.status(404).json({ error: 'Proyecto no encontrado' });
      res.status(200).json({ message: 'Proyecto eliminado' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  module.exports = router;


// POST /api/Netflix - Crear un nuevo proyecto.
// GET /api/Netflix - Obtener todos los Netflix.
// GET /api/Netflix/:id - Obtener un proyecto por ID.
// PUT /api/Netflix/:id - Actualizar un proyecto por ID.
// DELETE /api/Netflix/:id - Eliminar un proyecto por ID.
