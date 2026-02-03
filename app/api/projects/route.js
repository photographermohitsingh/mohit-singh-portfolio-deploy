import dbConnect from '@/lib/db';
import Project from '@/models/Project';
import { NextResponse } from 'next/server';

// GET: Fetch projects
export async function GET(request) {
  await dbConnect();
  const url = new URL(request.url);
  const isAdmin = url.searchParams.get('admin') === 'true';

  // If Admin, show ALL. If Public, show only ACTIVE.
  const query = isAdmin ? {} : { active: true };
  
  const projects = await Project.find(query).sort({ createdAt: -1 });
  return NextResponse.json({ success: true, data: projects });
}

// POST: Create New
export async function POST(request) {
  await dbConnect();
  const body = await request.json();
  const project = await Project.create(body);
  return NextResponse.json({ success: true, data: project });
}

// PUT: Update/Edit
export async function PUT(request) {
  await dbConnect();
  const { id, ...updateData } = await request.json();
  const project = await Project.findByIdAndUpdate(id, updateData, { new: true });
  return NextResponse.json({ success: true, data: project });
}

// DELETE: Remove
export async function DELETE(request) {
  await dbConnect();
  const { id } = await request.json();
  await Project.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}