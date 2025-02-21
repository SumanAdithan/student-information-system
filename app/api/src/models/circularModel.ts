import mongoose from 'mongoose';

const circularSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter the name of the circular'],
    },
     year: {
        type: Number,
        required:true,
    },
    date: {
        type: Date,
        required: [true, 'Please enter the date of the circular'],
    },
    circularUrl: {
        type: String, 
        required:true
    },
});
const circularModel=mongoose.model('circular',circularSchema);

export const getAllCircular =() => circularModel.find();
export const getCircularById = (id:string) => circularModel.findById(id);
export const createCircular= (id:string,updatedItems:any) => {
    circularModel.findByIdAndUpdate(id,updatedItems,{ new: true, runValidators: true })

}
export const deleteCircular = (id:string) => circularModel.findByIdAndDelete(id) ;

export const addCircularData=(circular:any) => circularModel.insertMany(circular);
