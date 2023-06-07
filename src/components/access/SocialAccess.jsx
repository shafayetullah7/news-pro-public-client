import { FaGoogle } from "react-icons/fa";
const SocialAccess = () => {
    return (
        <div className="w-full mt-10">
            <div className="divider">Continue With</div>
            <button className="flex w-fit items-center gap-3 border-2 p-2 rounded-lg text-[#002147] font-bold border-[#002147] hover:bg-[#002147] hover:text-white duration-100 text-sm mx-auto"><FaGoogle className="text-2xl"></FaGoogle></button>
        </div>
    );
};

export default SocialAccess;