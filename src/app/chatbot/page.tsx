"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProjectGrid from "@/components/Dashboard/Projects/ProjectGrid";
import Link from "next/link";
import SelectGroupTwo from "@/components/SelectGroup/SelectGroupTwo";
import { useEffect, useState } from "react";
import { projectService } from "@/services/project.service";
import PromptArea from "@/components/Chatbot/PromptArea/PromptArea";

const ChatBotPage = () => {
  const [projectData, setProjectData] = useState<any>([]);
  useEffect(() => {
    projectService.getAllProjects().then((result) => {
      setProjectData(result.result);
    });
  }, []);
  return (
    <DefaultLayout>
      {/* <Breadcrumb pageName="Projects" displayProjects={false} /> */}

      <div className="flex flex-row gap-10">
        <SelectGroupTwo
          labelHeader="Select Project"
          optionsData={projectData}
        />
      </div>

      <PromptArea />
    </DefaultLayout>
  );
};

export default ChatBotPage;
