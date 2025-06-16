import Api from "./api";
export const registerUser = async (formData) => {
    try {
        const response = await Api.post("/users/registration", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Registration failed"
    }
}