import { Request, Response, NextFunction } from 'express';
import { ApiHitsModel } from 'models/apiHit.model';

export const trackEndpointHit = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const endpoint = req.originalUrl; // full endpoint
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

        // Always load single document
        let globalHits = await ApiHitsModel.findById('globalHits');

        if (!globalHits) {
            globalHits = new ApiHitsModel({
                _id: 'globalHits',
                hits: [],
            });
        }

        // Find existing record for same endpoint & same date
        const existingHit = globalHits.hits.find((h) => h.endpoint === endpoint && h.date === today);

        if (existingHit) {
            existingHit.count += 1;
        } else {
            // Create new record for today
            globalHits.hits.push({
                endpoint,
                date: today,
                count: 1,
            });
        }

        await globalHits.save();
        next();
    } catch (err) {
        console.error('Error tracking endpoint hit:', err);
        next(); // do NOT block request if logging fails
    }
};
