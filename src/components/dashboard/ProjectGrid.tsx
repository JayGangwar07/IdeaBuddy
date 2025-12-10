import ProjectCard from "./ProjectCard.tsx";
import NewProject from "./NewProject.tsx";
import Project from "@/models/project"
import { syncUser } from "@/actions/user.action"

export default async function ProjectGrid() {

  const user = await syncUser()
  
  console.log(user)

  const projects = await Project.find({
    userId: user._id
  })

  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
      {projects.map((p, idx) => (
        <ProjectCard
          key={p._id.toString()}
          id={p._id.toString()}
          title={p.name}
          description={p.description}
        />
      ))}

      {/* New Project Card */}
      <NewProject />
    </div>
  );
}
