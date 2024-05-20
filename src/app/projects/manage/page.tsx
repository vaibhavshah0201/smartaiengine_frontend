import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import RulesGrid from "@/components/Dashboard/Projects/Rules/Grid";
import FilesGrid from "@/components/Dashboard/Projects/Files/Grid";

export const metadata: Metadata = {
  title: "Next.js Tables | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const ProjectsPage = () => {
  return (
    <DefaultLayout>
      {/* <Breadcrumb pageName="Manage" /> */}

      <div className="flex flex-row gap-10">
        <Link
          href="/projects/manage/rules/new"
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
          href="/projects/manage/files/new"
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
