"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import RulesGrid from "@/components/Dashboard/Projects/Rules/Grid";
import FilesGrid from "@/components/Dashboard/Projects/Files/Grid";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { projectService } from "@/services/project.service";

const ProjectsPage = () => {
  const param: any = useParams();
  const [projectDetails, setProjectDetails] = useState<any>(null);

  useEffect(() => {
    projectService.getProjectDetails(param.id).then((result) => {
      setProjectDetails(result.result);
    });
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb
        pageName={projectDetails ? projectDetails.name : "Manage"}
        displayProjects={true}
      />

      <div className="flex flex-row gap-10">
        <Link
          href={`/projects/manage/${param.id}/rules/new/`}
          className="inline-flex items-center justify-center rounded-md bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Add Rules
        </Link>
      </div>

      <div className="flex flex-col gap-10 pt-5">
        <RulesGrid />
      </div>

      <div className="flex flex-row gap-10 pt-5">
        <Link
          href={`/projects/manage/${param.id}/files/new`}
          className="inline-flex items-center justify-center rounded-md bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Add Files
        </Link>
      </div>

      <div className="flex flex-col gap-10 pt-5">
        <FilesGrid />
      </div>
    </DefaultLayout>
  );
};

export default ProjectsPage;
