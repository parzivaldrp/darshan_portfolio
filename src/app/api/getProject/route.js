import connectDB from "@/lib/connectDB";
import Project from '@/models/Project';

export async function GET(req) {
    try {
        await connectDB();

        const projects = await Project.find(); // Fetch projects from the database
        return new Response(JSON.stringify( projects ), {
            status: 200, 
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {   
        console.error('Error fetching projects:', error);
        return new Response(JSON.stringify({ message: 'Internal server error' }), {
            status: 500,
            headers: {  
                'Content-Type': 'application/json',
            },
        });
    }
}