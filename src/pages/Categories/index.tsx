import ProductsList from '../../components/ProductsList'

import {
  useGetActionGamesQuery,
  useGetFightGamesQuery,
  useGetRpgGamesQuery,
  useGetSportGamesQuery,
  useGetSimulationGamesQuery
} from '../../services/api'

const Categories = () => {
  const { data: actionGames, isLoading: isLoadingAction } =
    useGetActionGamesQuery()
  const { data: sportsGames, isLoading: isLoadingSport } =
    useGetSportGamesQuery()
  const { data: fightGames, isLoading: isLoadingFight } =
    useGetFightGamesQuery()
  const { data: simulationGames, isLoading: isLoadingSimulation } =
    useGetSimulationGamesQuery()
  const { data: rpgGames, isLoading: isLoadingRpg } = useGetRpgGamesQuery()

  return (
    <>
      <ProductsList
        games={actionGames}
        title="Ação"
        $background="black"
        id="action"
        isLoading={isLoadingAction}
      />
      <ProductsList
        games={rpgGames}
        title="RPG"
        $background="gray"
        id="rpg"
        isLoading={isLoadingRpg}
      />
      <ProductsList
        games={sportsGames}
        title="Esportes"
        $background="black"
        id="sports"
        isLoading={isLoadingSport}
      />
      <ProductsList
        games={simulationGames}
        title="Simulação"
        $background="gray"
        id="simulation"
        isLoading={isLoadingSimulation}
      />
      <ProductsList
        games={fightGames}
        title="Luta"
        $background="black"
        id="fight"
        isLoading={isLoadingFight}
      />
    </>
  )
}

export default Categories
