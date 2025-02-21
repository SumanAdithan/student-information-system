import mongoose from 'mongoose';

const downloadNotesSchema=new mongoose.Schema({
    noteUrl: {type:String},
    code:{type:String,required:[true,"Please enter a subject code"]},
    name:{type:String,required:[true,"Please enter a subject name"]},
    regulation:{
        type:String,
        required:[true,'Please select Regulation'],
        enum:{
            values: ['2017-2021', '2021-2025'],
            message:"please select a correct regulation"
        },
    },
    semester:{type:String},
    required:[true,"Please enter a semester"]
});
const downloadNotesModel=mongoose.model('downloadNotes',downloadNotesSchema);

export const getAllDownloadNotes = () => downloadNotesModel.find();
export const createDownloadNotes = (notes:any) => downloadNotesModel.create(notes);
export const getDownloadNotesById= (id:string) => downloadNotesModel.findById(id);
export const updateDownloadNotes = (id:string,updatedItems:any) => {
    downloadNotesModel.findByIdAndUpdate(id,updatedItems,{ new: true, runValidators: true } )
}
export const deleteDownloadNotes = (id:string) => downloadNotesModel.findByIdAndDelete(id);

export const addDownloadNotesData=(notes:any)=>downloadNotesModel.insertMany(notes);
