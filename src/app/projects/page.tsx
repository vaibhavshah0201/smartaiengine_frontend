import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableThree from "@/components/Tables/TableThree";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProjectGrid from "@/components/Dashboard/Projects/ProjectGrid";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Next.js Tables | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const ProjectsPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Projects" />

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
