// // {/* Sibilings */}
// //   {/* <div className="card">
// //     <div className="card-header bg-light">
// //       <div className="d-flex align-items-center">
// //         <span className="bg-white avatar avatar-sm me-2 text-gray-7 flex-shrink-0">
// //           <i className="ti ti-users fs-16" />
// //         </span>
// //         <h4 className="text-dark">Sibilings</h4>
// //       </div>
// //     </div>
// //     <div className="card-body">
// //       <div className="addsibling-info">
// //         <div className="row">
// //           <div className="col-md-12">
// //             <div className="mb-2">
// //               <label className="form-label">Sibling Info</label>
// //               <div className="d-flex align-items-center flex-wrap">
// //                 <label className="form-label text-dark fw-normal me-2">
// //                   Is Sibling studying in the same school
// //                 </label>
// //                 <div className="form-check me-3 mb-2">
// //                   <input
// //                     className="form-check-input"
// //                     type="radio"
// //                     name="sibling"
// //                     id="yes"
// //                     defaultChecked
// //                   />
// //                   <label className="form-check-label" htmlFor="yes">
// //                     Yes
// //                   </label>
// //                 </div>
// //                 <div className="form-check mb-2">
// //                   <input
// //                     className="form-check-input"
// //                     type="radio"
// //                     name="sibling"
// //                     id="no"
// //                   />
// //                   <label className="form-check-label" htmlFor="no">
// //                     No
// //                   </label>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //           {newContents.map((_, index) => (
// //             <div key={index} className="col-lg-12">
// //               <div className="row">
// //                 <div className="col-lg-3 col-md-6">
// //                   <div className="mb-3">
// //                     <label className="form-label">Name</label>
// //                     <CommonSelect
// //                       className="select"
// //                       options={names}
// //                       defaultValue={isEdit ? names[0] : undefined}
// //                     />
// //                   </div>
// //                 </div>
// //                 <div className="col-lg-3 col-md-6">
// //                   <div className="mb-3">
// //                     <label className="form-label">Roll No</label>
// //                     <CommonSelect
// //                       className="select"
// //                       options={rollno}
// //                       defaultValue={isEdit ? rollno[0] : undefined}
// //                     />
// //                   </div>
// //                 </div>
// //                 <div className="col-lg-3 col-md-6">
// //                   <div className="mb-3">
// //                     <label className="form-label">
// //                       Admission No
// //                     </label>
// //                     <CommonSelect
// //                       className="select"
// //                       options={AdmissionNo}
// //                       defaultValue={
// //                         isEdit ? AdmissionNo[0] : undefined
// //                       }
// //                     />
// //                   </div>
// //                 </div>
// //                 <div className="col-lg-3 col-md-6">
// //                   <div className="mb-3">
// //                     <div className="d-flex align-items-center">
// //                       <div className="w-100">
// //                         <label className="form-label">Class</label>
// //                         <CommonSelect
// //                           className="select"
// //                           options={allClass}
// //                           defaultValue={
// //                             isEdit ? allClass[0] : undefined
// //                           }
// //                         />
// //                       </div>
// //                       {newContents.length > 1 && (
// //                         <div>
// //                           <label className="form-label">
// //                             &nbsp;
// //                           </label>
// //                           <Link
// //                             to="#"
// //                             className="trash-icon ms-3"
// //                             onClick={() => removeContent(index)}
// //                           >
// //                             <i className="ti ti-trash-x" />
// //                           </Link>
// //                         </div>
// //                       )}
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   </div> */}
// //   {/* /Sibilings */}
// //   {/* Address */}
// //   {/* <div className="card"> */}
// //   <div className="card-header bg-light">
// //     <div className="d-flex align-items-center">
// //       <span className="bg-white avatar avatar-sm me-2 text-gray-7 flex-shrink-0">
// //         <i className="ti ti-map fs-16" />
// //       </span>
// //       <h4 className="text-dark">Address</h4>
// //     </div>
// //   </div>
// //   <div className="card-body pb-1">
// //     <div className="row">
// //       <div className="col-md-6">
// //         <div className="mb-3">
// //           <label className="form-label">Current Address</label>
// //           <input
// //             type="text"
// //             className="form-control"
// //             defaultValue={
// //               isEdit
// //                 ? "3495 Red Hawk Road, Buffalo Lake, MN 55314"
// //                 : undefined
// //             }
// //           />
// //         </div>
// //       </div>
// //       <div className="col-md-6">
// //         <div className="mb-3">
// //           <label className="form-label">Permanent Address</label>
// //           <input
// //             type="text"
// //             className="form-control"
// //             defaultValue={
// //               isEdit
// //                 ? "3495 Red Hawk Road, Buffalo Lake, MN 55314"
// //                 : undefined
// //             }
// //           />
// //         </div>
// //       </div>
// //     </div>
// //   </div>
// //   {/* </div> */}
// //   {/* /Address */}
// //   {/* Transport Information */}
// //   {/* <div className="card"> */}
// //   <div className="card-header bg-light d-flex align-items-center justify-content-between">
// //     <div className="d-flex align-items-center">
// //       <span className="bg-white avatar avatar-sm me-2 text-gray-7 flex-shrink-0">
// //         <i className="ti ti-bus-stop fs-16" />
// //       </span>
// //       <h4 className="text-dark">Transport Information</h4>
// //     </div>
// //     <div className="form-check form-switch">
// //       <input
// //         className="form-check-input"
// //         type="checkbox"
// //         role="switch"
// //       />
// //     </div>
// //   </div>
// //   <div className="card-body pb-1">
// //     <div className="row">
// //       <div className="col-lg-4 col-md-6">
// //         <div className="mb-3">
// //           <label className="form-label">Route</label>
// //           <CommonSelect
// //             className="select"
// //             options={route}
// //             defaultValue={isEdit ? route[0] : undefined}
// //           />
// //         </div>
// //       </div>
// //       <div className="col-lg-4 col-md-6">
// //         <div className="mb-3">
// //           <label className="form-label">Vehicle Number</label>
// //           <CommonSelect
// //             className="select"
// //             options={VehicleNumber}
// //             defaultValue={isEdit ? VehicleNumber[0] : undefined}
// //           />
// //         </div>
// //       </div>
// //       <div className="col-lg-4 col-md-6">
// //         <div className="mb-3">
// //           <label className="form-label">Pickup Point</label>
// //           <CommonSelect
// //             className="select"
// //             options={PickupPoint}
// //             defaultValue={isEdit ? PickupPoint[0] : undefined}
// //           />
// //         </div>
// //       </div>
// //     </div>
// //   </div>
// //   {/* </div> */}
// //   {/* /Transport Information */}
// //   {/* Hostel Information */}
// //   {/* <div className="card"> */}
// //   {/* <div className="card-header bg-light d-flex align-items-center justify-content-between">
// //     <div className="d-flex align-items-center">
// //       <span className="bg-white avatar avatar-sm me-2 text-gray-7 flex-shrink-0">
// //         <i className="ti ti-building-fortress fs-16" />
// //       </span>
// //       <h4 className="text-dark">Hostel Information</h4>
// //     </div>
// //     <div className="form-check form-switch">
// //       <input
// //         className="form-check-input"
// //         type="checkbox"
// //         role="switch"
// //       />
// //     </div> */}
// //   {/* </div>
// //   <div className="card-body pb-1">
// //     <div className="row">
// //       <div className="col-md-6">
// //         <div className="mb-3">
// //           <label className="form-label">Hostel</label>
// //           <CommonSelect
// //             className="select"
// //             options={Hostel}
// //             defaultValue={isEdit ? Hostel[0] : undefined}
// //           />
// //         </div>
// //       </div>
// //       <div className="col-md-6">
// //         <div className="mb-3">
// //           <label className="form-label">Room No</label>
// //           <CommonSelect
// //             className="select"
// //             options={roomNO}
// //             defaultValue={isEdit ? roomNO[0] : undefined}
// //           />
// //         </div>
// //       </div>
// //     </div>
// //   </div> */}
// //   {/* </div> */}
// //   {/* /Hostel Information */}

// PREVIOUS SCHOOL <DETAILS>
//                 {/* Previous School details
//                 <div className="card">
//                   <div className="card-header bg-light">
//                     <div className="d-flex align-items-center">
//                       <span className="bg-white avatar avatar-sm me-2 text-gray-7 flex-shrink-0">
//                         <i className="ti ti-building fs-16" />
//                       </span>
//                       <h4 className="text-dark">Previous School Details</h4>
//                     </div>
//                   </div>
//                   <div className="card-body pb-1">
//                     <div className="row">
//                       <div className="col-md-6">
//                         <div className="mb-3">
//                           <label className="form-label">School Name</label>
//                           <input
//                             type="text"
//                             className="form-control"
//                             defaultValue={
//                               isEdit ? "Oxford Matriculation, USA" : undefined
//                             }
//                           />
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <div className="mb-3">
//                           <label className="form-label">Address</label>
//                           <input
//                             type="text"
//                             className="form-control"
//                             defaultValue={
//                               isEdit
//                                 ? "1852 Barnes Avenue, Cincinnati, OH 45202"
//                                 : undefined
//                             }
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div> */}
//                 {/* /Previous School details */}</DETAILS>
