import React, { useState } from "react";

import "./form.css";

const Form = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        validateField(name, value);
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        validateField(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        setErrors(formErrors);
        if (Object.keys(formErrors).length === 0) {
            console.log("Form submitted successfully:", formData);
        }
    };

    const validateForm = () => {
        let formErrors = {};
        // Validate each field
        for (const key in formData) {
            const value = formData[key];
            const fieldErrors = validateField(key, value);
            if (fieldErrors) {
                formErrors[key] = fieldErrors;
            }
        }
        return formErrors;
    };

    const validateField = (fieldName, value) => {
        let fieldErrors = null;
        switch (fieldName) {
            case "username":
                if (!value.trim()) {
                    fieldErrors = "Username is required";
                } else if (!value.trim().match(/^[A-Za-z0-9]{3,15}$/)) {
                    fieldErrors =
                        "Username should be 3-15 characters and shouldn't include any special character!";
                }
                break;
            case "email":
                if (!value.trim()) {
                    fieldErrors = "Email is required";
                } else if (
                    !value.trim().match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
                ) {
                    fieldErrors = "Invalid email address";
                }
                break;
            case "password":
                if (!value.trim()) {
                    fieldErrors = "Password is required";
                } else if (
                    !value
                        .trim()
                        .match(
                            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{\"':;?/.>,<[\]\\|=~-]).{8,20}$/
                        )
                ) {
                    fieldErrors =
                        "Password must be 8-20 characters long and contain at least 1 digit, 1 lowercase letter, 1 uppercase letter, and 1 special character!";
                }
                break;
            case "confirmPassword":
                if (!value.trim()) {
                    fieldErrors = "Confirm password!";
                } else if (value !== formData.password) {
                    fieldErrors = "Passwords do not match";
                }
                break;
            default:
                break;
        }
        setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: fieldErrors }));
        return fieldErrors;
    };

    return (
        <>
            <div className="container">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter your username"
                        />
                        {errors.username && <span>{errors.username}</span>}
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter your email"
                        />
                        {errors.email && <span>{errors.email}</span>}
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter your password"
                            autoComplete="off"
                        />
                        {errors.password && <span>{errors.password}</span>}
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            id="confirm-password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Confirm your password"
                            autoComplete="off"
                        />
                        {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    );
};

export default Form;
