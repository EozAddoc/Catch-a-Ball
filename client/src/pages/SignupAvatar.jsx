import ChooseACard from '../components/ChooseACard';

function SignupAvatar() {
    const apiIds = [
        "swsh10-189" // Zisu
    ]

    return (
        <ChooseACard apiIds={apiIds} text={"Choose your trainer!"}/>
    )

}

export default SignupAvatar;