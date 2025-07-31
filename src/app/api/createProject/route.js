import { NextResponse } from 'next/server';
import connectDB from "@/lib/connectDB";
import Project from '@/models/Project';

export async function POST(request) {
  try {
    // Connect to MongoDB first
    await connectDB();
    
    const body = await request.json();
    console.log('Received project data:', body);
    
    const { name, description, gitLink, liveLink, techStack, image } = body;

    // Validate required fields (only name, description, techStack, image are required)
    if (!name || !description || !techStack || !image) {
      console.log('Validation failed - missing required fields');
      return NextResponse.json(
        { error: 'Name, description, tech stack, and image are required' },
        { status: 400 }
      );
    }

    // Validate techStack is an array
    if (!Array.isArray(techStack) || techStack.length === 0) {
      console.log('Validation failed - techStack is not a valid array');
      return NextResponse.json(
        { error: 'Tech stack must be a non-empty array' },
        { status: 400 }
      );
    }

    // Validate image is an array
    if (!Array.isArray(image) || image.length === 0) {
      console.log('Validation failed - image is not a valid array');
      return NextResponse.json(
        { error: 'Image must be a non-empty array' },
        { status: 400 }
      );
    }

    console.log('Creating project with data:', {
      name,
      description,
      gitLink: gitLink || '',
      liveLink: liveLink || '',
      techStack,
      imageCount: image.length
    });

    // Create new project (gitLink and liveLink are optional)
    const newProject = new Project({
      name,
      description,
      gitLink: gitLink || '', // Optional - can be empty string
      liveLink: liveLink || '', // Optional - can be empty string
      techStack,
      image
    });

    // Save to database
    const savedProject = await newProject.save();
    console.log('Project saved successfully:', savedProject._id);

    return NextResponse.json(
      { 
        message: 'Project created successfully',
        project: savedProject 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating project:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    return NextResponse.json(
      { error: `Failed to create project: ${error.message}` },
      { status: 500 }
    );
  }
} 