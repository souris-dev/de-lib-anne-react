import { BounceLoader, GridLoader } from "react-spinners";

export default function DefaultLoadingScreen() {
  return (
    <div className="min-h-screen flex flex-row items-center justify-center mx-5 sm:mx-9 lg:mx-28">
      <GridLoader margin={10} color="#FFBC67" size={15} />
    </div>
  );
}
