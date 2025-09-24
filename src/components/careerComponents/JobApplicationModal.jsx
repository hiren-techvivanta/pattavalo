import React, { useState, useRef, useEffect } from "react";
import { Modal, Box } from "@mui/material";
import { IoClose, IoCloudUploadOutline } from "react-icons/io5";

const JobApplicationModal = ({ isOpen, onClose, jobTitle }) => {
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    position: jobTitle || "",
    resume: null,
  });
  const [dragActive, setDragActive] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      // Disable background scroll
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable background scroll
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Update position when jobTitle changes
  React.useEffect(() => {
    if (jobTitle) {
      setFormData((prev) => ({ ...prev, position: jobTitle }));
    }
  }, [jobTitle]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        setFormData((prev) => ({ ...prev, resume: file }));
      }
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        setFormData((prev) => ({ ...prev, resume: file }));
      }
    }
  };

  const validateFile = (file) => {
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "application/pdf",
    ];
    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        resume: "Please upload JPG, JPEG, PNG, or PDF files only",
      }));
      return false;
    }
    if (file.size > maxSize) {
      setErrors((prev) => ({
        ...prev,
        resume: "File size should be less than 5MB",
      }));
      return false;
    }
    setErrors((prev) => ({ ...prev, resume: "" }));
    return true;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.contactNumber.trim())
      newErrors.contactNumber = "Contact number is required";
    if (!formData.position.trim()) newErrors.position = "Position is required";
    if (!formData.resume) newErrors.resume = "Resume is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      setSuccess(true);
      setTimeout(() => {
        setFormData({
          name: "",
          contactNumber: "",
          position: jobTitle || "",
          resume: null,
        });
        setErrors({});
        setSuccess(false);
        onClose();
      }, 2000);
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      contactNumber: "",
      position: jobTitle || "",
      resume: null,
    });
    setErrors({});
    setSuccess(false);
    onClose();
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: "600px",
    maxHeight: "85vh", 
    bgcolor: "background.paper",
    borderRadius: "16px",
    boxShadow: 24,
    p: 0,
    outline: "none",
    display: "flex",
    flexDirection: "column",
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      disableScrollLock={false} 
      BackdropProps={{
        style: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(4px)",
        },
      }}
    >
      <Box sx={modalStyle}>
        {/* Header - Fixed */}
        <div className="flex-shrink-0 relative  p-6 pb-4">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors z-10"
          >
            <IoClose className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 pt-4">
          {/* Success Message */}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                  className={`w-full px-4 py-4 text-gray-900 bg-transparent border-2 rounded-[8px] transition-all duration-300 focus:outline-none placeholder-gray-500 ${
                    errors.name
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-300 focus:border-blue-500"
                  }`}
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm mt-2">{errors.name}</p>
              )}
            </div>

            {/* Contact Number Field */}
            <div>
              <div className="relative">
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  placeholder="Contact Number"
                  className={`w-full px-4 py-4 text-gray-900 bg-transparent border-2 rounded-[8px] transition-all duration-300 focus:outline-none placeholder-gray-500 ${
                    errors.contactNumber
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-300 focus:border-blue-500"
                  }`}
                />
              </div>
              {errors.contactNumber && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.contactNumber}
                </p>
              )}
            </div>

            {/* Position Field */}
            <div>
              <div className="relative">
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  placeholder="Position Applying For"
                  className={`w-full px-4 py-4 text-gray-900 bg-transparent border-2 rounded-[8px] transition-all duration-300 focus:outline-none placeholder-gray-500 ${
                    errors.position
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-300 focus:border-blue-500"
                  }`}
                />
              </div>
              {errors.position && (
                <p className="text-red-500 text-sm mt-2">{errors.position}</p>
              )}
            </div>

            {/* File Upload */}
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleFileSelect}
                className="hidden"
              />

              <div
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer ${
                  dragActive
                    ? "border-blue-400 bg-blue-50"
                    : errors.resume
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <IoCloudUploadOutline className="w-12 h-12 text-gray-400 mx-auto mb-4" />

                {formData.resume ? (
                  <div className="space-y-2">
                    <p className="text-green-600 font-medium">
                      ✓ {formData.resume.name}
                    </p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                      className="text-blue-500 hover:text-blue-600 underline transition-colors"
                    >
                      Change file
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      <span className="text-blue-500 hover:text-blue-600 underline">
                        Click to upload
                      </span>{" "}
                      or drag and drop
                    </p>
                    <p className="text-sm text-gray-400">
                      JPG, JPEG, PNG, PDF (Max 5MB)
                    </p>
                  </div>
                )}
              </div>

              <div className="text-center mt-2">
                <p className="text-gray-600 font-medium">Upload Resume</p>
              </div>

              {errors.resume && (
                <p className="text-red-500 text-sm text-center mt-2">
                  {errors.resume}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={success}
              className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg ${
                success
                  ? "bg-green-500 text-white cursor-not-allowed"
                  : "bg-[#2E437C] hover:bg-[#1E2F5C] text-white hover:shadow-xl"
              }`}
            >
              {success ? "Submitted!" : "Apply"}
            </button>
          </form>
        </div>
      </Box>
    </Modal>
  );
};

export default JobApplicationModal;
