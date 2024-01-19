"use server"


import {CreateEventParams} from "@/types"
import { handleError } from "../utils"
import { connectToDatabase } from "../database"
import User from "../database/models/user.model"
import Event from "../database/models/event.model"

export const createEvent = async ({event, userId, path}: CreateEventParams) =>{
    try {
        
        await connectToDatabase();
        console.log('conecteddd')
        const organizer = await User.findById(userId);
        if(!organizer) {
            throw new Error("Organizer not found");
        }
        console.log('organizer found')
        const newEvent = await Event.create(
            {
                ...event,
                category: event.categoryId,
                organizer: userId
            }
        )

        return JSON.parse(JSON.stringify(newEvent));
    } catch (error) {
        handleError(error);
    }
}