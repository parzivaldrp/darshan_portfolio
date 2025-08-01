import projectControllers from "@/app/api/controllers/projectControllers"
import connectDB from '@/lib/connectDB';


export async function POST() {
    await connectDB();
    const res = new Response();
    const response = await projectControllers(res);
    return response;
}
    