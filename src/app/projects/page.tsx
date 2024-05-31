"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProjectGrid from "@/components/Dashboard/Projects/ProjectGrid";
import Link from "next/link";

const ProjectsPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Projects" displayProjects={false} />

      <div className="flex flex-row gap-10">
        <Link
          href="/projects/new"
          className="inline-flex items-center justify-center rounded-md bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Add New
        </Link>
      </div>

      <div className="flex flex-col gap-10 pt-5">
        <ProjectGrid />
      </div>
    </DefaultLayout>
  );
};

export default ProjectsPage;
