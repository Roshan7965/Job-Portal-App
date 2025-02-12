import React, { useContext, useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css"; // Import Quill CSS for proper styling
import { JobLocations } from "../assets/assets";
import { JobCategories } from "../assets/assets";

const AddJob = () => {
  const JobLevel=["Beginner Level","immediate Level ","Senior Level"];
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [salary, setSalary] = useState();
  const [description, setDescription] = useState("");



  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            ["bold", "italic", "underline"], // Formatting options
            [{ list: "ordered" }, { list: "bullet" }], // Lists
            [{ header: [1, 2, 3, false] }], // Header options
            ["clean"], // Remove formatting
          ],
        },
        
      });
      quillRef.current.on("text-change", () => {
        setDescription(quillRef.current.root.innerHTML);
      });
    }
  }, []);

  const handleSubmit = (e) => {
    if (!description || quillRef.current.getLength() <= 1) {
      alert("Job Description is required.");
      return;
    }
    e.preventDefault();
    console.log({
      title,
      location,
      category,
      level,
      salary,
      description,
    });
    alert("Job posted successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className="mx-4 my-4 sm:ml-10 sm:my-10 flex flex-col gap-5">
      <div>
        <label>
          <p className="mb-2">Job Title</p>
          <input
            type="text"
            placeholder="Type here"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="border-2 rounded p-2 w-full"
            required
          />
        </label>
      </div>
      <div>
        <p className="mb-2">Job Description</p>
        <div ref={editorRef} className="border-2  "></div>
      </div>
      <div className="flex gap-3">
        <div>
          <label>
            <p className="mb-2">Location</p>

            <select
              onChange={(e) => setLocation(e.target.value)}
              placeholder ="select the Location"
              value={location}
              className="border p-2 w-full"
              required
            >
              {JobLocations.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            <p className="mb-2">Category</p>
            <select
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className="border p-2 w-full"
              required
            >
              {JobCategories.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            <p className="mb-2">Job Level</p>
            <select
              onChange={(e) => setLevel(e.target.value)}
              value={level}
              className="border p-2 w-full"
              required
            >
              {JobLevel.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div>
        <label>
          <p>Salary</p>
          <input
            min={0}
            type="number"
            placeholder="Enter salary"
            onChange={(e) => setSalary(Number(e.target.value))}
            value={salary}
            className="border p-2 max-w-32 "
            required
          />
        </label>
      </div>
      <button
        type="submit"
        className="bg-black text-white max-w-32 py-3 px-4 rounded"
      >
        Add Job
      </button>
    </form>
  );
};

export default AddJob;
