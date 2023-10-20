import Profile from "../components/EditProfile";
import Sidebar from "../components/SideBar";


function ProfilePage() {


  return (
    <div className='bg-gray-700'>
      <div className="min-h-screen bg-profileN bg-cover h-screen flex items-center justify-center">
        <Sidebar />
        <Profile />
      </div>
    </div>

  );
}

export default ProfilePage;
