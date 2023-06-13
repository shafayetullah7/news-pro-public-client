import { MdEmail, MdLocationOn } from "react-icons/md";
import { AiFillPhone } from "react-icons/ai";
import { FaFax } from "react-icons/fa";
// AiFillPhone

const Contacts = () => {
    return (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:w-[800px] mx-auto justify-items-center">
            <div className="w-[140px] h-[140px] border-2 border-primary flex items-center justify-center flex-col gap-5 rounded-lg">
                <MdLocationOn className="text-7xl"></MdLocationOn>
                <div className="">
                    <h1 className="text-center font-bold">Our Main Office</h1>
                    <p className="text-xs text-gray-700 text-center">789 Oak Avenue, Miami, Florida, United States</p>
                </div>
            </div>
            <div className="w-[140px] h-[140px] border-2 border-primary flex items-center justify-center flex-col gap-5 rounded-lg ">
                <AiFillPhone className="text-6xl"></AiFillPhone>
                <div className="mt-2">
                    <h1 className="text-center font-bold">Our Main Office</h1>
                    <p className="text-xs text-gray-700 text-center">+1 (555) 123-4567,</p>
                    <p className="text-xs text-gray-700 text-center">+1 (555) 987-6543</p>
                </div>
            </div>
            <div className="w-[140px] h-[140px] border-2 border-primary flex items-center justify-center flex-col gap-5 rounded-lg ">
                <FaFax className="text-6xl"></FaFax>
                <div className="mt-2">
                    <h1 className="text-center font-bold">Fax</h1>
                    <p className="text-xs text-gray-700 text-center">+1 (555) 789-0123</p>
                </div>
            </div>
            <div className="w-[140px] h-[140px] border-2 border-primary flex items-center justify-center flex-col gap-5 rounded-lg ">
                <MdEmail className="text-6xl"></MdEmail>
                <div className="">
                    <h1 className="text-center font-bold">Email</h1>
                    <p className="text-xs text-gray-700 text-center w-full  ">newspro@example.com</p>
                </div>
            </div>
        </div>
    );
};

export default Contacts;