import { svgFiles } from "@/components/SVG/Svg";
import { formatDate } from "@/helpers/utils";
import { projectService } from "@/services/project.service";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const FilesGrid = () => {
  const param: any = useParams();
  const [filesData, setFilesData] = useState<any>([]);
  const [filteredData, setFilteredData] = useState<any>([]);
  const [nameSearch, setNameSearch] = useState("");
  const [fileTypeSearch, setFileTypeSearch] = useState("");
  const [dateSearch, setDateSearch] = useState("");
  const [actionSearch, setActionSearch] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleNameSearchChange = (event: any) => {
    setNameSearch(event.target.value);
  };

  const handleDateSearchChange = (event: any) => {
    setDateSearch(event.target.value);
  };

  const handleFileTypeChange = (event: any) => {
    setFileTypeSearch(event.target.value);
  };

  const handleActionSearchChange = (event: any) => {
    setActionSearch(event.target.value);
  };

  const searchData = filesData.filter((projectItem: any) => {
    const nameMatch = projectItem.name
      .toLowerCase()
      .includes(nameSearch.toLowerCase());
    const dateMatch = formatDate(projectItem.created_date)
      .toLowerCase()
      .includes(dateSearch.toLowerCase());
    const fileTypeMatch = projectItem.type
      .toLowerCase()
      .includes(fileTypeSearch.toLowerCase());
    const actionMatch =
      actionSearch === "" || actionSearch.toLowerCase() === ""; // Customize this filter as needed

    return nameMatch && dateMatch && actionMatch && fileTypeMatch;
  });

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
            onClick={previousPageChange}
            className="flex cursor-pointer items-center justify-center rounded-md p-1 px-2 hover:bg-primary hover:text-white"
          >
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.1777 16.1156C12.009 16.1156 11.8402 16.0593 11.7277 15.9187L5.37148 9.44995C5.11836 9.19683 5.11836 8.80308 5.37148 8.54995L11.7277 2.0812C11.9809 1.82808 12.3746 1.82808 12.6277 2.0812C12.8809 2.33433 12.8809 2.72808 12.6277 2.9812L6.72148 8.99995L12.6559 15.0187C12.909 15.2718 12.909 15.6656 12.6559 15.9187C12.4871 16.0312 12.3465 16.1156 12.1777 16.1156Z"
                fill=""
              ></path>
            </svg>
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
            onClick={nextPageChange}
            className="flex cursor-pointer items-center justify-center rounded-md p-1 px-2 hover:bg-primary hover:text-white"
          >
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.82148 16.1156C5.65273 16.1156 5.51211 16.0593 5.37148 15.9468C5.11836 15.6937 5.11836 15.3 5.37148 15.0468L11.2777 8.99995L5.37148 2.9812C5.11836 2.72808 5.11836 2.33433 5.37148 2.0812C5.62461 1.82808 6.01836 1.82808 6.27148 2.0812L12.6277 8.54995C12.8809 8.80308 12.8809 9.19683 12.6277 9.44995L6.27148 15.9187C6.15898 16.0312 5.99023 16.1156 5.82148 16.1156Z"
                fill=""
              ></path>
            </svg>
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
  }, [nameSearch, dateSearch, actionSearch, fileTypeSearch]);

  useEffect(() => {
    projectService.getFilesByProject(param.id).then((result) => {
      if (result.count > 0) {
        setFilesData(result.result);
        setFilteredData(result.result);
      }
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
                  <span> File Name</span>
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
                className={getClassNamesFor("type")}
              >
                <div className="flex items-center">
                  <span> File Type</span>
                  <div
                    className="ml-2 inline-flex flex-col space-y-[2px]"
                    onClick={() => sortData("type")}
                  >
                    {svgFiles.sorting}
                  </div>
                </div>
                <div className="mt-2.5 w-full  ">
                  <input
                    type="text"
                    className="w-full rounded-md border border-stroke px-3 py-1 outline-none focus:border-primary "
                    value={fileTypeSearch}
                    onChange={handleFileTypeChange}
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
                    onClick={() => sortData("date")}
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
                    type="text"
                    className="w-full rounded-md border border-stroke px-3 py-1 outline-none focus:border-primary "
                    value={actionSearch}
                    onChange={handleActionSearchChange}
                    disabled={true}
                  />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData &&
              currentData.map((fileItem: any, key: number) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {fileItem.name}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {fileItem.type}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {formatDate(fileItem.created_date)}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <Link href={"/projects/manage"}>
                        <button className="hover:text-primary">
                          {svgFiles.view}
                        </button>
                      </Link>
                      <button className="hover:text-primary">
                        {svgFiles.download}
                      </button>
                      <Link
                        href={`/projects/manage/${param.id}/files/edit?file_id=${fileItem.id}`}
                      >
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

export default FilesGrid;
