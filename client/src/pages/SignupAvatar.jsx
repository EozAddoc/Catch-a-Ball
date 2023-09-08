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
            <div className="bg-blue-900 min-h-screen">
                <ChooseACard apiIds={apiIds}
                    text={"Choose your trainer!"}
                    maxCardsChosen={1} //choose one trainer
                    hidden={false}
                />
            </div>
        </QueryClientProvider>
    )

}

export default SignupAvatar;