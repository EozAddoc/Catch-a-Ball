import axios from "axios";
import { useState, useEffect } from "react";
import Modal from "./Modal";
import { getUser } from "../api/user";
import pokemon from "pokemontcgsdk";
import '../index';
import '../styles.css'; // Assuming you have a styles.css file for the component styles

async function fetchUserData(id, setOtherUser, setTypeEn, setBagType, setMess) {
  try {
    const res = await axios.get(`${process.env.REACT_APP_URL}/user/filter?q=${id}`);
    if (res.data && res.data.length > 0) {
      const otherUser = res.data[0];
      setOtherUser(otherUser);
      setTypeEn(otherUser.energyChoice);
      let bgType = otherUser.energyChoice.replace(/\/energy\/|\.png|En/g, '');
      bgType = (["bug", "fire", "poison", "dark", "psychic"].includes(bgType))
        ? `${bgType}.png`
        : `${bgType}.jpg`;
      setBagType(bgType);
    }
  } catch (err) {
    console.log("error", err);
    setMess(err.message); // Assuming this is an error message
  }
}

function ProfileCard({ id }) {
  const [auth, setAuth] = useState(false);
  const [mess, setMess] = useState('');
  const [otherUser, setOtherUser] = useState('');
  const [avatar, setAvatar] = useState('');
  const [deckData, setDeckData] = useState([]);
  const [deckInfo, setDeckInfo] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentType, setCurrentType] = useState("");
  const [typeEn, setTypeEn] = useState("");
  const [bagType, setBagType] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          await fetchUserData(id, setOtherUser, setTypeEn, setBagType, setMess);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [id]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const updateUserBg = (energyChoice) => {
    const updatedUserData = {
      id: otherUser.id,
      energyChoice: energyChoice,
    };

    axios.post(process.env.REACT_APP_URL + '/Profile', {
      updatedUserData: updatedUserData
    })
      .then((res) => {
        console.log("User updated successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 100);
      })
      .catch((err) => {
        console.error("Error updating user background:", err);
        setMess(err.message); // Assuming this is an error message
        setTimeout(() => {
          window.location.reload();
        }, 100);
      });
  };

  const handleTypeChange = (type) => {
    setCurrentType(type);
    let bgType = type.split(" ")[0].toLowerCase();
    bgType = (["bug", "fire", "poison", "dark", "psychic"].includes(bgType))
      ? `${bgType}.png`
      : `${bgType}.jpg`;
    setBagType(bgType);
    const transformedType = type.split(" ")[0].toLowerCase() + "En";
    const srcType = `/energy/${transformedType}.png`;
    setTypeEn(srcType);
    if (typeEn) {
      updateUserBg(srcType);
    }
  };

  useEffect(() => {
    handleTypeChange(currentType);
  }, [currentType]);




  

    return  (
      <div className="h-full w-full flex items-center justify-center">
      <div className="shadow-md w-full h-full cardBody rounded-2xl bg-cover border-gray-400 overflow-hidden relative " src =  "/bg/water.jpg "  style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/bg/${bagType})`, backgroundSize: 'cover', borderWidth: '20px' }}>
          <h1 className="bg-gradient-to-t from-gray-400 via-gray-200 to-gray-400 text-center text-l font-bold m-2 italic rounded-full">TRAINER</h1>

            <div className="header mb-2">

         <div className="nameAndHealth flex justify-between mx-7">
                <p className="name text-m font-bold"> {otherUser.username}</p>
           
                <div className="floatRight flex items-center">
                  
                  <p className="health text-black mr-4 mt-2">LVL {otherUser.lvl}</p>
                  <button className=' w-8'    onClick={openModal}> <img src={typeEn} alt={currentType}/>
</button>
<Modal isOpen={isModalOpen} onClose={closeModal} onTypeChange={handleTypeChange}>
       
      </Modal>

                </div>
              </div>
            </div>
            <div className=" w-6/7 h-1/3 m-4 flex items-center justify-center">
  <div className="border-gray-400 border-8 shadow-2xl h-full w-full rounded-2xl">
    <img src={avatar.images?.large}  alt="AvatarImg" className="personnel-img" />
  </div>
</div>
<ls></ls>

    
            <div className="stats bg-gradient-to-t from-gray-400 via-gray-200 to-gray-400 rounded-2xl text-xs italic rounded-xl whitespace-nowrap mx-auto w-3/4 text-center mt-2">
              <p>New Player</p>
            </div>
    
            <div className="attacks">
              {/* Pokemon Attacks */}
              <div className="specificAttack  items-center">
               
                <div className="attackDescription m-3 ">
                  <p>
                    <span className="attackName font-bold text-lg">Introduction</span> Optional
                  </p>
                </div>
                <div className="power text-center text-xl">
                  10
                </div>
              </div>
    
              <hr className=" border-black w-95 mx-auto" />
    
            </div>
    
            <div className="attributes grid grid-cols-3 text-center w-full">
              {/* Deck Attributes */}
              <div className="weakness">
                <p className="font-bold text-sm">Attack</p>
                <img src="https://jcr08.github.io/pokemon-card/images/electric-energy.png" alt="Electric Energy Symbol" className="w-4" />
              </div>
              <div className="resistance">
                <p className="font-bold text-sm">Defence</p>
              </div>
              <div className="retreatCost">
                <p className="font-bold text-sm">retreat cost</p>
                <img src="https://jcr08.github.io/pokemon-card/images/normal-energy.png" alt="Normal Energy Symbol" className="w-4" />
              </div>
            </div>
    
            <div className="description border-2 border-gray-400 text-xs italic mx-auto w-5/6 p-1 mt-1.5">
              <p>
                Description
              </p>
            </div>
    
            <div className="footer text-xs p-0.5 text-center absolute bottom-0 left-0 w-full">
              <div>
                <strong>Illus.MitsuhiroArica</strong>
              </div>
            </div>
          </div>
        </div>
    )
}
export default ProfileCard;