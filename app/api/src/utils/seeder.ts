import {students} from "@data";
import {addStudentsData, deleteStudentsData} from "@models";
import path from 'path';
import dotenv from 'dotenv';
import {connectDatabase} from '@config';


dotenv.config({path:path.join(__dirname,'..','config/config.env')});
connectDatabase();


const seedStudent = async() =>{
    try{
        await deleteStudentsData();
        console.log(" students data  deleted successfully")
        await addStudentsData(students);
        console.log('Students data added successfully');
        process.exit(0);
    }catch(err:unknown){
        if(err instanceof Error){
            console.error(` Error while running seeder ${err}`);
        }else{
            console.error(`An unknown error occured while running student seeder ${err}`);
        }
        process.exit(1)
    }
}
seedStudent();