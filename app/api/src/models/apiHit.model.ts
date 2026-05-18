import mongoose, { Schema, Document } from 'mongoose';

export interface IEndpointHit {
    endpoint: string;
    date: string; // YYYY-MM-DD
    count: number;
}

export interface IGlobalHits extends Document {
    _id: string; // always "globalHits"
    hits: IEndpointHit[];
}

const EndpointHitSchema = new Schema<IEndpointHit>({
    endpoint: { type: String, required: true },
    date: { type: String, required: true },
    count: { type: Number, required: true, default: 1 },
});

const ApiHitsSchema = new Schema<IGlobalHits>({
    _id: { type: String, default: 'globalHits' }, // fixed ID
    hits: [EndpointHitSchema],
});

export const ApiHitsModel = mongoose.model<IGlobalHits>('ApiHits', ApiHitsSchema);
