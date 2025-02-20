import multer from "multer";

const storage=multer.diskStorage({});

// const upload=multer({storage:storage})
const upload=multer({storage}) ;  // we can write in this way also when key and value name is same

export default upload;
