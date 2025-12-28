import connectDB from "@/lib/connectDB";
import Project from "@/models/Project";
import { NextResponse } from "next/server";
import { getUpdatedFields } from "@/lib/getUpdatedFields";
import mongoose from "mongoose";


export async function PATCH(req, { params }) {
    try {
        await connectDB();

        const { ObjectId } = mongoose.Types;
 
        const { id } = params;
        if (!ObjectId.isValid(id)) {
          return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
        }
    
        const oldProject = await Project.findById(id);
        if (!oldProject) {
          return NextResponse.json({ message: "Project not found" }, { status: 404 });
        }
    
        const body = await req.json();
        const updatedFields = getUpdatedFields(oldProject.toObject(), body);
    
        if (Object.keys(updatedFields).length === 0) {
          return NextResponse.json({ message: "No changes provided" }, { status: 400 });
        }
    
        const updatedProject = await Project.findByIdAndUpdate(id, updatedFields, {
          new: true,
        });
    
        return NextResponse.json(updatedProject);
      } catch (error) {
        console.error("Update failed:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
      }

}