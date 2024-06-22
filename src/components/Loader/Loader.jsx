import { ThreeDots } from "react-loader-spinner";

export default function Loader() {
  return (
    <span>
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#0081f1"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </span>
  );
}
