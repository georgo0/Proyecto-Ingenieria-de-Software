// src/controllers/unidadController.js
import Unidad from '../models/unidad.js';

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