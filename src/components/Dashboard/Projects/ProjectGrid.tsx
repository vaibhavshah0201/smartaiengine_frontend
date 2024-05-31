"use client";
import { svgFiles } from "@/components/SVG/Svg";
import { formatDate } from "@/helpers/utils";
import { projectService } from "@/services/project.service";
import Link from "next/link";
import { useEffect, useState } from "react";

const ProjectGrid = () => {
  const [projectData, setProjectData] = useState<any>([]);
  const [filteredData, setFilteredData] = useState<any>([]);
  const [nameSearch, setNameSearch] = useState("");
  const [dateSearch, setDateSearch] = useState("");
  const [actionSearch, setActionSearch] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const searchData = projectData.filter((projectItem: any) => {
    const nameMatch = projectItem.name
      .toLowerCase()
      .includes(nameSearch.toLowerCase());
    const dateMatch = formatDate(projectItem.created_date)
      .toLowerCase()
      .includes(dateSearch.toLowerCase());
    const actionMatch =
      actionSearch === "" || actionSearch.toLowerCase() === ""; // Customize this filter as needed

    return nameMatch && dateMatch && actionMatch;
  });

  const handleNameSearchChange = (event: any) => {
    setNameSearch(event.target.value);
  };

  const handleDateSearchChange = (event: any) => {
    setDateSearch(event.target.value);
  };

  const handleActionSearchChange = (event: any) => {
    setActionSearch(event.target.value);
  };

  const sortData = (key: string) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }

    const sortedData = [...searchData].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });

    setFilteredData(sortedData);
    setSortConfig({ key, direction });
  };

  const getClassNamesFor = (name: string) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name
      ? sortConfig.direction === "ascending"
        ? "sort-asc"
        : "sort-desc"
      : undefined;
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const nextPageChange = () => {
    setCurrentPage(currentPage < totalPages ? currentPage + 1 : currentPage);
  };

  const previousPageChange = () => {
    setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage);
  };

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex justify-between p-4 md:p-6 2xl:p-10 dark:border-strokedark">
        <div className="flex">
          <button
            onClick={() => previousPageChange()}
            className="flex cursor-pointer items-center justify-center rounded-md p-1 px-2 hover:bg-primary hover:text-white"
          >
            {svgFiles.leftPaginationArrow}
          </button>
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={`${
                currentPage === number
                  ? "bg-primary text-white mx-1 flex cursor-pointer items-center justify-center rounded-md p-1 px-3 hover:bg-primary hover:text-white page-item"
                  : "false mx-1 flex cursor-pointer items-center justify-center rounded-md p-1 px-3 hover:bg-primary hover:text-white"
              }`}
            >
              {number}
            </button>
          ))}
          <button
            onClick={() => nextPageChange()}
            className="flex cursor-pointer items-center justify-center rounded-md p-1 px-2 hover:bg-primary hover:text-white"
          >
            {svgFiles.rightPaginationArrow}
          </button>
        </div>
        <p className="font-medium">
          Showing {currentPage} 0f {totalPages} pages
        </p>
      </div>
    );
  };

  useEffect(() => {
    setFilteredData(searchData);
  }, [nameSearch, dateSearch, actionSearch]);

  useEffect(() => {
    projectService.getAllProjects().then((result) => {
      setProjectData(result.result);
      setFilteredData(result.result);
    });
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="border-separate py-4 pb-4">
            <tr className="dark:border-strokedark" role="row">
              <th
                role="columnheader"
                title="Toggle SortBy"
                className={getClassNamesFor("name")}
              >
                <div className="flex items-center">
                  <span> Name</span>
                  <div
                    className="ml-2 inline-flex flex-col space-y-[2px]"
                    onClick={() => sortData("name")}
                  >
                    {svgFiles.sorting}
                  </div>
                </div>
                <div className="mt-2.5 w-full  ">
                  <input
                    type="text"
                    className="w-full rounded-md border border-stroke px-3 py-1 outline-none focus:border-primary "
                    value={nameSearch}
                    onChange={handleNameSearchChange}
                  />
                </div>
              </th>
              <th
                role="columnheader"
                title="Toggle SortBy"
                className={getClassNamesFor("date")}
              >
                <div className="flex items-center">
                  <span> Created Date</span>
                  <div
                    className="ml-2 inline-flex flex-col space-y-[2px]"
                    onClick={() => sortData("name")}
                  >
                    {svgFiles.sorting}
                  </div>
                </div>
                <div className="mt-2.5 w-full  ">
                  <input
                    type="text"
                    className="w-full rounded-md border border-stroke px-3 py-1 outline-none focus:border-primary "
                    value={dateSearch}
                    onChange={handleDateSearchChange}
                  />
                </div>
              </th>
              <th role="columnheader" title="Toggle SortBy">
                <div className="flex items-center">
                  <span> Actions</span>
                </div>
                <div className="mt-2.5 w-full  ">
                  <input
                    disabled={true}
                    type="text"
                    className="w-full rounded-md border border-stroke px-3 py-1 outline-none focus:border-primary "
                    value={actionSearch}
                    onChange={handleActionSearchChange}
                  />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData &&
              currentData.map((projectItem: any, key: number) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {projectItem.name}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {formatDate(projectItem.created_date)}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <Link href={`/projects/manage/${projectItem.id}/rules`}>
                        <button className="hover:text-primary">
                          {svgFiles.view}
                        </button>
                      </Link>
                      <Link href={`/projects/manage/${projectItem.id}/files`}>
                        <button className="hover:text-primary">
                          {svgFiles.file}
                        </button>
                      </Link>
                      <Link href={`/projects/${projectItem.id}/edit`}>
                        <button className="hover:text-primary">
                          {svgFiles.edit}
                        </button>
                      </Link>
                      <button className="hover:text-primary">
                        {svgFiles.delete}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            <tr>
              <td colSpan={3}>{renderPagination()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectGrid;
