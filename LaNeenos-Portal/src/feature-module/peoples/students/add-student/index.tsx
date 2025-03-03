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
  Hostel,
  PickupPoint,
  VehicleNumber,
  academicYear,
  allClass,
  allSection,
  bloodGroup,
  cast,
  gender,
  house,
  mothertongue,
  names,
  religion,
  rollno,
  roomNO,
  route,
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
  const [owner, setOwner] = useState<string[]>(["English", "Spanish"]);
  //Explanation: Declares a state variable owner (array of strings) with its setter setOwner. Initialized with ["English", "Spanish"]. Used for the "Languages Known" TagsInput.
  const [owner1, setOwner1] = useState<string[]>([]);
  //Explanation: Declares a state variable owner1 (array of strings) with its setter setOwner1. Initialized as an empty array. Used for the "Medications" TagsInput.
  const [owner2, setOwner2] = useState<string[]>([]);
  //Explanation: Declares a state variable owner2 (array of strings) with its setter setOwner2. Initialized as an empty array. Used for the "Allergies" TagsInput.
  const [defaultDate, setDefaultDate] = useState<dayjs.Dayjs | null>(null);
  const [newContents, setNewContents] = useState<number[]>([0]);
  // Explanation: Declares a state variable newContents (array of numbers) with its setter setNewContents. Initialized with [0]. Used to manage multiple "Sibling" sections dynamically (each number represents an index).

  const [student, setStudent] = useState<Student>({
    session: "",
    firstName: "",
    lastName: "",
    regNo: "",
    rollNo: "",
    gender: "",
    class: "",
    joinedOn: "",
    grade: "",
    section: "",
    status: "",
    profileImage: "",
  });
  //initialized with an empty student interface. Used to store form data for creating or updating a student.

  const addNewContent = () => {
    setNewContents([...newContents, newContents.length]);
  };
  //Explanation: Defines a function addNewContent to add a new sibling section. It updates newContents by spreading the existing array and appending the next index (e.g., [0] → [0, 1]).

  const removeContent = (index: any) => {
    setNewContents(newContents.filter((_, i) => i !== index));
  };
  //Explanation: Defines a function removeContent to remove a sibling section. It updates newContents by filtering out the section with the specified index (i.e., removing it from the array).

  const handleSubmit = async () => {
    try {
      if (!regNo) {
        const res = await axios.post(
          "http://localhost:6555/api/student/create",
          student
        );
        console.log(res);
      } else {
        const res = await axios.put(
          `http://localhost:6555/api/student/${regNo}`,
          student
        );
        console.log(res);
      }
      // console.log(student)
    } catch (error) {
      console.log(error);
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
      const student = await axios.get(
        `http://localhost:6555/api/student/${regNo}`
      );
      console.log(student.data);
      if (student.data.joinedOn) {
        const date = dayjs(student.data.joinedOn, "DD-MM-YYYY", true);
        console.log(date);
        setDefaultDate(date.isValid() ? date : null);
      }
      setStudent(student.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log(regNo);
    if (regNo) {
      fetchStudentbyId();
      setIsEdit(true);
      setOwner(["English"]);
      setOwner1(["Medecine Name"]);
      setOwner2(["Allergy", "Skin Allergy"]);
    } else {
      setIsEdit(false);
      setDefaultDate(null);
    }
  }, []);

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
                            defaultValue={
                              isEdit
                                ? academicYear.find(
                                    (year) => year.value === student.session
                                  )
                                : undefined
                            }
                            onChange={(option) => {
                              setStudent((prev) => ({
                                ...prev,
                                session: option ? option.value : "",
                              }));
                            }}
                          />
                        </div>
                      </div>
                      {/*LINE-215-237
                       Explanation: Renders a dropdown for "Academic Year":
Grid: Uses a responsive grid (row-cols-*) to layout form fields.
CommonSelect: A custom dropdown component:
options: The academicYear array from selectoption.
defaultValue: In edit mode, finds the option matching student.session (e.g., { value: "2023-2024", label: "2023-2024" }).
onChange: Updates the session field in the student state with the selected option’s value (or "" if no option).
(Similar logic applies to other fields like "Admission Number", "Roll Number", etc */}
                      <div className="col-xxl col-xl-3 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Admission Number</label>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue={isEdit ? student.regNo : undefined}
                            onChange={(e) => {
                              setStudent((prev) => ({
                                ...prev,
                                regNo: e.target ? e.target.value : "",
                              }));
                            }}
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
                                placeholder="Select Date"
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
Edit Mode: Displays the date from defaultDate (set in fetchStudentbyId), but no onChange handler (so it’s read-only here).
Add Mode: Allows date selection, updating student.joinedOn with the formatted date (DD-MM-YYYY).
Format: Uses DD-MM-YYYY with a mask for consistent input.
Icon: Adds a calendar icon as an input addon. */}
                      <div className="col-xxl col-xl-3 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Roll Number</label>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue={isEdit ? student.rollNo : undefined}
                            onChange={(e) => {
                              setStudent((prev) => ({
                                ...prev,
                                rollNo: e.target ? e.target.value : "",
                              }));
                            }}
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
                            defaultValue={
                              isEdit ? student.firstName : undefined
                            }
                            onChange={(e) => {
                              setStudent((prev) => ({
                                ...prev,
                                firstName: e.target ? e.target.value : "",
                              }));
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-xxl col-xl-3 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Last Name</label>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue={isEdit ? student.lastName : undefined}
                            onChange={(e) => {
                              setStudent((prev) => ({
                                ...prev,
                                lastName: e.target ? e.target.value : "",
                              }));
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-xxl col-xl-3 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Class</label>
                          <CommonSelect
                            className="select"
                            options={allClass}
                            defaultValue={
                              isEdit
                                ? allClass.find(
                                    (classes) => classes.value === student.class
                                  )
                                : undefined
                            }
                            onChange={(option) => {
                              setStudent((prev) => ({
                                ...prev,
                                class: option ? option.value : "",
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
                                gender: option ? option.value : "",
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
                      <div className="col-xxl col-xl-3 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">House</label>
                          <CommonSelect
                            className="select"
                            options={house}
                            defaultValue={isEdit ? house[0] : undefined}
                          />
                        </div>
                      </div>
                      <div className="col-xxl col-xl-3 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Religion</label>
                          <CommonSelect
                            className="select"
                            options={religion}
                            defaultValue={isEdit ? religion[0] : undefined}
                          />
                        </div>
                      </div>
                      <div className="col-xxl col-xl-3 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Category</label>
                          <CommonSelect
                            className="select"
                            options={cast}
                            defaultValue={isEdit ? cast[0] : undefined}
                          />
                        </div>
                      </div>
                      <div className="col-xxl col-xl-3 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            Primary Contact Number
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue={isEdit ? "+1 46548 84498" : undefined}
                          />
                        </div>
                      </div>
                      <div className="col-xxl col-xl-3 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Email Address</label>
                          <input
                            type="email"
                            className="form-control"
                            defaultValue={
                              isEdit ? "jan@example.com" : undefined
                            }
                          />
                        </div>
                      </div>
                      <div className="col-xxl col-xl-3 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Caste</label>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue={isEdit ? "Catholic" : undefined}
                          />
                        </div>
                      </div>
                      <div className="col-xxl col-xl-3 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Mother Tongue</label>
                          <CommonSelect
                            className="select"
                            options={mothertongue}
                            defaultValue={isEdit ? mothertongue[0] : undefined}
                          />
                        </div>
                      </div>
                      {/* <div className="col-xxl col-xl-3 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Language Known</label>
                          <TagsInput
                            // className="input-tags form-control"
                            value={owner}
                            onChange={setOwner}
                          />
                        </div>
                      </div> */}
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
                      <h5 className="mb-3">Father’s Info</h5>
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
                              defaultValue={
                                isEdit ? "Jerald Vicinius" : undefined
                              }
                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue={
                                isEdit ? "jera@example.com" : undefined
                              }
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
                      <h5 className="mb-3">Mother’s Info</h5>
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
                              defaultValue={
                                isEdit ? "Roberta Webber" : undefined
                              }
                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue={
                                isEdit ? "robe@example.com" : undefined
                              }
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
                                isEdit ? "+1 46499 24357" : undefined
                              }
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
                {/* Sibilings */}
                <div className="card">
                  <div className="card-header bg-light">
                    <div className="d-flex align-items-center">
                      <span className="bg-white avatar avatar-sm me-2 text-gray-7 flex-shrink-0">
                        <i className="ti ti-users fs-16" />
                      </span>
                      <h4 className="text-dark">Sibilings</h4>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="addsibling-info">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="mb-2">
                            <label className="form-label">Sibling Info</label>
                            <div className="d-flex align-items-center flex-wrap">
                              <label className="form-label text-dark fw-normal me-2">
                                Is Sibling studying in the same school
                              </label>
                              <div className="form-check me-3 mb-2">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="sibling"
                                  id="yes"
                                  defaultChecked
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="yes"
                                >
                                  Yes
                                </label>
                              </div>
                              <div className="form-check mb-2">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="sibling"
                                  id="no"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="no"
                                >
                                  No
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        {newContents.map((_, index) => (
                          <div key={index} className="col-lg-12">
                            <div className="row">
                              <div className="col-lg-3 col-md-6">
                                <div className="mb-3">
                                  <label className="form-label">Name</label>
                                  <CommonSelect
                                    className="select"
                                    options={names}
                                    defaultValue={isEdit ? names[0] : undefined}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-3 col-md-6">
                                <div className="mb-3">
                                  <label className="form-label">Roll No</label>
                                  <CommonSelect
                                    className="select"
                                    options={rollno}
                                    defaultValue={
                                      isEdit ? rollno[0] : undefined
                                    }
                                  />
                                </div>
                              </div>
                              <div className="col-lg-3 col-md-6">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Admission No
                                  </label>
                                  <CommonSelect
                                    className="select"
                                    options={AdmissionNo}
                                    defaultValue={
                                      isEdit ? AdmissionNo[0] : undefined
                                    }
                                  />
                                </div>
                              </div>
                              <div className="col-lg-3 col-md-6">
                                <div className="mb-3">
                                  <div className="d-flex align-items-center">
                                    <div className="w-100">
                                      <label className="form-label">
                                        Class
                                      </label>
                                      <CommonSelect
                                        className="select"
                                        options={allClass}
                                        defaultValue={
                                          isEdit ? allClass[0] : undefined
                                        }
                                      />
                                    </div>
                                    {newContents.length > 1 && (
                                      <div>
                                        <label className="form-label">
                                          &nbsp;
                                        </label>
                                        <Link
                                          to="#"
                                          className="trash-icon ms-3"
                                          onClick={() => removeContent(index)}
                                        >
                                          <i className="ti ti-trash-x" />
                                        </Link>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="border-top pt-3">
                      <Link
                        to="#"
                        onClick={addNewContent}
                        className="add-sibling btn btn-primary d-inline-flex align-items-center"
                      >
                        <i className="ti ti-circle-plus me-2" />
                        Add New
                      </Link>
                    </div>
                  </div>
                </div>
                {/* /Sibilings */}
                {/* Address */}
                <div className="card">
                  <div className="card-header bg-light">
                    <div className="d-flex align-items-center">
                      <span className="bg-white avatar avatar-sm me-2 text-gray-7 flex-shrink-0">
                        <i className="ti ti-map fs-16" />
                      </span>
                      <h4 className="text-dark">Address</h4>
                    </div>
                  </div>
                  <div className="card-body pb-1">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Current Address</label>
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
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            Permanent Address
                          </label>
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
                {/* /Address */}
                {/* Transport Information */}
                <div className="card">
                  <div className="card-header bg-light d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <span className="bg-white avatar avatar-sm me-2 text-gray-7 flex-shrink-0">
                        <i className="ti ti-bus-stop fs-16" />
                      </span>
                      <h4 className="text-dark">Transport Information</h4>
                    </div>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                      />
                    </div>
                  </div>
                  <div className="card-body pb-1">
                    <div className="row">
                      <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Route</label>
                          <CommonSelect
                            className="select"
                            options={route}
                            defaultValue={isEdit ? route[0] : undefined}
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Vehicle Number</label>
                          <CommonSelect
                            className="select"
                            options={VehicleNumber}
                            defaultValue={isEdit ? VehicleNumber[0] : undefined}
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Pickup Point</label>
                          <CommonSelect
                            className="select"
                            options={PickupPoint}
                            defaultValue={isEdit ? PickupPoint[0] : undefined}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Transport Information */}
                {/* Hostel Information */}
                <div className="card">
                  <div className="card-header bg-light d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <span className="bg-white avatar avatar-sm me-2 text-gray-7 flex-shrink-0">
                        <i className="ti ti-building-fortress fs-16" />
                      </span>
                      <h4 className="text-dark">Hostel Information</h4>
                    </div>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                      />
                    </div>
                  </div>
                  <div className="card-body pb-1">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Hostel</label>
                          <CommonSelect
                            className="select"
                            options={Hostel}
                            defaultValue={isEdit ? Hostel[0] : undefined}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Room No</label>
                          <CommonSelect
                            className="select"
                            options={roomNO}
                            defaultValue={isEdit ? roomNO[0] : undefined}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Hostel Information */}
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
                {/* Previous School details */}
                <div className="card">
                  <div className="card-header bg-light">
                    <div className="d-flex align-items-center">
                      <span className="bg-white avatar avatar-sm me-2 text-gray-7 flex-shrink-0">
                        <i className="ti ti-building fs-16" />
                      </span>
                      <h4 className="text-dark">Previous School Details</h4>
                    </div>
                  </div>
                  <div className="card-body pb-1">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">School Name</label>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue={
                              isEdit ? "Oxford Matriculation, USA" : undefined
                            }
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Address</label>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue={
                              isEdit
                                ? "1852 Barnes Avenue, Cincinnati, OH 45202"
                                : undefined
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Previous School details */}
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
