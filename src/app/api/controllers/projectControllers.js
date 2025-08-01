import Project from '@/models/Project';
import fs from 'fs';
import path from 'path';

const projectControllers = async (req) => {
  const { name, description, gitLink, liveLink, techStack, image } = await req.json();

  try {
    const existingProject = await Project.findOne({ name });
    if (existingProject) {
      return new Response(JSON.stringify({message: 'Project already exists'}), { status: 409});

    }

        const imagePaths = [];
    for (let i = 0; i < image.length; i++){
      const base64Data = image[i].split(',')[1]; // Remove the data URL prefix
      const imageName =  `${Date.now()}_${i}.jpg`;
      const filePath = path.join('public', 'uploads', imageName);
      const fullPath = path.join(process.cwd(), filePath);
      fs.writeFileSync(fullPath, base64Data, 'base64');
      imagePaths.push(`/uploads/${imageName}`);
    }

    


    const newProject = new Project({ name, description, gitLink, liveLink, techStack, image: imagePaths });






    const project = await newProject.save();

    return new Response(JSON.stringify({
      message: "Project added successfully",
      success: true,
      project
    }), { status: 201});
  
  } catch (err) {
    console.error('Error in creating project:', err.message);
    return new Response(JSON.stringify({ message: 'Error in creating project'}), { status: 500});
  }
};


export default  projectControllers ; 

