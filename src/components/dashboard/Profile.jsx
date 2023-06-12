
import useProfile from '../../hooks/useProfile';


const Profile = () => {
  const { data:profile } = useProfile();
  const { name, email, photoUrl, phoneNumber, gender, address, type } = profile;
  console.log(profile);
  

  return (
    <div className="bg-white dark:bg-gray-700 dark:text-white shadow-md rounded-lg p-6 mb-6">
      <div className="flex flex-col items-center justify-center mb-4">
        <img src={photoUrl} alt={name} className="rounded-full w-32 h-32 mb-4" />
        <h2 className="text-2xl font-semibold">{name}</h2>
        <p className="text-gray-600 dark:text-gray-400">{email}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-items-center">
        <div className='w-md:full w-[290px]'>
          <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
          <p>
            <span className="font-semibold">Phone:</span> {phoneNumber}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {email}
          </p>
          <div className="mt-4 hidden sm:block">
            <h3 className="text-lg font-semibold">Type: {type}</h3>
        </div>
        </div>
        <div className='w-md:full w-[290px]'>
          <h3 className="text-lg font-semibold mb-2">Personal Details</h3>
          <p>
            <span className="font-semibold">Gender:</span> {gender}
          </p>
          <p>
            <span className="font-semibold">Address:</span> {address}
          </p>
          <div className="mt-4 block sm:hidden">
            <h3 className="text-lg font-semibold">Type: {type}</h3>
        </div>
        </div>
      </div>
      
    </div>
  );
};

export default Profile;
