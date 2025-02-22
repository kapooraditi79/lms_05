import React, { useEffect, useRef, useState } from "react";
import { classes } from "../../../core/data/json/classes";
import Table from "../../../core/common/dataTable/index";
import PredefinedDateRanges from "../../../core/common/datePicker";
import {
  activeList,
  classSection,
  classSylabus,
} from "../../../core/common/selectoption/selectoption";
import CommonSelect from "../../../core/common/commonSelect";
import { ClassesInt, TableData } from "../../../core/data/interface";
import { Link } from "react-router-dom";
import TooltipOption from "../../../core/common/tooltipOption";
import { all_routes } from "../../router/all_routes";
import axios from "axios";

const Classes = () => {
  const dropdownMenuRef = useRef<HTMLDivElement | null>(null);

  const [fetclass,setFetclass]=useState<ClassesInt[]>([
    {
      regNo:"",
      className:"",
      section:"",
      status:"",
      noOfStudent:0,
      noOfSubjects:0,
      session:"",
      teacher:"",
      students:"",
    }
  ])
  const [selectedClass, setSelectedClass] = useState<ClassesInt | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  // State for form data in the edit modal
  const [formData, setFormData] = useState({
    className: "",
    section: "",
    noOfStudent: 0,
    noOfSubjects: 0,
    status: "",
  });
  const route = all_routes

  const columns = [
    {
      title: "ID",
      dataIndex: "regNo",
      render: (text: string, record: any) => (
        <Link to="#" className="link-primary">
          {record.regNo}
        </Link>
      ),
    },
    {
      title: "Class",
      dataIndex: "className",
      sorter: (a: TableData, b: TableData) => a.class.length - b.class.length,
    },
    {
      title: "Section",
      dataIndex: "section",
      sorter: (a: TableData, b: TableData) => a.section.length - b.section.length,
    },
    {
      title: "No of Student",
      dataIndex: "noOfStudent",
      sorter: (a: TableData, b: TableData) => a.noOfStudents.length - b.noOfStudents.length,
    },
    {
      title: "No of Subjects",
      dataIndex: "noOfSubjects",
      sorter: (a: TableData, b: TableData) => a.noOfSubjects - b.noOfSubjects,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text: string) => (
        <>
          {text === "Active" ? (
            <span className="badge badge-soft-success d-inline-flex align-items-center">
              <i className="ti ti-circle-filled fs-5 me-1"></i>
              {text}
            </span>
          ) : (
            <span className="badge badge-soft-danger d-inline-flex align-items-center">
              <i className="ti ti-circle-filled fs-5 me-1"></i>
              {text}
            </span>
          )}
        </>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text: string, record: any) => (
        <div className="d-flex align-items-center">
          <div className="dropdown">
            <Link
              to="#"
              className="btn btn-white btn-icon btn-sm d-flex align-items-center justify-content-center rounded-circle p-0"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="ti ti-dots-vertical fs-14" />
            </Link>
            <ul className="dropdown-menu dropdown-menu-right p-3">
              <li>
                <Link
                  className="dropdown-item rounded-1"
                  to="#"
                  onClick={() => setSelectedClass(record)}
                  data-bs-toggle="modal"
                  data-bs-target="#edit_class"
                >
                  <i className="ti ti-edit-circle me-2" />
                  Edit
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item rounded-1"
                  to="#"
                  data-bs-toggle="modal"
                  data-bs-target="#delete-modal"
                  onClick={() => {
                    setSelectedClass(record);
                    setIsDeleteModalOpen(true);}}
                >
                  <i className="ti ti-trash-x me-2" />
                  Delete
                </Link>
              </li>
            </ul>
          </div>
        </div>
      ),
    },
  ];

  const fetchData = async () => {
    try {
      const res=await axios.get('http://localhost:6555/api/class')
      const formattedData = res.data.map((item: any) => ({ ...item, key: item._id }));
      setFetclass(formattedData)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() =>{
    fetchData()
    console.log(fetclass)
  },[])
  useEffect(() => {
    if (selectedClass) {
      setFormData({
        className: selectedClass.className,
        section: selectedClass.section,
        noOfStudent: selectedClass.noOfStudent,
        noOfSubjects: selectedClass.noOfSubjects,
        status: selectedClass.status,
      });
    }
  }, [selectedClass]);
  const updateClass = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedClass) {
      try {
        const res=await axios.put(
          `http://localhost:6555/api/class/${selectedClass.key}`,
          formData
        );
        const updatedClass = { ...res.data, key: res.data._id }; // Assuming response includes _id
        setFetclass((prev) =>
          prev.map((item) =>
            item.key === selectedClass.key ? updatedClass : item
          )
        );        
        console.log("handle Submit",formData,selectedClass)
      } catch (error) {
        console.log("Error updating class:", error);
      }
    }
  };
  const deleteClass = async (e:React.FormEvent)=>{
    e.preventDefault();
    if(selectedClass){
      try {
        const res=await axios.delete(`http://localhost:6555/api/class/${selectedClass.key}`);
        setFetclass((prev) => prev.filter((item) => item.key !== selectedClass.key));
      } catch (error) {
        console.log("Error deleting class:", error);
      }
    }
  }
  const addClass = async (e:React.FormEvent)=>{
    e.preventDefault();
      try {
        console.log(formData)
        const res=await axios.post("http://localhost:6555/api/class",formData);
        const newClass = { ...res.data, key: res.data._id };
        setFetclass((prev) => [...prev, newClass]);
        await fetchData();
      } catch (error) {
        console.log("Error deleting class:", error);
    }
  }
  const handleApplyClick = () => {
    if (dropdownMenuRef.current) {
      dropdownMenuRef.current.classList.remove("show");
    }
  };

  return (
    <div>
      {/* Page Wrapper */}
      <div className="page-wrapper">
        <div className="content">
          {/* Page Header */}
          <div className="d-md-flex d-block align-items-center justify-content-between mb-3">
            <div className="my-auto mb-2">
              <h3 className="page-title mb-1">Classes List</h3>
              <nav>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to={route.adminDashboard}>Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="#">Classes </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    All Classes
                  </li>
                </ol>
              </nav>
            </div>
            <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
              <TooltipOption />
              <div className="mb-2">
                <Link
                  to="#"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#add_class"
                >
                  <i className="ti ti-square-rounded-plus-filled me-2" />
                  Add Class
                </Link>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          {/* Guardians List */}
          <div className="card">
            <div className="card-header d-flex align-items-center justify-content-between flex-wrap pb-0">
              <h4 className="mb-3">Classes List</h4>
              <div className="d-flex align-items-center flex-wrap">
                <div className="input-icon-start mb-3 me-2 position-relative">
                  <PredefinedDateRanges />
                </div>
                <div className="dropdown mb-3 me-2">
                  <Link
                    to="#"
                    className="btn btn-outline-light bg-white dropdown-toggle"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="outside"
                  >
                    <i className="ti ti-filter me-2" />
                    Filter
                  </Link>
                  <div
                    className="dropdown-menu drop-width"
                    ref={dropdownMenuRef}
                  >
                    <form>
                      <div className="d-flex align-items-center border-bottom p-3">
                        <h4>Filter</h4>
                      </div>
                      <div className="p-3 border-bottom pb-0">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="mb-3">
                              <label className="form-label">Class</label>
                              <CommonSelect
                                className="select"
                                options={classSylabus}
                                defaultValue={classSylabus[0]}
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="mb-3">
                              <label className="form-label">Section</label>
                              <CommonSelect
                                className="select"
                                options={classSection}
                                defaultValue={classSection[0]}
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="mb-3">
                              <label className="form-label">Status</label>
                              <CommonSelect
                                className="select"
                                options={activeList}
                                defaultValue={activeList[0]}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 d-flex align-items-center justify-content-end">
                        <Link to="#" className="btn btn-light me-3">
                          Reset
                        </Link>
                        <Link
                          to="#"
                          className="btn btn-primary"
                          onClick={handleApplyClick}
                        >
                          Apply
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="dropdown mb-3">
                  <Link
                    to="#"
                    className="btn btn-outline-light bg-white dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    <i className="ti ti-sort-ascending-2 me-2" />
                    Sort by A-Z
                  </Link>
                  <ul className="dropdown-menu p-3">
                    <li>
                      <Link to="#" className="dropdown-item rounded-1 active">
                        Ascending
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="dropdown-item rounded-1">
                        Descending
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="dropdown-item rounded-1">
                        Recently Viewed
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="dropdown-item rounded-1">
                        Recently Added
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card-body p-0 py-3">
              {/* Guardians List */}
              <Table columns={columns} dataSource={fetclass} Selection={true} />
              {/* /Guardians List */}
            </div>
          </div>
          {/* /Guardians List */}
        </div>
      </div>
      ;{/* /Page Wrapper */}
      <>
        {/* Add Classes */}
        <div className="modal fade" id="add_class">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Add Class</h4>
                <button
                  type="button"
                  className="btn-close custom-btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="ti ti-x" />
                </button>
              </div>
              <form onSubmit={addClass}>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="form-label">Class Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Class Name"
                          value={formData.className}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              className: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Section</label>
                        <CommonSelect
                          className="select"
                          options={classSection}
                          defaultValue={classSection[0]}
                          onChange={(option)=>{
                            setFormData((prev)=>({
                              ...prev,
                              section:option?option.value: "A"
                            }))
                          }}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">No of Students</label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Enter no of Students"
                          value={formData.noOfStudent}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              noOfStudent: parseInt(e.target.value) || 0,
                            })
                          }
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">No of Subjects</label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Enter no of Subjects"
                          value={formData.noOfSubjects}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              noOfSubjects: parseInt(e.target.value) || 0,
                            })
                          }
                        />
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="status-title">
                          <h5>Status</h5>
                          <p>Change the Status by toggle </p>
                        </div>
                        <div className="form-check form-switch">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="switch-sm2"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                status: e.target.checked
                                  ? "Active"
                                  : "Inactive",
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <Link
                    to="#"
                    className="btn btn-light me-2"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </Link>
                  <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">
                    Add Class
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* /Add Classes */}
        {/* Edit Classes */}
        <div className="modal fade" id="edit_class">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Edit Class</h4>
                <button
                  type="button"
                  className="btn-close custom-btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="ti ti-x" />
                </button>
              </div>
              <form onSubmit={updateClass}>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="form-label">Class Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Class Name"
                          value={formData.className}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              className: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Section</label>
                        <CommonSelect
                          className="select"
                          options={classSection}
                          defaultValue={classSection.find(sec=>sec.value===formData.section)}
                          onChange={(option)=>{
                            setFormData((prev)=>({
                              ...prev,
                              section:option?option.value: "A"
                            }))
                          }}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">No of Students</label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Enter no of Students"
                          value={formData.noOfStudent}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              noOfStudent: parseInt(e.target.value) || 0,
                            })
                          }
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">No of Subjects</label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Enter no of Subjects"
                          value={formData.noOfSubjects}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              noOfSubjects: parseInt(e.target.value) || 0,
                            })
                          }
                        />
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="status-title">
                          <h5>Status</h5>
                          <p>Change the Status by toggle</p>
                        </div>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="switch-sm2"
                            checked={formData.status === "Active"}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                status: e.target.checked
                                  ? "Active"
                                  : "Inactive",
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <Link
                    to="#"
                    className="btn btn-light me-2"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </Link>
                  <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* /Edit Classes */}
        {/* Delete Modal */}
        <div className="modal fade" id="delete-modal">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <form onSubmit={deleteClass}>
                <div className="modal-body text-center">
                  <span className="delete-icon">
                    <i className="ti ti-trash-x" />
                  </span>
                  <h4>Confirm Deletion</h4>
                  <p>
                    You want to delete all the marked items, this cant be undone
                    once you delete.
                  </p>
                  <div className="d-flex justify-content-center">
                    <Link
                      to="#"
                      className="btn btn-light me-3"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </Link>
                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">
                    Yes Delete
                  </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* /Delete Modal */}
        {/* View Classes */}
        <div className="modal fade" id="view_class">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <div className="d-flex align-items-center">
                  <h4 className="modal-title">Class Details</h4>
                  <span className="badge badge-soft-success ms-2">
                    <i className="ti ti-circle-filled me-1 fs-5" />
                    Active
                  </span>
                </div>
                <button
                  type="button"
                  className="btn-close custom-btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="ti ti-x" />
                </button>
              </div>
              <form>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="class-detail-info">
                        <p>Class Name</p>
                        <span>III</span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="class-detail-info">
                        <p>Section</p>
                        <span>A</span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="class-detail-info">
                        <p>No of Subjects</p>
                        <span>05</span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="class-detail-info">
                        <p>No of Students</p>
                        <span>25</span>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* /View Classes */}
      </>
    </div>
  );
};

export default Classes;
