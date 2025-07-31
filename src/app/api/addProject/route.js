import projectControllers from '../controllers/projectControllers';
import connectDB from '@/lib/connectDB';


export async function POST(req) {
    await connectDB();
    const res = new Response();
    const response = await projectControllers(req, res);
    return response;
}
    