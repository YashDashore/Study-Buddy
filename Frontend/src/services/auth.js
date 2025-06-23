import Api from "./api";

export const registerUser = async (formData) => {
    try {
        const response = await Api.post("/users/registration", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        console.log("auth is working fine")
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Registration failed"
    }
}

export const loginUser =  async(data)=>{
    try {
        const response = await Api.post("/users/login",data,{
            withCredentials : true,
        });
        return  response.message;
    } catch (error) {
        throw error.response?.data?.message || "Login failed"
    }
}