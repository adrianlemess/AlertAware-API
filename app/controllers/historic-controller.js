/** historic.controller.js
 * This file have all methods to handler external requests about notifications historic
 */

//Dependencies
import historicService from '../services/historic-service';
import Historic from '../models/historic';

export const saveHistoric = (req, res) => {
    const historic = new Historic(req.body);
    historicService.saveHistoric(historic)
        .then(result => res.status(201).json(result))
        .catch(err => res.status(400).json(err.message))
}

export const getHistoric = (req, res) => {
    const historicId = req.params.historicId || "";
    historicService.getHistoric(historicId)
        .then(historic => res.status(200).json(historic))
        .catch(err => res.status(401).json(err))
}

export const getListUserHistoric = (req, res) => {
    const userId = req.params.userId || "";
    historicService.getListUserHistoric(userId)
        .then(historicList => res.status(200).json(historicList))
        .catch(err => res.status(401).json(err))
}