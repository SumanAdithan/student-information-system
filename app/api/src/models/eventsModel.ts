import mongoose from 'mongoose'

const eventSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter name of the event"]
    },
    eventImage:{
        type:String,
        required:true
    },
    eventUrl:{
        type:String,
        required:true
    }
})
const eventsModel=mongoose.model('Events',eventSchema);

export  const getEvents = () => eventsModel.find();
export const getEventsById = (id:string) => eventsModel.findById(id);
export const createEvents = (id:string,updatedItems:any) => {
    eventsModel.findByIdAndUpdate(id,updatedItems,{ new: true, runValidators: true })
};
export const deleteEvents = (id:string) =>  eventsModel.findByIdAndDelete(id);


export const addEventsData = (event:any) => eventsModel.insertMany(event);
