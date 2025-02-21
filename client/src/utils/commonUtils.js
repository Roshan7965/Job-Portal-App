

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
    });
};

export const getDaysDifference = (timestamp) => {
    const currentDate = new Date();
    const targetDate = new Date(Number(timestamp)); // Ensure it's a number

    // Calculate the difference in milliseconds
    const differenceInMs = targetDate - currentDate;

    // Convert milliseconds to days (1 day = 24 * 60 * 60 * 1000 ms)
    return Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));
};