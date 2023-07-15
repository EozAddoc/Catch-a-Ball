import ChooseACard from '../components/ChooseACard';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function SignupPokemon() {
  const apiIds = [
    "sm75-1", // Charmander
    "ex6-55", // Bulbasaur
    "bw10-14", // Squirtle
    "smp-SM86", // Pikachu
    "swsh1-83", // Gastly
    "swshp-SWSH175", // Eevee
    "hgss4-67", // Machop
    "pl4-65" // Geodude
  ];

  return (
    <div className="bg-blue-900 h-screen">
    <QueryClientProvider client={queryClient}>
      <ChooseACard apiIds={apiIds} text="Choose three to start your journey..." />
    </QueryClientProvider>
    </div>
  );
}

export default SignupPokemon;
