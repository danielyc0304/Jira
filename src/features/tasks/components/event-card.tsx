import { useRouter } from "next/navigation";

import { MemberAvatar } from "@/features/members/components/member-avatar";

import { Member } from "@/features/members/types";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { Project } from "@/features/projects/types";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { cn } from "@/lib/utils";
import { TaskStatus } from "../types";

const statusColorMap: Record<TaskStatus, string> = {
  [TaskStatus.BACKLOG]: "border-l-pink-500",
  [TaskStatus.TODO]: "border-l-red-500",
  [TaskStatus.IN_PROGRESS]: "border-l-yellow-500",
  [TaskStatus.IN_REVIEW]: "border-l-blue-500",
  [TaskStatus.DONE]: "border-l-emerald-500",
};

interface EventCardProps {
  title: string;
  assignee: Member;
  project: Project;
  status: TaskStatus;
  id: string;
}

export const EventCard = ({
  title,
  assignee,
  project,
  status,
  id,
}: EventCardProps) => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    router.push(`/workspaces/${workspaceId}/tasks/${id}`);
  };

  return (
    <div className="px-2">
      <div
        onClick={onClick}
        className={cn(
          "flex cursor-pointer flex-col gap-y-1.5 rounded-md border border-l-4 bg-white p-1.5 text-xs text-primary transition hover:opacity-75",
          statusColorMap[status],
        )}
      >
        <p>{title}</p>

        <div className="flex items-center gap-x-1">
          <MemberAvatar name={assignee?.name} />

          <div className="size-1 rounded-full bg-neutral-300" />

          <ProjectAvatar name={project?.name} image={project?.imageUrl} />
        </div>
      </div>
    </div>
  );
};
