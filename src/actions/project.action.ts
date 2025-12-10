"use server"

import { syncUser } from "@/actions/user.action"
import Project from "@/models/project"
import Stage from "@/models/stage"
import Chat from "@/models/chat"
import { revalidatePath } from "next/cache"

export async function createProject(name, description = name) {

  const user = await syncUser()
  if (!user) throw new Error("User Not Logged In")

  const project = await Project.create({
    name,
    description,
    userId: user._id
  })

  if (!project) return {
    err: "Couldn't create the project"
  }

  await createStages(project._id)

  revalidatePath("/dashboard")

  return {
    success: true,
    message: "Project Created!!!"
  }

}

export async function createStages(projectId) {

  const STAGE_NAMES = [
    "ProblemScoping",
    "ProblemSolution",
    "MarketResearch",
    "Validation",
    "CompetitorResearch",
    "BeatCompetition",
    "MVPPlanner",
    "FindClients",
    "Marketing",
  ];

  for (let i = 0; i < STAGE_NAMES.length; i++) {

    const stage = await Stage.create({
      projectId,
      name: STAGE_NAMES[i],
    })

    await createChats(projectId, stage._id)

  }

}

export async function createChats(projectId, stageId) {

  const user = await syncUser()
  if (!user) throw new Error("User not logged in")

  await Chat.create({
    projectId,
    stageId,
    userId: user._id
  })

}

export async function deleteProject(projectId) {

  const deleted = await Project.deleteOne({
    _id: projectId
  })

  await Stage.deleteMany({
    projectId
  })
  
  await Chat.deleteMany({
    projectId
  })

revalidatePath("/dashboard")

if (deleted) return { success: true }

else return { success: false }

}