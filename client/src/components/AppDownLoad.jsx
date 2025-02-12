import { assets } from "../assets/assets";

const AppDownLoad = () => {
  return (
    <div className="flex  my-16 items-center justify-between bg-gray-100 border rounded px-12 sm:px-24  lg:px-32 pt-16">
      <div className="w-full flex flex-col gap-8  ">
        <h2 className="font-bold max-w-xl text-2xl sm:text-3xl md:text-4xl  ">
          Download Mobile App For Better Experience
        </h2>
        <div className="flex gap-2 max-lg:pb-10">
          <span>
            {" "}
            <img src={assets.play_store} alt="" />{" "}
          </span>
          <span>
            {" "}
            <img src={assets.app_store} alt="" />{" "}
          </span>
        </div>
      </div>
      <div className="hidden lg:block">
        <img src={assets.app_main_img} alt="" />
      </div>
    </div>
  );
};

export default AppDownLoad;
