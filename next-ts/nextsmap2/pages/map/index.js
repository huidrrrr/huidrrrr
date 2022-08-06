import { useLoadScript } from "@react-google-maps/api";
import Map from "../../components/map/map";
import { getAllPlaces } from "../../components/helper/apiUtil";

export default function MapPage(props) {
  const { places } = props;
  
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyD0EITvU6aSQn9zF8fSXHQ5Dd0MjF5Q7aI",
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map placesData={places}/>;
}

export async function getStaticProps() {
  const places = await getAllPlaces();

  return {
    props: {
      places: places,
    },
    revalidate: 1800,
  };
}
