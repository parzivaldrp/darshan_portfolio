
import Project from '@/models/Project.js';
import { connectDB } from '@/lib/connectDB.js';
import mongoose from 'mongoose';
import { NextResponse } from "next/server";


export async function DELETE(req, { params }) {
    try {
        await connectDB();

        const { id } = params;

        if (!mongoose.Types.ObjectId.isValid(id)) {

            return NextResponse.json({ message: 'Invalid Projecty if' }, { status: 400 });
        }

        const deleted = await Project.findByIdAndDelete(id);

        if (!deleted) {
            return NextResponse.json({ message: 'Project not found' }, { status: 404 });

        }

        return NextResponse.json({ message: 'Project deleted successfully' }, { status: 200 });


    } catch (error) {

        console.error('error deleting project', error);
        return NextResponse.json({ message: 'server error' }, { status: 500 });

    }
}