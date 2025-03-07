import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// Link: A component from react-router-dom for navigation (e.g., linking to the dashboard or student list).
// useParams: A hook to extract URL parameters (e.g., regNo).

// import { feeGroup, feesTypes, paymentType } from '../../../core/common/selectoption/selectoption'
import { DatePicker } from "antd";
import dayjs from "dayjs";
//Imports dayjs, a lightweight library for date manipulation, used to format and parse dates for the DatePicker.
import { all_routes } from "../../../router/all_routes";
import {
  AdmissionNo,
  academicYear,
  studentClass,
  allSection,
  bloodGroup,
  gender,
  status,
} from "../../../../core/common/selectoption/selectoption";
import { TagsInput } from "react-tag-input-component";
import CommonSelect from "../../../../core/common/commonSelect";
//Explanation: Imports a custom reusable component (CommonSelect) for rendering dropdowns. It likely wraps a library like react-select or a custom <select> element, accepting options, defaultValue, and onChange props.
import { useLocation } from "react-router-dom";
import { Student } from "../../../../core/data/interface";
// Explanation: Imports a TypeScript interface (Student) defining the shape of a student object (e.g., { firstName: string, regNo: string, ... }). This ensures type safety in the component.

import moment from "moment";
// Imports moment, a popular date manipulation library, used to parse and format dates for the DatePicker.
import axios from "axios";

//AddStudent is a functional component that renders a form to add or edit a student. It uses hooks like useState and useEffect to manage component state and side effects. The component fetches a student by ID if the regNo parameter is present in the URL. It uses axios to make HTTP requests to the backend API for creating or updating a student. The form fields include personal information, parent/guardian details, sibling information, address, and more. The component also includes logic to add or remove sibling information dynamically.
const AddStudent = () => {
  const { regNo } = useParams();
  //Explanation: Uses the useParams hook to extract the regNo parameter from the URL (e.g., /student/123 → regNo = "123"). This determines if the form is in "edit" mode (if regNo exists) or "add" mode (if regNo is undefined).

  const routes = all_routes;

  const [isEdit, setIsEdit] = useState<boolean>(false);
  // const [owner, setOwner] = useState<string[]>(["English", "Spanish"]);
  //Explanation: Declares a state variable owner (array of strings) with its setter setOwner. Initialized with ["English", "Spanish"]. Used for the "Languages Known" TagsInput.
  const [owner1, setOwner1] = useState<string[]>([]);
  //Explanation: Declares a state variable owner1 (array of strings) with its setter setOwner1. Initialized as an empty array. Used for the "Medications" TagsInput.
  const [owner2, setOwner2] = useState<string[]>([]);
  //Explanation: Declares a state variable owner2 (array of strings) with its setter setOwner2. Initialized as an empty array. Used for the "Allergies" TagsInput.
  const [defaultDate, setDefaultDate] = useState<dayjs.Dayjs | null>(null);
  // const [newContents, setNewContents] = useState<number[]>([0]);
  // Explanation: Declares a state variable newContents (array of numbers) with its setter setNewContents. Initialized with [0]. Used to manage multiple "Sibling" sections dynamically (each number represents an index).

  const [student, setStudent] = useState<Student>({
    session: "",
    firstName: "",
    lastName: "",
    regNo: "",
    rollNo: "",
    gender: "",
    studentClass: "",
    joinedOn: "",
    grade: "",
    section: "",
    status: "",
    profileImage: "",
    //adding the parent information
    parentData: {
      fatherName: "",
      fatherPhone: "",
      fatherEmail: "",
      motherName: "",
      motherPhone: "",
      motherEmail: "",
      fatherImage: "",
      motherImage: "",
    },
  });
  //initialized with an empty student interface. Used to store form data for creating or updating a student.

  // const addNewContent = () => {
  //   setNewContents([...newContents, newContents.length]);
  // };
  // //Explanation: Defines a function addNewContent to add a new sibling section. It updates newContents by spreading the existing array and appending the next index (e.g., [0] → [0, 1]).

  // const removeContent = (index: any) => {
  //   setNewContents(newContents.filter((_, i) => i !== index));
  // };
  // //Explanation: Defines a function removeContent to remove a sibling section. It updates newContents by filtering out the section with the specified index (i.e., removing it from the array).

  const handleSubmit = async () => {
    const requiredFields = [
      "session",
      "firstName",
      "lastName",
      "regNo",
      "studentClass",
    ];
    //extra check for validation
    const missingFields = requiredFields.filter(
      (field) => !student[field as keyof Student]
    );
    if (missingFields.length > 0) {
      alert(`Missing fields: ${missingFields.join(", ")}`);
      return;
    }
    console.log("Submitting student data", student);
    try {
      if (!regNo) {
        const res = await axios.post(
          "http://localhost:6555/api/student/create",
          student
        );
        console.log(res.data);
        //navigate(routes.studentList); // Redirect after success
      } else {
        const res = await axios.put(
          `http://localhost:6555/api/student/${regNo}`,
          student
        );
        console.log(res.data);
      }
      // console.log(student)
    } catch (error: any) {
      console.log(error.response?.data?.message || "Unknown error");
    }
  };
  {
    /*Explanation: Defines an async function handleSubmit to submit the form:
  Condition: Checks if regNo is falsy (undefined or empty):
  Add Mode (!regNo): Sends a POST request to http://localhost:6555/api/student/create with the student object as the payload. This creates a new student in the backend.
  Edit Mode (regNo exists): Sends a PUT request to http://localhost:6555/api/student/${regNo} with the student object to update an existing student.
  Axios: Uses axios to make HTTP requests. The response is logged to the console (res).
  Error Handling: Catches and logs any errors (e.g., network issues, server errors).*/
  }

  const fetchStudentbyId = async () => {
    try {
      const response = await axios.get(
        `http://localhost:6555/api/student/${regNo}`
      );
      const student = response.data;
      console.log(student);
      setStudent({
        session: student.session,
        firstName: student.firstName,
        lastName: student.lastName,
        regNo: student.regNo,
        rollNo: student.rollNo,
        gender: student.gender,
        studentClass: student.studentClass,
        joinedOn: student.joinedOn,
        grade: student.grade,
        section: student.section,
        status: student.status,
        profileImage: student.profile,
        parentData: {
          fatherName: student.parentData?.fatherName,
          fatherPhone: student.parentData?.fatherPhone,
          fatherEmail: student.parentData?.fatherEmail,
          motherName: student.parentData?.motherName,
          motherPhone: student.parentData?.motherPhone,
          motherEmail: student.parentData?.motherEmail,
          fatherImage: student.parentData?.fatherImage,
          motherImage: student.parentData?.motherImage,
        },
      });
      if (student.joinedOn) {
        const date = dayjs(student.joinedOn, "DD-MM-YYYY", true);
        setDefaultDate(date.isValid() ? date : null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (regNo) {
      setIsEdit(true);
      fetchStudentbyId();
    } else {
      setIsEdit(false);
    }
  }, [regNo]);

  //handling input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.startsWith("parentData.")) {
      //checking if the input field is in the parentData object
      const field = name.split(".")[1]; //splitting the name of the input field
      setStudent((prev) => ({
        ...prev,
        parentData: { ...prev.parentData, [field]: value }, //updating the parentData object with the new value
      }));
    } else {
      setStudent((prev) => ({ ...prev, [name]: value })); //updating the student object with the new value
    }
  };
  //we deal with parent object seperately
  //above because the parent object is nested in the student object
  //and we need to update the parent object without affecting the other fields

  return (
    <>
      {/* Page Wrapper */}
      <div className="page-wrapper">
        <div className="content content-two">
          {/* Page Header */}
          <div className="d-md-flex d-block align-items-center justify-content-between mb-3">
            <div className="my-auto mb-2">
              <h3 className="mb-1">{isEdit ? "Edit" : "Add"} Student</h3>
              <nav>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to={routes.adminDashboard}>Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to={routes.studentList}>Students</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {isEdit ? "Edit" : "Add"} Student
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          {/* /Page Header */}
          <div className="row">
            <div className="col-md-12">
              <form>
                {/* Personal Information */}
                <div className="card">
                  <div className="card-header bg-light">
                    <div className="d-flex align-items-center">
                      <span className="bg-white avatar avatar-sm me-2 text-gray-7 flex-shrink-0">
                        <i className="ti ti-info-square-rounded fs-16" />
                      </span>
                      <h4 className="text-dark">Personal Information</h4>
                    </div>
                  </div>
                  <div className="card-body pb-1">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="d-flex align-items-center flex-wrap row-gap-3 mb-3">
                          <div className="d-flex align-items-center justify-content-center avatar avatar-xxl border border-dashed me-2 flex-shrink-0 text-dark frames">
                            <i className="ti ti-photo-plus fs-16" />
                          </div>
                          <div className="profile-upload">
                            <div className="profile-uploader d-flex align-items-center">
                              <div className="drag-upload-btn mb-3">
                                Upload
                                <input
                                  type="file"
                                  className="form-control image-sign"
                                  multiple
                                />
                              </div>
                              <Link to="#" className="btn btn-primary mb-3">
                                Remove
                              </Link>
                            </div>
                            <p className="fs-12">
                              Upload image size 4MB, Format JPG, PNG, SVG
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* LINE 169-210:  Explanation: Renders a profile image upload section:
Icon: Displays a placeholder icon for the image.
Upload Button: A styled button with a hidden <input type="file"> for uploading images. The multiple attribute allows multiple files (though not handled here).
Remove Link: A dummy link (to="#") for removing the image (not functional yet).
Text: Informs users of file size and format restrictions. */}
                    <div className="row row-cols-xxl-5 row-cols-md-6">
                      <div className="col-xxl col-xl-3 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Academic Year</label>
                          <CommonSelect
                            className="select"
                            options={academicYear}
                            defaultValue={academicYear.find(
                              (year) => year.value === student.session
                            )}
                            onChange={(options) =>
                              setStudent((prev) => ({
                                ...prev,
                                session: options ? options.value : "",
                              }))
                            }
                          />
                        </div>
                      </div>
                      {/*LINE-215-237
                       Explanation: Renders a dropdown for "Academic Year":
Grid: Uses a responsive grid (row-cols-*) to layout form fields.
CommonSelect: A custom dropdown component:
options: The academicYear array from selectoption.
defaultValue: In edit mode, finds the option matching student.session (e.g., { value: "2023-2024", label: "2023-2024" }).
onChange: Updates the session field in the student state with the selected option's value (or "" if no option).
(Similar logic applies to other fields like "Admission Number", "Roll Number", etc */}
                      <div className="col-xxl col-xl-3 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Admission Number</label>
                          <input
                            type="text"
                            name="regNo"
                            className="form-control"
                            // defaultValue={isEdit ? student.regNo : undefined}
                            value={student.regNo}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-xxl col-xl-3 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Admission Date</label>
                          <div className="input-icon position-relative">
                            {isEdit ? (
                              <DatePicker
                                className="form-control datetimepicker"
                                format={{
                                  format: "DD-MM-YYYY",
                                  type: "mask",
                                }}
                                value={defaultDate}
                                // placeholder="Select Date"
                                onChange={(date) =>
                                  setStudent((prev) => ({
                                    ...prev,
                                    joinedOn: date
                                      ? date.format("DD-MM-YYYY")
                                      : "",
                                  }))
                                }
                              />
                            ) : (
                              <DatePicker
                                className="form-control datetimepicker"
                                format={{
                                  format: "DD-MM-YYYY",
                                  type: "mask",
                                }}
                                defaultValue={null}
                                placeholder="Select Date"
                                onChange={(date: moment.Moment | null) => {
                                  setStudent((prev) => ({
                                    ...prev,
                                    joinedOn: date
                                      ? date.format("DD-MM-YYYY")
                                      : "",
                                  }));
                                }}
                              />
                            )}
                            <span className="input-icon-addon">
                              <i className="ti ti-calendar" />
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Conditional Rendering:
                      Explanation: Renders a "Admission Date" field with a
                      DatePicker:
Edit Mode: Displays the date from defaultDate (set in fetchStudentbyId), but no onChange handler (so it's read-only here).
Add Mode: Allows date selection, updating student.joinedOn with the formatted date (DD-MM-YYYY).
Format: Uses DD-MM-YYYY with a mask for consistent input.
Icon: Adds a calendar icon as an input addon. */}
                      <div className="col-xxl col-xl-3 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Roll Number</label>
                          <input
                            type="text"
                            className="form-control"
                            name="rollNo"
                            value={student.rollNo}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-xxl col-xl-3 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Status</label>
                          <CommonSelect
                            className="select"
                            options={status}
                            defaultValue={
                              isEdit
                                ? status.find(
                                    (item) => item.value === student.status
                                  )
                                : undefined
                            }
                            onChange={(option) => {
                              setStudent((prev) => ({
                                ...prev,
                                status: option ? option.value : "",
                              }));
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-xxl col-xl-3 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">First Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="firstName"
                            value={student.firstName}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-xxl col-xl-3 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Last Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="lastName"
                            value={student.lastName}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-xxl col-xl-3 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Class</label>
                          <CommonSelect
                            className="select"
                            options={studentClass}
                            name="studentClass"
                            defaultValue={
                              isEdit
                                ? studentClass.find(
                                    (classes) =>
                                      classes.value === student.studentClass
                                  )
                                : undefined
                            }
                            onChange={(option) => {
                              setStudent((prev) => ({
                                ...prev,
                                studentClass: option ? option.value : "",
                              }));
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-xxl col-xl-3 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Section</label>
                          <CommonSelect
                            className="select"
                            options={allSection}
                            defaultValue={
                              isEdit
                                ? allSection.find(
                                    (sec) => sec.value === student.section
                                  )
                                : undefined
                            }
                            onChange={(option) => {
                              setStudent((prev) => ({
                                ...prev,
                                section: option ? option.value : "",
                              }));
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-xxl col-xl-3 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Gender</label>
                          <CommonSelect
                            className="select"
                            options={gender}
                            defaultValue={
                              isEdit
                                ? gender.find(
                                    (gen) => gen.value === student.gender
                                  )
                                : undefined
                            }
                            onChange={(option) => {
                              setStudent((prev) => ({
                                ...prev,
                                gender: option
                                  ? (option.value as
                                      | ""
                                      | "male"
                                      | "female"
                                      | "other")
                                  : "",
                              }));
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-xxl col-xl-3 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Date of Birth</label>
                          <div className="input-icon position-relative">
                            {isEdit ? (
                              <DatePicker
                                className="form-control datetimepicker"
                                format={{
                                  format: "DD-MM-YYYY",
                                  type: "mask",
                                }}
                                value={defaultDate}
                                placeholder="Select Date"
                              />
                            ) : (
                              <DatePicker
                                className="form-control datetimepicker"
                                format={{
                                  format: "DD-MM-YYYY",
                                  type: "mask",
                                }}
                                defaultValue=""
                                placeholder="Select Date"
                              />
                            )}
                            <span className="input-icon-addon">
                              <i className="ti ti-calendar" />
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-xxl col-xl-3 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Blood Group</label>
                          <CommonSelect
                            className="select"
                            options={bloodGroup}
                            defaultValue={isEdit ? bloodGroup[0] : undefined}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Personal Information */}
                {/* Parents & Guardian Information */}
                <div className="card">
                  <div className="card-header bg-light">
                    <div className="d-flex align-items-center">
                      <span className="bg-white avatar avatar-sm me-2 text-gray-7 flex-shrink-0">
                        <i className="ti ti-user-shield fs-16" />
                      </span>
                      <h4 className="text-dark">
                        Parents &amp; Guardian Information
                      </h4>
                    </div>
                  </div>
                  <div className="card-body pb-0">
                    <div className="border-bottom mb-3">
                      <h5 className="mb-3">Father's Info</h5>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="d-flex align-items-center flex-wrap row-gap-3 mb-3">
                            <div className="d-flex align-items-center justify-content-center avatar avatar-xxl border border-dashed me-2 flex-shrink-0 text-dark frames">
                              <i className="ti ti-photo-plus fs-16" />
                            </div>
                            <div className="profile-upload">
                              <div className="profile-uploader d-flex align-items-center">
                                <div className="drag-upload-btn mb-3">
                                  Upload
                                  <input
                                    type="file"
                                    className="form-control image-sign"
                                    multiple
                                  />
                                </div>
                                <Link to="#" className="btn btn-primary mb-3">
                                  Remove
                                </Link>
                              </div>
                              <p className="fs-12">
                                Upload image size 4MB, Format JPG, PNG, SVG
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Father Name</label>
                            <input
                              type="text"
                              className="form-control"
                              name="parentData.fatherName"
                              value={student.parentData.fatherName}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                              type="text"
                              className="form-control"
                              name="parentData.fatherEmail"
                              value={student.parentData.fatherEmail}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Phone Number</label>
                            <input
                              type="text"
                              className="form-control"
                              name="parentData.fatherPhone"
                              value={student.parentData.fatherPhone}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Father Occupation
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue={isEdit ? "Mechanic" : undefined}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border-bottom mb-3">
                      <h5 className="mb-3">Mother's Info</h5>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="d-flex align-items-center flex-wrap row-gap-3 mb-3">
                            <div className="d-flex align-items-center justify-content-center avatar avatar-xxl border border-dashed me-2 flex-shrink-0 text-dark frames">
                              <i className="ti ti-photo-plus fs-16" />
                            </div>
                            <div className="profile-upload">
                              <div className="profile-uploader d-flex align-items-center">
                                <div className="drag-upload-btn mb-3">
                                  Upload
                                  <input
                                    type="file"
                                    className="form-control image-sign"
                                    multiple
                                  />
                                </div>
                                <Link to="#" className="btn btn-primary mb-3">
                                  Remove
                                </Link>
                              </div>
                              <p className="fs-12">
                                Upload image size 4MB, Format JPG, PNG, SVG
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Mother Name</label>
                            <input
                              type="text"
                              className="form-control"
                              name="parentData.motherName"
                              value={student.parentData.motherName}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                              type="text"
                              className="form-control"
                              name="parentData.motherEmail"
                              value={student.parentData.motherEmail}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Phone Number</label>
                            <input
                              type="text"
                              className="form-control"
                              name="parentData.motherPhone"
                              value={student.parentData.motherPhone}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Mother Occupation
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue={isEdit ? "Homemaker" : undefined}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h5 className="mb-3">Guardian Details</h5>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="mb-2">
                            <div className="d-flex align-items-center flex-wrap">
                              <label className="form-label text-dark fw-normal me-2">
                                If Guardian Is
                              </label>
                              <div className="form-check me-3 mb-2">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="guardian"
                                  id="parents"
                                  defaultChecked
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="parents"
                                >
                                  Parents
                                </label>
                              </div>
                              <div className="form-check me-3 mb-2">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="guardian"
                                  id="guardian"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="guardian"
                                >
                                  Guardian
                                </label>
                              </div>
                              <div className="form-check mb-2">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="guardian"
                                  id="other"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="other"
                                >
                                  Others
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex align-items-center flex-wrap row-gap-3 mb-3">
                            <div className="d-flex align-items-center justify-content-center avatar avatar-xxl border border-dashed me-2 flex-shrink-0 text-dark frames">
                              <i className="ti ti-photo-plus fs-16" />
                            </div>
                            <div className="profile-upload">
                              <div className="profile-uploader d-flex align-items-center">
                                <div className="drag-upload-btn mb-3">
                                  Upload
                                  <input
                                    type="file"
                                    className="form-control image-sign"
                                    multiple
                                  />
                                </div>
                                <Link to="#" className="btn btn-primary mb-3">
                                  Remove
                                </Link>
                              </div>
                              <p className="fs-12">
                                Upload image size 4MB, Format JPG, PNG, SVG
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Guardian Name</label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue={
                                isEdit ? "Jerald Vicinius" : undefined
                              }
                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Guardian Relation
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue={isEdit ? "Uncle" : undefined}
                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Phone Number</label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue={
                                isEdit ? "+1 45545 46464" : undefined
                              }
                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                              type="email"
                              className="form-control"
                              defaultValue={
                                isEdit ? "jera@example.com" : undefined
                              }
                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Occupation</label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue={isEdit ? "Mechanic" : undefined}
                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Address</label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue={
                                isEdit
                                  ? "3495 Red Hawk Road, Buffalo Lake, MN 55314"
                                  : undefined
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Parents & Guardian Information */}

                {/* Documents */}
                <div className="card">
                  <div className="card-header bg-light">
                    <div className="d-flex align-items-center">
                      <span className="bg-white avatar avatar-sm me-2 text-gray-7 flex-shrink-0">
                        <i className="ti ti-file fs-16" />
                      </span>
                      <h4 className="text-dark">Documents</h4>
                    </div>
                  </div>
                  <div className="card-body pb-1">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="mb-2">
                          <div className="mb-3">
                            <label className="form-label mb-1">
                              Medical Condition
                            </label>
                            <p>Upload image size of 4MB, Accepted Format PDF</p>
                          </div>
                          <div className="d-flex align-items-center flex-wrap">
                            <div className="btn btn-primary drag-upload-btn mb-2 me-2">
                              <i className="ti ti-file-upload me-1" />
                              Change
                              <input
                                type="file"
                                className="form-control image_sign"
                                multiple
                              />
                            </div>
                            {isEdit ? (
                              <p className="mb-2">BirthCertificate.pdf</p>
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="mb-2">
                          <div className="mb-3">
                            <label className="form-label mb-1">
                              Upload Transfer Certificate
                            </label>
                            <p>Upload image size of 4MB, Accepted Format PDF</p>
                          </div>
                          <div className="d-flex align-items-center flex-wrap">
                            <div className="btn btn-primary drag-upload-btn mb-2">
                              <i className="ti ti-file-upload me-1" />
                              Upload Document
                              <input
                                type="file"
                                className="form-control image_sign"
                                multiple
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Documents */}
                {/* Medical History */}
                <div className="card">
                  <div className="card-header bg-light">
                    <div className="d-flex align-items-center">
                      <span className="bg-white avatar avatar-sm me-2 text-gray-7 flex-shrink-0">
                        <i className="ti ti-medical-cross fs-16" />
                      </span>
                      <h4 className="text-dark">Medical History</h4>
                    </div>
                  </div>
                  <div className="card-body pb-1">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="mb-2">
                          <label className="form-label">
                            Medical Condition
                          </label>
                          <div className="d-flex align-items-center flex-wrap">
                            <label className="form-label text-dark fw-normal me-2">
                              Medical Condition of a Student
                            </label>
                            <div className="form-check me-3 mb-2">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="condition"
                                id="good"
                                defaultChecked
                              />
                              <label
                                className="form-check-label"
                                htmlFor="good"
                              >
                                Good
                              </label>
                            </div>
                            <div className="form-check me-3 mb-2">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="condition"
                                id="bad"
                              />
                              <label className="form-check-label" htmlFor="bad">
                                Bad
                              </label>
                            </div>
                            <div className="form-check mb-2">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="condition"
                                id="others"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="others"
                              >
                                Others
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Allergies</label>

                        <TagsInput
                          // className="input-tags form-control"
                          value={owner2}
                          onChange={setOwner2}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Medications</label>
                        <TagsInput
                          // className="input-tags form-control"
                          value={owner1}
                          onChange={setOwner1}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Medical History */}
                {/* Other Details */}
                <div className="card">
                  <div className="card-header bg-light">
                    <div className="d-flex align-items-center">
                      <span className="bg-white avatar avatar-sm me-2 text-gray-7 flex-shrink-0">
                        <i className="ti ti-building-bank fs-16" />
                      </span>
                      <h4 className="text-dark">Other Details</h4>
                    </div>
                  </div>
                  <div className="card-body pb-1">
                    <div className="row">
                      <div className="col-md-5">
                        <div className="mb-3">
                          <label className="form-label">Bank Name</label>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue={
                              isEdit ? "Bank of America" : undefined
                            }
                          />
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className="mb-3">
                          <label className="form-label">Branch</label>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue={isEdit ? "Cincinnati" : undefined}
                          />
                        </div>
                      </div>
                      <div className="col-md-5">
                        <div className="mb-3">
                          <label className="form-label">IFSC Number</label>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue={isEdit ? "BOA83209832" : undefined}
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">
                            Other Information
                          </label>
                          <textarea
                            className="form-control"
                            rows={3}
                            defaultValue={""}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Other Details */}
                <div className="text-end">
                  <button type="button" className="btn btn-light me-3">
                    Cancel
                  </button>
                  <Link
                    to={routes.studentList}
                    className="btn btn-primary"
                    onClick={handleSubmit}
                  >
                    {isEdit ? "Update Student" : "Add Student"}
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Page Wrapper */}
    </>
  );
};

export default AddStudent;
