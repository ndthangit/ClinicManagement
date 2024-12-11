import React, {useState} from 'react';
import './AddDoctorForm.css';
import {useDispatch} from "react-redux";
import {fetchDoctorInfo, showFormAddDoctor} from "../../Features/DoctorInforSlice";
import CustomSnackbar from "./CustomSnackBar";

import {Formik} from "formik";
import * as Yup from "yup";


const AddDoctorForm = () => {
    const dispatch = useDispatch();
    const [snackbar, setSnackbar] = useState({isVisible: false, message: '', severity: 'success'});

    const handleCancel = () => {
        dispatch(showFormAddDoctor());
    };

    const handleCustomSubmit = (values) => {
        // Thực hiện xử lý logic của bạn ở đây, ví dụ:
        console.log("Submitted values:", values);

        // Ví dụ: Gửi dữ liệu lên API
        fetch("http://localhost:3005/doctor/create-doctor", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
            .then((response) => {
                console.log(response.status);
                if (response.status === 200) {
                    dispatch(fetchDoctorInfo());
                    setSnackbar({isVisible: true, message: 'Add doctor successfully', severity: 'success'});
                } else {
                    setSnackbar({isVisible: true, message: 'Add doctor failed', severity: 'error'});
                }

            })
            .catch((error) => {
                console.error("Error during submission:", error);
                setSnackbar({ isVisible: true, message: 'An error occurred', severity: 'error' });
            });

    };


    const departments = [
        {id: "D001", name: "Khoa Khám Bệnh"},
        {id: "D002", name: "Khoa Nội Tim Mạch"},
        {id: "D003", name: "Khoa Ngoại Tổng Hợp"},
        {id: "D004", name: "Khoa Nhi"},
        {id: "D005", name: "Khoa Da Liễu"},
    ];


    const types = [
        {id: "T001", name: "Bác sĩ chuyên khoa 1"},
        {id: "T002", name: "Bác sĩ chuyên khoa 2"},
        {id: "T003", name: "Tiến sĩ"},
        {id: "T004", name: "Giáo sư"},
        {id: "T005", name: "Phó Giáo sư"},
    ];


    return (
        <div className="add-doctor-form">
            <h3>Add New Doctor</h3>
            <div className="form-container">
                <Formik
                    initialValues={{
                        doctorName: "",
                        departmentId: "",
                        typeId: "",
                        phone: "",
                        email: "",
                        address: "",
                        username: "",
                        password:"",
                    }}
                    onSubmit={async (values, {resetForm}) => {
                        handleCustomSubmit(values);
                        resetForm();
                    }}
                    validationSchema={Yup.object().shape({
                        doctorName: Yup.string().required("Doctor name is required"),
                        departmentId: Yup.string().required("Please select a department"),
                        typeId: Yup.string().required("Please select a type"),
                        phone: Yup.string().matches(
                            /^[0-9]{10}$/,
                            "Phone number must be 10 digits"
                        ),
                        email: Yup.string().email("Invalid email"),
                        address: Yup.string(),
                        username: Yup.string().required("Username is required"),
                        password: Yup.string().required("Password is required"),

                    })}
                >
                    {(props) => {
                        const {
                            values,
                            touched,
                            errors,
                            dirty,
                            isSubmitting,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            handleReset,
                        } = props;

                        return (
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="doctorName">Doctor Name</label>
                                <input
                                    id="doctorName"
                                    name="doctorName"
                                    type="text"
                                    placeholder="Enter doctor name"
                                    value={values.doctorName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.doctorName && touched.doctorName ? "error" : ""}
                                />
                                {errors.doctorName && touched.doctorName && (
                                    <div className="input-feedback">{errors.doctorName}</div>
                                )}
                                <div className="inline-fields-doctor-form">
                                    <div>
                                        <label htmlFor="departmentId">Department</label>
                                        <select
                                            id="departmentId"
                                            name="departmentId"
                                            value={values.departmentId}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={
                                                errors.departmentId && touched.departmentId ? "error" : ""
                                            }
                                        >
                                            <option value="">Select a department</option>
                                            {departments.map((dept) => (
                                                <option key={dept.id} value={dept.id}>
                                                    {dept.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.departmentId && touched.departmentId && (
                                            <div className="input-feedback">{errors.departmentId}</div>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor="typeId">Type</label>
                                        <select
                                            id="typeId"
                                            name="typeId"
                                            value={values.typeId}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={errors.typeId && touched.typeId ? "error" : ""}
                                        >
                                            <option value="">Select a type</option>
                                            {types.map((type) => (
                                                <option key={type.id} value={type.id}>
                                                    {type.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.typeId && touched.typeId && (
                                            <div className="input-feedback">{errors.typeId}</div>
                                        )}
                                    </div>


                                </div>


                                <label htmlFor="phone">Phone</label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="text"
                                    placeholder="Enter phone number"
                                    value={values.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.phone && touched.phone ? "error" : ""}
                                />
                                {errors.phone && touched.phone && (
                                    <div className="input-feedback">{errors.phone}</div>
                                )}

                                <label htmlFor="email">Email</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Enter email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.email && touched.email ? "error" : ""}
                                />
                                {errors.email && touched.email && (
                                    <div className="input-feedback">{errors.email}</div>
                                )}

                                <label htmlFor="address">Address</label>
                                <input
                                    id="address"
                                    name="address"
                                    type="text"
                                    placeholder="Enter address"
                                    value={values.address}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.address && touched.address ? "error" : ""}
                                />
                                {errors.address && touched.address && (
                                    <div className="input-feedback">{errors.address}</div>
                                )}

                                <label htmlFor="username">Username</label>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    placeholder="Enter username"
                                    value={values.username}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.username && touched.username ? "error" : ""}
                                />
                                {errors.username && touched.username && (
                                    <div className="input-feedback">{errors.username}</div>
                                )}
                                <label htmlFor="password">Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Enter password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.password && touched.password ? "error" : ""}
                                />
                                {errors.password && touched.password && (
                                    <div className="input-feedback">{errors.password}</div>
                                )}


                                <button type="submit" disabled={isSubmitting}>
                                    Submit
                                </button>

                                <button
                                    type="button"
                                    className="outline"
                                    onClick={handleCancel}
                                    // disabled={!dirty || isSubmitting}
                                >
                                    Cancel
                                </button>
                            </form>
                        );
                    }}
                </Formik>
            </div>

            <CustomSnackbar
                isVisible={snackbar.isVisible}
                message={snackbar.message}
                severity={snackbar.severity}
                onClose={() => setSnackbar({ isVisible: false, message: '', severity: 'success' })}
            />

        </div>
    );
};

export default AddDoctorForm;