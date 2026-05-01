
import Project from '@/models/Project';
import connectDB from '@/lib/connectDB';
import mongoose from 'mongoose';
import { NextResponse } from "next/server";


export async function DELETE(req, { params }) {
    try {
        await connectDB();

        // In Next.js 15+ params is a Promise and must be awaited
        const { id } = await params;

        if (!mongoose.Types.ObjectId.isValid(id)) {

            return NextResponse.json({ message: 'Invalid Project ID' }, { status: 400 });
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