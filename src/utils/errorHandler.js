export const handleApiError = (error) => {
    console.log("error api:", error);
    if (error.status === 404) {
        return "Not found";
    }
}