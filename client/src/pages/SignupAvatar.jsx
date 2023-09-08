import ChooseACard from '../components/ChooseACard';

import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function SignupAvatar() {
    const apiIds = [
        "swsh10-189", // Zisu
        "swsh10-189",
        "swsh10-189",
        "swsh10-189",
        "swsh10-189",
        "swsh10-189",
        "swsh10-189",
        "swsh10-189"
    ]

    return (
        <QueryClientProvider client={queryClient}>
            <ChooseACard apiIds={apiIds}
                text={"Choose your trainer!"}
                maxCardsChosen={1} //choose one trainer
            />
        </QueryClientProvider>
    )

}

export default SignupAvatar;