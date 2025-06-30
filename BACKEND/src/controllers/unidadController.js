// src/controllers/unidadController.js
import Unidad from '../models/unidad.js';
import Vocabulario from '../models/vocabulario.js'; 

// Según sea el nivel del curso muestra las unidades que corresponden a ese nivel

export const getUnidadesByNivel = async (req, res) => {
    try {
        const { nivel } = req.params;
        const unidades = await Unidad.find({ nivel: nivel });

        if (!unidades || unidades.length === 0) {
            return res.status(404).json({ message: `No se encontraron unidades para el nivel ${nivel}.` });
        }

        res.status(200).json(unidades);

    } catch (error) {
        console.error("Error al obtener las unidades:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};




// FUNCIONES PARA MINIJUEGOS
// Obtiene los detalles de una unidad específica por su ID,
export const getUnidadById = async (req, res) => {
    try {
        const unidad = await Unidad.findById(req.params.id);
        if (!unidad) {
            return res.status(404).json({ message: "Unidad no encontrada." });
        }
        res.status(200).json(unidad);
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor." });
    }
};




// Obtiene el vocabulario de una unidad específica por su ID
export const getVocabularioByUnidad = async (req, res) => {
    try {
        const vocabulario = await Vocabulario.find({ unidad: req.params.id });
        res.status(200).json(vocabulario);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el vocabulario." });
    }
};
